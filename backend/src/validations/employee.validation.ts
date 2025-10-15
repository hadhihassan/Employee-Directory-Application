import { z } from "zod";

export const employeeSchema = z.object({
  name: z
    .string({ error: "Name is required" })
    .min(2, "Name must be at least 2 characters"),
  position: z
    .string({ error: "Position is required" })
    .min(2, "Position must be at least 2 characters"),
  department: z
    .string({ error: "Department is required" })
    .min(2, "Department must be valid"),
  salary: z
    .number({ error: "Salary is required"   })
    .positive("Salary must be positive")
    .max(1000000, "Salary too high"),
});

export type EmployeeInput = z.infer<typeof employeeSchema>;
