import time
from collections import defaultdict
import pymongo
import pandas as pd
from surprise import SVD
from surprise import Dataset, Reader
from surprise.model_selection import GridSearchCV

def transformObjectsIntoInts(dataColumn):
    ids = dataColumn.unique()
    mapObjectIdToInt = dict()
    sequentialId = 1
    for id in ids:
        mapObjectIdToInt[id] = sequentialId
        sequentialId += 1
    
    dataColumn.replace(mapObjectIdToInt, inplace=True)
    return mapObjectIdToInt

def transformObjectIdsIntoInts(data):
    return (transformObjectsIntoInts(data["user"]), transformObjectsIntoInts(data["movie"]))
    

databaseUser = "movierec"
databasePassword = "movierecpassword"
databaseName = "movierec"
print("Connecting to MongoDB...")
client = pymongo.MongoClient("mongodb+srv://{}:{}@cluster0.gsuuq.mongodb.net/{}?retryWrites=true&w=majority".format(databaseUser, databasePassword, databaseName))
db = client.movierec
reviews = pd.DataFrame(db["reviews"].find({}, {"user": 1, "movie": 1, "score": 1, "_id": 0}))
# Primeira coisa é transformar os ids da forma do mongo para um sequencial único
# tanto para o usuário, quanto para o filme.
(mapObjectIdsToIntUser, mapObjectIdsToIntMovie) = transformObjectIdsIntoInts(reviews)
reader = Reader(rating_scale=(1,10))
reviewsDataSet = Dataset.load_from_df(reviews[["user", "movie", "score"]], reader)

param_grid = {
    "n_epochs": [5, 10, 20],
    "lr_all": [0.002, 0.005],
    "reg_all": [0.2, 0.4, 0.6]
}
# Estamos utilizando o GridSearchCV para testar vários parâmetros e escolher o melhor
ratingsGridSearch = GridSearchCV(SVD, param_grid, measures=["rmse", "mae"], cv=5)
start = time.time()
ratingsGridSearch.fit(reviewsDataSet)
end = time.time()
duration = round(end-start, 2)
print("Training: " + str(duration) + " seconds")
print(ratingsGridSearch.best_score["rmse"])
print(ratingsGridSearch.best_params["rmse"])
print(ratingsGridSearch.best_score["mae"])
print(ratingsGridSearch.best_params["mae"])

svd = ratingsGridSearch.best_estimator['rmse']
start = time.time()
trainset = reviewsDataSet.build_full_trainset()
svd.fit(trainset)
end = time.time()
duration = round(end-start, 2)
print("Put trainSet: " + str(duration) + " seconds")

moviesWithReviews = reviews['movie'].unique()
users = pd.DataFrame(db["users"].find({}, {}))["_id"]
users.replace(mapObjectIdsToIntUser, inplace=True)

predictions = defaultdict(list)
for user in users:
    for movie in moviesWithReviews:
        if not ((reviews["user"] == user) & (reviews["movie"] == movie)).any():
            # Prevendo a avaliação que o usuário possivelmente daria caso tivesse assistido ao filme
            predictions[user].append((movie, svd.predict(user, movie).est))

for uid, userRatings in predictions.items():
    userRatings.sort(key=lambda x: x[1], reverse=True)
    predictions[uid] = userRatings[:10]

for uid, userRatings in predictions.items():
    userObjectId = next((userObjectId for userObjectId, userId in mapObjectIdsToIntUser.items() if userId == uid), None)
    top10 = list()
    for iid, _ in userRatings:
        movieObjectId = next((movieObjectId for movieObjectId, movieId in mapObjectIdsToIntMovie.items() if movieId == iid), None)
        top10.append(movieObjectId)
    
    try:
        result = db["users"].update_one({'_id' : userObjectId }, {'$set': {'recommended_movies': list(top10)}})
        if (not result.matched_count):
            print("Couldn't update " + str(userObjectId))
    except pymongo.errors.PyMongoError as e:
        print(e)
        break
