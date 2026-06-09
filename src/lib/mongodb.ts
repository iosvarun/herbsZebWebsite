import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient> | null = null;

/**
 * Retrieves the cached MongoDB client promise.
 * Returns null if MONGODB_URI is not set in the environment variables.
 */
export async function getMongoClientPromise(): Promise<Promise<MongoClient> | null> {
  if (!uri) {
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    // In development mode, use a global variable to preserve the connection
    // across module reloads caused by Hot Module Replacement (HMR).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options);
      globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
  } else {
    // In production mode, do not use a global variable.
    if (!clientPromise) {
      client = new MongoClient(uri, options);
      clientPromise = client.connect();
    }
  }

  return clientPromise;
}

/**
 * Retrieves the database instance.
 * Returns null if MongoDB connection cannot be established or if URI is missing.
 */
export async function getDb(dbName = "herbszen") {
  try {
    const promise = await getMongoClientPromise();
    if (!promise) {
      return null;
    }
    const mongoClient = await promise;
    return mongoClient.db(dbName);
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    return null;
  }
}

/**
 * Checks if MongoDB is configured and connection can be established.
 */
export async function isMongoConnected(): Promise<boolean> {
  try {
    const db = await getDb();
    return db !== null;
  } catch {
    return false;
  }
}
