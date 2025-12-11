import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { FaSearch, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Spinner from "../../../components/ui/Spinner";

const HRDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [productType, setProductType] = useState("all");
  const navigate = useNavigate();

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ['assets', search, productType],
    queryFn: async () => {
      // Backend returns array of assets
      const res = await axiosSecure.get(`/assets?search=${search}&type=${productType === "all" ? "" : productType}`);
      return res.data;
    },
    refetchOnMount: true,
    staleTime: 0
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

  const handleEdit = (id) => {
    navigate(`/assets/${id}`);
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
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-10"
          />
        </div>
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Assets Table */}
      <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-base-content/60">No assets found</td>
              </tr>
            ) : (
              assets.map((asset) => (
                <tr key={asset._id}>
                  <td>
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-base-content/10">
                      <img src={asset.productImage} alt={asset.productName} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="font-semibold">{asset.productName}</td>
                  <td>
                    <span className={`badge ${asset.productType === 'Returnable' ? 'badge-primary' : 'badge-ghost'}`}>
                      {asset.productType}
                    </span>
                  </td>
                  <td>{asset.productQuantity}</td>
                  <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(asset._id)} className="btn btn-sm btn-ghost text-primary">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(asset._id)} className="btn btn-sm btn-ghost text-error">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HRDashboard;
