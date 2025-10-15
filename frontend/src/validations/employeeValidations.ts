
import { z } from "zod";
export const employeeSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    position: z.string().min(2, "Position must be at least 2 characters"),
    department: z.string().min(1, "Department is required"),
    salary: z.number().min(1, "Salary must be positive"),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;
