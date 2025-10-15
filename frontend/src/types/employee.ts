export interface Employee {
  id?: string;
  name: string;
  position: string;
  department: string;
  salary: number;
}

export interface GetAllEmployeesData {
  getAllEmployees: Employee[];
}

export interface GetEmployeesByDepartmentData {
  getEmployeesByDepartment: Employee[];
}