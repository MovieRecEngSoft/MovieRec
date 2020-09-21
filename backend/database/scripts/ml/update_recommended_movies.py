import pandas as pd
import ast
import numpy as np
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.neighbors import BallTree
from pymongo import MongoClient
from tqdm import tqdm

def convert_keywords_to_list_dtype(keywords_df):
    keywords_l = keywords_df.keywords.apply(ast.literal_eval) # Inicializa o objeto dict de cada string original
    keywords_l = keywords_l.apply(lambda arr : [keyword["name"] for keyword in arr]) # Constrói um array a partir do dict
    keywords_l = pd.DataFrame({"id": keywords_df.id, "keywords": keywords_l}) # Inicializa novo DataFrame
    keywords_l.index.astype(int, copy=False)
    return keywords_l

def convert_keywords_to_onehot(keywords_l):
    mlb = MultiLabelBinarizer()
    keywords_oh = pd.DataFrame(mlb.fit_transform(keywords_l.keywords), columns=mlb.classes_, index=keywords_l.id)
    keywords_oh.index.astype(int, copy=False)
    return keywords_oh

def reduce_keywords_dimensionality(keywords_oh, min_kw_presence):
    relevant_keywords = keywords_oh.sum() > min_kw_presence
    relevant_keywords = list(relevant_keywords[relevant_keywords == True].index)
    keywords_oh = keywords_oh[relevant_keywords]
    return keywords_oh
    
def convert_genres_to_onehot(genres_l):
    mlb = MultiLabelBinarizer()
    genres_oh = pd.DataFrame(mlb.fit_transform(genres_l.genres), columns=mlb.classes_, index=genres_l.index)
    genres_oh["_id"] = genres_l._id
    genres_oh.index.astype(int, copy=False)
    return genres_oh

def get_keywords_df(keywords_path):
    keywords = pd.read_csv(
        keywords_path,
        dtype={
            'id': 'UInt32',
            'keywords': 'string'
        }
    )
    keywords = convert_keywords_to_list_dtype(keywords)
    keywords = convert_keywords_to_onehot(keywords)
    keywords = reduce_keywords_dimensionality(keywords, 8)
    return keywords

def get_movies_df(db):
    movies = pd.DataFrame(list(db.movies.find({})))
    return movies

def get_genres_df(movies):
    genres = movies[["_id", "genres", "id_tmdb"]]
    genres.set_index("id_tmdb", inplace=True)
    genres = convert_genres_to_onehot(genres)
    return genres

print("Connecting to MongoDB...")
client = MongoClient("mongodb+srv://movierec:movierecpassword@cluster0.gsuuq.mongodb.net/movierec?retryWrites=true&w=majority") # TODO: Hide credentials
db = client.movierec
print("Initializing Keywords DataFrame...")
keywords = get_keywords_df("database/metadata/keywords.csv")
print("Initializing Movies DataFrame...")
movies = get_movies_df(db)
print("Initializing Genres DataFrame...")
genres = get_genres_df(movies)
print("Joining DataFrames...")
df = genres.join(keywords, sort=False)
print("Updating DataFrame index...")
df.set_index("_id", inplace=True)
print("Initializing BallTree structure...")
bt = BallTree(df, metric="matching")
print("Updating recommendations...")
for row in tqdm(df.itertuples(name=None), position=0, leave=True):
    X = np.array(row[1:]).reshape(1,-1)
    curr_id = row[0]
    nearest_neighbors = bt.query(X, k=10, return_distance=False)[0][1:] # Nearest neighbors numerical indexes
    nearest_neighbors = list(df.iloc[nearest_neighbors].index) # Nearest neighbors ObjectIDs
    try:
        result = db.movies.update_one({'_id' : curr_id }, {'$set': {'recommended_movies': nearest_neighbors}})
        if (not result.matched_count):
            print("Couldn't update " + str(curr_id))
    except pymongo.errors.PyMongoError as e:
        print(e)
        break
else:
    print("Database updated successfully.")
print("Done.")