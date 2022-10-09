import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { users?: mongoDB.Collection } = {};

export async function connectToDatabase() {
  dotenv.config();

  if (!process.env.DB_CONN_STRING) {
    throw new Error("DB_CONN_STRING is undefined in config");
  }

  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  if (!process.env.USERS_COLLECTION_NAME) {
    throw new Error("DB_CONN_STRING is undefined in config");
  }

  const usersCollection: mongoDB.Collection = db.collection(
    process.env.USERS_COLLECTION_NAME
  );

  collections.users = usersCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );
}
