import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Spinner from "../../../components/ui/Spinner";
import { useSearchParams } from "react-router";
import EmployeePagination from "../../../components/paginations/EmployeePagination";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = parseInt(searchParams.get('limit')) || 10;
  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['my-employees', currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-employees?page=${currentPage}&limit=${itemsPerPage}`);
      return res.data;
    },
    refetchOnMount: true,
    staleTime: 0
  });

  const totalPages = data?.totalPages || 1;
  const totalItems = data?.totalEmployees || 0;

  const handleRemove = async (userId) => {
    const result = await Swal.fire({
      title: 'Remove Employee?',
      text: "This will return all assets and remove the employee from your company.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, remove!'
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/my-employees/${userId}`);
        if (res.data.success) {
          Swal.fire('Removed', 'Employee has been removed.', 'success');
          refetch();
        }
      } catch (error) {
        Swal.fire('Error', error.response?.data?.message || 'Failed to remove employee', 'error');
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gradient">Employee List</h1>
        <div className="badge badge-primary badge-lg">
          {totalItems} / {data?.packageLimit || 0} employees used
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.employees?.map((emp) => (
          <div key={emp._id} className="bg-base-100 p-6 rounded-xl shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={emp.employeeDetails?.profileImage || 'https://via.placeholder.com/50'}
                alt={emp.employeeName}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-lg">{emp.employeeName}</h3>
                <p className="text-sm text-base-content/70">{emp.employeeEmail}</p>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm">
                <span className="font-semibold">Join Date:</span> {emp.affiliationDate ? new Date(emp.affiliationDate).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Assets Assigned:</span> {emp.assetCount || 0}
              </p>
            </div>
            <button
              onClick={() => handleRemove(emp._id)}
              className="btn btn-sm btn-error w-full"
            >
              <FaTrash className="mr-2" /> Remove from Team
            </button>
          </div>
        ))}
      </div>

      {(!data?.employees || data.employees.length === 0) && (
        <div className="text-center py-12">
          <p className="text-base-content/70">No employees found</p>
        </div>
      )}

      {/* Pagination Component */}
      <EmployeePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentItems={data?.employees?.length || 0}
      />
    </div>
  );
};

export default EmployeeList;
