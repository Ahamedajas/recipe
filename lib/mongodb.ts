import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!uri) {
  throw new Error('MONGODB_URI must be defined in .env.local');
}

if (process.env.NODE_ENV === 'development') {
  // Use @ts-expect-error instead of @ts-ignore
  // @ts-expect-error: Suppressing error because the global object in TypeScript doesn't have the _mongoClientPromise property, but it works at runtime.
  if (!(globalThis as { _mongoClientPromise?: Promise<MongoClient> })._mongoClientPromise) {
    client = new MongoClient(uri);
    (globalThis as { _mongoClientPromise: Promise<MongoClient> })._mongoClientPromise = client.connect();
  }
  clientPromise = (globalThis as { _mongoClientPromise: Promise<MongoClient> })._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
