import { createReadStream } from 'fs';
import { getDB } from '../config/database.ts';
import type { Department } from '../types/index.ts';

const COLLECTION = 'departments';

const createDepartment = async (dep: Omit<Department, '_id'>): Promise<Department> => {
  const db = getDB();
  const res = await db.collection(COLLECTION).insertOne(dep);
  return { ...dep, _id: res.insertedId.toHexString() };
};

 const getAllDepartments = async (): Promise<Department[]> => {
  const db = getDB();
  return db.collection<Department>(COLLECTION).find().toArray();
};

export default {
  createDepartment,
  getAllDepartments
}