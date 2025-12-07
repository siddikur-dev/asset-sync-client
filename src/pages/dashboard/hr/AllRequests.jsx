import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheck, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import Spinner from "../../../components/ui/Spinner";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: requests = [], isLoading, refetch } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const res = await axiosSecure.get('/requests');
      return res.data;
    }
  });

  const handleApprove = async (id) => {
    try {
      const res = await axiosSecure.patch(`/requests/${id}/approve`);
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
        const res = await axiosSecure.patch(`/requests/${id}/reject`);
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

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gradient">All Requests</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
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
            {requests.map((request) => (
              <tr key={request._id}>
                <td>
                  <div>
                    <div className="font-semibold">{request.requesterName}</div>
                    <div className="text-sm text-base-content/70">{request.requesterEmail}</div>
                  </div>
                </td>
                <td className="font-semibold">{request.assetName}</td>
                <td>
                  <span className={`badge ${request.assetType === 'Returnable' ? 'badge-success' : 'badge-warning'}`}>
                    {request.assetType}
                  </span>
                </td>
                <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${getStatusBadge(request.requestStatus)}`}>
                    {request.requestStatus}
                  </span>
                </td>
                <td>{request.note || '-'}</td>
                <td>
                  {request.requestStatus === 'pending' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(request._id)}
                        className="btn btn-sm btn-success"
                      >
                        <FaCheck /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(request._id)}
                        className="btn btn-sm btn-error"
                      >
                        <FaTimes /> Reject
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRequests;

