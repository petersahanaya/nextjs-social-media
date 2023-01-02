// mongodb.js
import { Db, MongoClient } from 'mongodb'

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() : Promise<{client : MongoClient, db : Db}> {
  // check the cached.
  if (cachedClient && cachedDb) {
      // load from cache
      return {
          client: cachedClient,
          db: cachedDb,
      };
  }

  // set the connection options
  const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  };

  // Connect to cluster
  let client = new MongoClient(process.env.MONGODB_URI!, opts);
  await client.connect();
  let db = client.db("App");

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
      client: cachedClient,
      db: cachedDb,
  };
}
