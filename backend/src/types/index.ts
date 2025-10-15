export type ObjectIdString = string;

export interface Department {
  _id: ObjectIdString;
  name: string;
  floor: number;
}

export interface Employee {
  _id?: ObjectIdString;
  name: string;
  position: string;
  department: string;
  salary: number;
}
export type EmployeeInput = Omit<Employee, '_id'>;