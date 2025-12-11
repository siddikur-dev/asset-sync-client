import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useRef } from "react";
import { FaSearch, FaUndo, FaPrint } from "react-icons/fa";
import Swal from "sweetalert2";
import { useReactToPrint } from "react-to-print";
import Spinner from "../../../components/ui/Spinner";
import { useSearchParams } from "react-router";
import EmployeePagination from "../../../components/paginations/EmployeePagination";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = parseInt(searchParams.get('limit')) || 10;
  const [search, setSearch] = useState("");
  const [assetType, setAssetType] = useState("all");
  const printRef = useRef();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['my-assets', currentPage, itemsPerPage, search, assetType],
    queryFn: async () => {
      // Use new /my-assets endpoint with pagination
      const res = await axiosSecure.get(`/my-assets?page=${currentPage}&limit=${itemsPerPage}&search=${search}&type=${assetType}`);
      return res.data;
    },
    refetchOnMount: true,
    staleTime: 0
  });

  const assets = data?.assets || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const totalItems = data?.pagination?.totalAssets || 0;

  const handleReturn = async (id) => {
    const result = await Swal.fire({
      title: 'Return Asset?',
      text: "Are you sure you want to return this asset?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, return it!'
    });

    if (result.isConfirmed) {
      try {
        // Use PATCH /requests/:id with { status: 'returned' }
        const res = await axiosSecure.patch(`/requests/${id}`, { status: 'returned' });
        if (res.data.success) {
          Swal.fire('Success', 'Asset returned successfully!', 'success');
          refetch();
        }
      } catch (error) {
        Swal.fire('Error', error.response?.data?.message || 'Failed to return asset', 'error');
      }
    }
  };

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'My Assets Report'
  });

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gradient">My Assets</h1>
        <div className="flex items-center gap-4">
          <div className="badge badge-primary badge-lg">
            {totalItems} total assets
          </div>
          <button onClick={handlePrint} className="btn btn-primary">
            <FaPrint className="mr-2" /> Print
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-10"
          />
        </div>
        <select
          value={assetType}
          onChange={(e) => setAssetType(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Print View */}
      <div ref={printRef} className="hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">My Assets Report</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th>Asset Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Assignment Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset._id}>
                  <td>{asset.assetName}</td>
                  <td>{asset.assetType}</td>
                  <td>{asset.companyName}</td>
                  <td>{asset.approvalDate ? new Date(asset.approvalDate).toLocaleDateString() : '-'}</td>
                  <td>{asset.requestStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assets Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Image</th>
              <th>Asset Name</th>
              <th>Type</th>
              <th>Company</th>
              <th>Assignment Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-8 text-base-content/60">
                  No assets found
                </td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr key={asset._id}>
                  <td>
                    <img src={asset.assetImage} alt={asset.assetName} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="font-semibold">{asset.assetName}</td>
                  <td>
                    <span className={`badge ${asset.assetType === 'Returnable' ? 'badge-success' : 'badge-warning'}`}>
                      {asset.assetType}
                    </span>
                  </td>
                  <td>{asset.companyName}</td>
                  <td>{asset.approvalDate ? new Date(asset.approvalDate).toLocaleDateString() : '-'}</td>
                  <td>
                    <span className={`badge ${asset.requestStatus === 'approved' ? 'badge-success' : 'badge-info'}`}>
                      {asset.requestStatus}
                    </span>
                  </td>
                  <td>
                    {asset.requestStatus === 'approved' && asset.assetType === 'Returnable' && (
                      <button
                        onClick={() => handleReturn(asset._id)}
                        className="btn btn-sm btn-primary"
                      >
                        <FaUndo className="mr-2" /> Return
                      </button>
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
        currentItems={assets.length}
      />
    </div>
  );
};

export default MyAssets;
