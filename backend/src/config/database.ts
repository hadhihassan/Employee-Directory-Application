import { MongoClient, Db } from 'mongodb';
import configEnv from './config.ts'

let client: MongoClient;
let db: Db;

export async function connectDB() {
  if (db) return db;
  client = new MongoClient(configEnv.mongodb_url, { maxPoolSize: 10 });
  await client.connect();
  db = client.db(configEnv.db_name);
  console.log('Connected to MongoDB:', configEnv.db_name);
  return db;
}

export function getDB(): Db {
  if (!db) throw new Error('Database not initialized. Call connectDB first.');
  return db;
}

export async function closeDB() {
  await client?.close();
}
