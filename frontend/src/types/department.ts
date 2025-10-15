export interface Department {
  id: string;
  name: string;
  floor: number;
}

export interface GetAllDepartmentsData {
  getAllDepartments: Department[];
}