"use client";
import React, { use } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { GET_EMPLOYEE_DETAILS } from "../../../graphql/queries";
import { Employee } from "@/types/employee";
import { Button } from "../../../components/ui/Button";
import { PageLoader } from "../../../components/ui/LoadingSpinner";
import { PageError } from "../../../components/ui/ErrorMessage";
import { PageHeader } from "../../../components/ui/PageHeader";
import { ArrowLeft, Building, DollarSign, User } from "lucide-react";
import { formatCurrency, getInitials } from "../../../lib/utils";

export default function EmployeeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  const router = useRouter();
  const { data, loading, error } = useQuery<{ getEmployeeDetails: Employee | null }>(
    GET_EMPLOYEE_DETAILS,
    { variables: { id } }
  );

  if (loading) return <PageLoader />;
  if (error) return <PageError message={error.message} onRetry={() => window.location.reload()} />;

  const emp = data?.getEmployeeDetails;
  if (!emp) return <PageError message="Employee not found" onRetry={() => router.push("/")} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push("/")}
            icon={ArrowLeft}
            className="mb-4"
          >
            Back to Directory
          </Button>
          
          <PageHeader
            title="Employee Details"
            description="Complete information about the employee"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">
                    {getInitials(emp.name)}
                  </span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{emp.name}</h1>
                <p className="text-gray-600 mb-3">{emp.position}</p>
              </div>

              {/* Employee ID */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-500 mb-1">Employee ID</div>
                <div className="text-sm font-mono text-gray-900">{emp.id}</div>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center text-gray-500 mb-2">
                    <User className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Full Name</span>
                  </div>
                  <p className="text-gray-900 font-medium">{emp.name}</p>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-gray-500 mb-2">
                    <Building className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Position</span>
                  </div>
                  <p className="text-gray-900 font-medium">{emp.position}</p>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-medium text-gray-500 mb-2">Department</div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {emp.department}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center text-gray-500 mb-2">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Salary</span>
                  </div>
                  <p className="text-gray-900 font-semibold text-lg">
                    {formatCurrency(emp.salary)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}