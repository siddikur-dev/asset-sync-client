import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import Spinner from "../../../components/ui/Spinner";
import { useSearchParams } from "react-router";
import EmployeePagination from "../../../components/paginations/EmployeePagination";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = parseInt(searchParams.get('limit')) || 10;
  
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['requests', currentPage, itemsPerPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/requests?page=${currentPage}&limit=${itemsPerPage}`);
      return res.data;
    },
    refetchOnMount: true,
    staleTime: 0
  });

  const requests = data?.requests || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const totalItems = data?.pagination?.totalRequests || 0;

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/requests/${id}`, { status: 'approved' });
      if (res.data.success) {
        Swal.fire('Success', 'Request approved successfully!', 'success');
        refetch();
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to approve request', 'error');
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      title: 'Reject Request?',
      text: "Are you sure you want to reject this request?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, reject it!'
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.patch(`/requests/${id}`, { status: 'rejected' });
        if (res.data.success) {
          Swal.fire('Rejected', 'Request has been rejected.', 'success');
          refetch();
        }
      } catch (error) {
        Swal.fire('Error', error.response?.data?.message || 'Failed to reject request', 'error');
      }
    }
  };

  if (isLoading) return <Spinner />;

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'badge-warning',
      approved: 'badge-success',
      rejected: 'badge-error',
      returned: 'badge-info'
    };
    return badges[status] || 'badge';
  };

  // Filter requests (Optional: If the API returns all statuses, we might want to filter, 
  // but currently the requirement is "All Requests" so typically HR wants to see history too.
  // We can sort by pending first though)
  const sortedRequests = [...requests].sort((a, b) => {
    if (a.requestStatus === 'pending' && b.requestStatus !== 'pending') return -1;
    if (a.requestStatus !== 'pending' && b.requestStatus === 'pending') return 1;
    return new Date(b.requestDate) - new Date(a.requestDate);
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gradient">All Requests</h1>
        <div className="badge badge-primary badge-lg">
          {totalItems} total requests
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Employee</th>
              <th>Asset</th>
              <th>Type</th>
              <th>Date</th>
              <th>Status</th>
              <th>Note</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-base-content/60">
                  No requests found
                </td>
              </tr>
            ) : (
              sortedRequests.map((request) => (
                <tr key={request._id} className="hover:bg-base-50">
                  <td>
                    <div>
                      <div className="font-semibold">{request.requesterName}</div>
                      <div className="text-sm text-base-content/70">{request.requesterEmail}</div>
                    </div>
                  </td>
                  <td className="font-semibold">{request.assetName}</td>
                  <td>
                    <span className={`badge ${request.assetType === 'Returnable' ? 'badge-success' : 'badge-warning'} badge-sm`}>
                      {request.assetType}
                    </span>
                  </td>
                  <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`badge ${getStatusBadge(request.requestStatus)} uppercase text-xs font-bold`}>
                      {request.requestStatus}
                    </span>
                  </td>
                  <td className="max-w-xs truncate" title={request.note}>{request.note || '-'}</td>
                  <td>
                    {request.requestStatus === 'pending' ? (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(request._id)}
                          className="btn btn-sm btn-circle btn-success text-white tooltip"
                          data-tip="Approve"
                        >
                          <FaCheck />
                        </button>
                        <button
                          onClick={() => handleReject(request._id)}
                          className="btn btn-sm btn-circle btn-error text-white tooltip"
                          data-tip="Reject"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs italic text-base-content/50">Completed</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <EmployeePagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        currentItems={requests.length}
      />
    </div>
  );
};

export default AllRequests;
