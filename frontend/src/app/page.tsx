"use client";

import { useEmployees } from "../hooks/useEmployees";
import { EmployeeList } from "../components/employee/EmployeeList";
import { EmployeeForm } from "../components/employee/EmployeeForm";
import { PageHeader } from "../components/ui/PageHeader";
import { Button } from "../components/ui/Button";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { TableSkeleton } from "../components/ui/TableSkeleton";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_DEPARTMENTS } from "../graphql/queries";
import { Department, GetAllDepartmentsData } from "@/types/department";

export default function HomePage() {
  const { employees, loading, error, addEmployee, adding, department, setDepartment } = useEmployees();
  const [showForm, setShowForm] = useState(false);

  const { data: deptData, loading: deptLoading } = useQuery<GetAllDepartmentsData>(GET_ALL_DEPARTMENTS);
  const departments = deptData?.getAllDepartments ?? [];

  if (error) return <ErrorMessage message={error.message} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <PageHeader
          title="Employee Directory"
          description="Manage your company's workforce efficiently"
          action={
            <Button
              onClick={() => setShowForm(!showForm)}
              variant={showForm ? "secondary" : "primary"}
              icon={Plus}
            >
              {showForm ? "Close Form" : "Add Employee"}
            </Button>
          }
        />

        {/* Department Filter */}
        <div className="flex items-center gap-3 mb-6">
          <label className="text-sm font-medium text-gray-700">Filter by Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="border border-gray-300 rounded-md p-2 bg-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Departments</option>
            {departments.map((d: Department) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
          {department && (
            <Button variant="ghost" onClick={() => setDepartment("")}>
              Clear
            </Button>
          )}
        </div>

        {showForm && (
          <div className="mb-8 animate-in fade-in duration-300">
            <EmployeeForm
              onSubmit={addEmployee}
              loading={adding}
              onSuccess={() => setShowForm(false)}
            />
          </div>
        )}

        {/* 👇 Show skeleton while loading */}
        {loading || deptLoading ? (
          <TableSkeleton rows={6} className={""} />
        ) : (
          <EmployeeList employees={employees || []} />
        )}
      </div>
    </div>
  );
}
