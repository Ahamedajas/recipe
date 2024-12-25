import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('MONGODB_URI must be defined in .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // Cast globalThis to unknown first, then to the correct type
  if (!(globalThis as unknown as { _mongoClientPromise?: Promise<MongoClient> })._mongoClientPromise) {
    client = new MongoClient(uri);
    (globalThis as unknown as { _mongoClientPromise: Promise<MongoClient> })._mongoClientPromise = client.connect();
  }
  clientPromise = (globalThis as unknown as { _mongoClientPromise: Promise<MongoClient> })._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
