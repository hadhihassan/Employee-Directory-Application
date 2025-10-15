import { connectDB, getDB } from './config/database.ts';
import type { Department, Employee } from './types/index.ts';

async function seed() {
  const db = await connectDB();
  const departments: Department[] = [
    { name: 'Engineering', floor: 5},
    { name: 'HR', floor: 2 },
    { name: 'Sales', floor: 3 },
  ];

  const depRes = await db.collection('departments').deleteMany({});
  await db.collection('departments').insertMany(departments);

  const employees: Employee[] = [
    { name: 'Alice Johnson', position: 'Frontend Engineer', department: 'Engineering', salary: 75000 },
    { name: 'Bob Smith', position: 'Backend Engineer', department: 'Engineering', salary: 80000 },
    { name: 'Carla Gomez', position: 'HR Manager', department: 'HR', salary: 65000 },
    { name: 'David Lee', position: 'Sales Executive', department: 'Sales', salary: 60000 },
    { name: 'Eve Kim', position: 'DevOps Engineer', department: 'Engineering', salary: 82000 },
  ];

  await db.collection('employees').deleteMany({});
  await db.collection('employees').insertMany(employees);

  console.log('Seeded DB with departments and employees.');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
