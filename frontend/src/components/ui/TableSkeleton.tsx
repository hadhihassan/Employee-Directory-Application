"use client";

export const TableSkeleton = ({ rows = 5, className = '' }: { rows?: number, className : string }) => {
  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden animate-pulse ${className}`}>
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="h-5 w-40 bg-gray-200 rounded"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {["Employee", "Position", "Department", "Actions"].map((col) => (
                <th
                  key={col}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.from({ length: rows }).map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                    <div className="ml-4">
                      <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
                      <div className="h-3 w-24 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-28 bg-gray-200 rounded"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-4 w-12 bg-gray-200 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
