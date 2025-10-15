import { getDB } from '../config/database.ts';
import type { Employee, EmployeeInput } from '../types/index.ts';
import { validateObjectId } from '../validations/validate.ts';

const COLLECTION = 'employees';

export const addEmployee = async (payload: EmployeeInput): Promise<Employee> => {
  const db = getDB();
  const res = await db.collection(COLLECTION).insertOne(payload);
  return { ...payload, _id: res.insertedId.toHexString() };
};

export const getAllEmployees = async (): Promise<Employee[]> => {
  const db = getDB();
  return db.collection<Employee>(COLLECTION).find().toArray();
};

export const getEmployeeById = async (id: string): Promise<Employee | null> => {
  const db = getDB();
  console.log('id', id)
  const _id = validateObjectId(id)
  const doc = await db.collection<Employee>(COLLECTION).findOne({ _id } as any);
  if (!doc) return null;

  return { ...doc, _id: (doc as any)._id.toHexString() };
};

export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
  const db = getDB();
  return db.collection<Employee>(COLLECTION).find({ department }).toArray();
};


export default {
  getAllEmployees,
  getEmployeeById,
  getEmployeesByDepartment,
  addEmployee
}