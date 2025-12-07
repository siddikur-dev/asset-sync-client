import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
import Spinner from "../../../components/ui/Spinner";

const HRDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [productType, setProductType] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['assets', search, productType, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/assets?search=${search}&productType=${productType}&page=${page}&limit=${limit}`);
      return res.data;
    }
  });

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/assets/${id}`);
        Swal.fire('Deleted!', 'Asset has been deleted.', 'success');
        refetch();
      } catch (error) {
        Swal.fire('Error!', 'Failed to delete asset.', 'error');
      }
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gradient">Asset List</h1>
        <Link to="/dashboard/add-asset" className="btn btn-gradient text-white">
          <FaPlus className="mr-2" /> Add Asset
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
          <input
            type="text"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="input input-bordered w-full pl-10"
          />
        </div>
        <select
          value={productType}
          onChange={(e) => {
            setProductType(e.target.value);
            setPage(1);
          }}
          className="select select-bordered"
        >
          <option value="all">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Assets Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Available</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.assets?.map((asset) => (
              <tr key={asset._id}>
                <td>
                  <img src={asset.productImage} alt={asset.productName} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="font-semibold">{asset.productName}</td>
                <td>
                  <span className={`badge ${asset.productType === 'Returnable' ? 'badge-success' : 'badge-warning'}`}>
                    {asset.productType}
                  </span>
                </td>
                <td>{asset.productQuantity}</td>
                <td>{asset.availableQuantity}</td>
                <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                <td>
                  <div className="flex gap-2">
                    <Link to={`/dashboard/edit-asset/${asset._id}`} className="btn btn-sm btn-primary">
                      <FaEdit />
                    </Link>
                    <button onClick={() => handleDelete(asset._id)} className="btn btn-sm btn-error">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data?.pagination && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="btn btn-sm"
          >
            Previous
          </button>
          <span className="flex items-center px-4">
            Page {data.pagination.currentPage} of {data.pagination.totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
            disabled={page === data.pagination.totalPages}
            className="btn btn-sm"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default HRDashboard;

