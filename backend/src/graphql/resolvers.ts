import { tryCatch } from '../utils/tryCatch.ts';
import { departmentService, employeeService } from '../services/index.ts'
import { BadRequestError, NotFoundError } from '../utils/error.ts';
import { employeeSchema } from '../validations/employee.validation.ts';
import { validateInput } from '../utils/errorHandler.ts';
import { validateObjectId } from '../validations/validate.ts';

export const resolvers = {
  Query: {
    getAllEmployees: tryCatch(async () => {
      const emps = await employeeService.getAllEmployees();
      return emps.map(e => ({ id: e._id, ...e }));
    }),

    getEmployeeDetails: tryCatch(async (_: any, { id }: { id: string }) => {
      validateObjectId(id)
      const emp = await employeeService.getEmployeeById(id);
      if (!emp) throw NotFoundError('Employee not found');
      return { id: emp._id, ...emp };
    }),

    getEmployeesByDepartment: tryCatch(async (_: any, { department }: { department: string }) => {
      if (!department) throw BadRequestError('department is required');
      const emps = await employeeService.getEmployeesByDepartment(department);
      return emps.map(e => ({ id: e._id, ...e }));
    }),

    getAllDepartments: tryCatch(async () => {
      const deps = await departmentService.getAllDepartments();
      return deps.map(d => ({ id: (d as any)._id?.toHexString?.() ?? d._id, ...d }));
    }),
  },

  Mutation: {
    addEmployee: tryCatch(async (_: any, args: any) => {
      const { name, position, department, salary } = args;
      validateInput(employeeSchema, args);

      const newEmp = await employeeService.addEmployee({ name, position, department, salary });
      return { id: newEmp._id, ...newEmp };
    }),
  },
};
