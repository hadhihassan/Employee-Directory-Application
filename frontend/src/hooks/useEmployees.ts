"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_EMPLOYEES, GET_EMPLOYEES_BY_DEPARTMENT } from "../graphql/queries";
import { ADD_EMPLOYEE } from "../graphql/mutations";
import { Employee, GetAllEmployeesData, GetEmployeesByDepartmentData } from "@/types/employee";

export const useEmployees = () => {
  const [department, setDepartment] = useState<string>("");

  const { data, loading, error, refetch } = useQuery<
    GetAllEmployeesData | GetEmployeesByDepartmentData
  >(
    department ? GET_EMPLOYEES_BY_DEPARTMENT : GET_ALL_EMPLOYEES,
    {
      variables: department ? { department } : undefined,
    }
  );

  const [addEmployeeMutation, { loading: adding }] = useMutation(ADD_EMPLOYEE, {
    onCompleted: () => refetch(),
  });

  const addEmployee = async (employee: Employee) => {
    await addEmployeeMutation({ variables: employee });
  };
  const employees = department
    ? (data as GetEmployeesByDepartmentData)?.getEmployeesByDepartment ?? []
    : (data as GetAllEmployeesData)?.getAllEmployees ?? [];

  return {
    employees,
    loading,
    error,
    addEmployee,
    adding,
    department,
    setDepartment,
  };
};
