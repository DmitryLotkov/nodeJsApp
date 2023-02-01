const USER_NAME = process.env.MONGO_DB_USER_NAME || "dmitry_lotkov";
const PASSWORD = process.env.MONGO_DB_USER_PASSWORD || "OgXi4YscH93zvQy7";
const MONGO_DB_URL = process.env.MONGO_DB_URL || "firstapp.opxvirc.mongodb.net/"; // bd for tests

export const MongoDBUris = `mongodb+srv://${USER_NAME}:${PASSWORD}@${MONGO_DB_URL}?retryWrites=true&w=majority`;
export const PORT = process.env.PORT || 5000;