
// mongodb.js
import { Db, MongoClient } from 'mongodb'

let cachedClient : MongoClient | null  = null;
let cachedDb : Db | null = null;

export async function connectToDatabase() : Promise<{client : MongoClient, db : Db}> {
  // check the cached.
  if (cachedClient && cachedDb) {
      // load from cache
      return {
          client: cachedClient,
          db: cachedDb,
      };
  }
  const opts = {
    useUnifiedTopology: true,
    useNewUrlParser: true
  };

  // Connect to cluster
  try {

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
  }catch(e) {
    console.log(e)
  }
}