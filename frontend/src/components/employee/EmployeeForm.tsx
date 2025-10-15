"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { X } from "lucide-react";
import { useQuery } from "@apollo/client/react";
import { Department, GetAllDepartmentsData } from "@/types/department";
import {
  EmployeeFormData,
  employeeSchema,
} from "@/validations/employeeValidations";
import { GET_ALL_DEPARTMENTS } from "@/graphql/queries";

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  loading?: boolean;
  onSuccess?: () => void;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  loading = false,
  onSuccess,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const {
    data,
    loading: deptLoading,
    error: deptError,
  } = useQuery<GetAllDepartmentsData>(GET_ALL_DEPARTMENTS);

  const [departments, setDepartments] = useState<string[]>([]);

  useEffect(() => {
    if (data?.getAllDepartments) {
      setDepartments(data.getAllDepartments.map((dep: Department) => dep.name));
    }
  }, [data]);

  const handleFormSubmit = async (data: EmployeeFormData) => {
    try {
      await onSubmit(data);
      reset();
      onSuccess?.();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  if (deptLoading)
    return (
      <p className="text-gray-500 text-center py-6">Loading departments...</p>
    );

  if (deptError)
    return (
      <p className="text-red-500 text-center py-6">
        Failed to load departments. Please try again.
      </p>
    );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Add New Employee
        </h2>
        <Button variant="ghost" size="sm" icon={X} onClick={onSuccess}>
          Close
        </Button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            type="text"
            placeholder="John Doe"
            error={errors.name?.message}
            {...register("name")}
          />

          <Input
            label="Position"
            type="text"
            placeholder="Software Engineer"
            error={errors.position?.message}
            {...register("position")}
          />

          <Select
            label="Department"
            options={departments}
            error={errors.department?.message}
            {...register("department")}
          />

          <Input
            label="Salary"
            type="number"
            placeholder="50000"
            step="0.01"
            error={errors.salary?.message}
            {...register("salary", { valueAsNumber: true })}
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancel
          </Button>
          <Button type="submit" loading={loading} disabled={loading}>
            Add Employee
          </Button>
        </div>
      </form>
    </div>
  );
};
