from numpy import random
import pymongo
import pandas as pd

def getRandReview(usersId, moviesId):
    user = usersId.iloc[random.randint(0, usersId.shape[0])]
    movie = moviesId.iloc[random.randint(0, moviesId.shape[0])]
    score = random.uniform(1, 10)
    return {
        'text': "Teste",
        'score': score,
        'user': user,
        'movie': movie
    }

databaseUser = "movierec"
databasePassword = "movierecpassword"
databaseName = "movierec"
print("Connecting to MongoDB...")
client = pymongo.MongoClient("mongodb+srv://movierec:movierecpassword@cluster0.gsuuq.mongodb.net/movierec?retryWrites=true&w=majority")
db = client.movierec
users = pd.DataFrame(db["users"].find({}))
movies = pd.DataFrame(db["movies"].find({}))
reviews = []
for i in range(0, 1000, 1):
    reviews.append(getRandReview(users["_id"], movies["_id"]))

db["reviews"].insert_many(reviews)
