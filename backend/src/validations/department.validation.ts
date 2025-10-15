import { z } from "zod";

export const departmentSchema = z.object({
  name: z.string({ error: "Department name is required" }).min(2),
  floor: z.number({ error: "Floor number is required" }).int().positive(),
});

export type DepartmentInput = z.infer<typeof departmentSchema>;
