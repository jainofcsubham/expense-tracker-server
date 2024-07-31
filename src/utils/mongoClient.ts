import { MongoClient, Db } from 'mongodb';

let db: Db;

const connectToMongo = async (): Promise<Db> => {
  if (db) {
    console.log("Reusing")
    return db;
  }
  try {
    const client = await MongoClient.connect(process.env.ATLAS_URI ?? "");
    db = client.db(process.env.ATLAS_DB_NAME);
    console.log(`Connected to database: ${process.env.ATLAS_DB_NAME}`);
    return db;
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    throw error;
  }
};

export default connectToMongo;
