import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import Spinner from "../../../components/ui/Spinner";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      const res = await axiosSecure.get('/employees');
      return res.data;
    }
  });

  const handleRemove = async (affiliationId, employeeEmail) => {
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
        const res = await axiosSecure.delete(`/affiliations/${affiliationId}`);
        if (res.data.success) {
          Swal.fire('Removed', 'Employee has been removed and all assets returned.', 'success');
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
          {data?.totalEmployees || 0} / {data?.packageLimit || 0} employees used
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
                <span className="font-semibold">Join Date:</span> {new Date(emp.affiliationDate).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Assets Assigned:</span> {emp.assetCount || 0}
              </p>
            </div>
            <button
              onClick={() => handleRemove(emp._id, emp.employeeEmail)}
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
    </div>
  );
};

export default EmployeeList;

