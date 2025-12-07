import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { FaSearch, FaHandPaper } from "react-icons/fa";
import Swal from "sweetalert2";
import Spinner from "../../../components/ui/Spinner";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ['available-assets', search],
    queryFn: async () => {
      const res = await axiosSecure.get('/assets/available');
      return res.data;
    }
  });

  const handleRequest = async (asset) => {
    setSelectedAsset(asset);
  };

  const submitRequest = async () => {
    if (!selectedAsset) return;

    try {
      const res = await axiosSecure.post('/requests', {
        assetId: selectedAsset._id,
        note: note
      });

      if (res.data.success) {
        Swal.fire('Success', 'Asset request submitted successfully!', 'success');
        setSelectedAsset(null);
        setNote("");
        refetch();
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to submit request', 'error');
    }
  };

  if (isLoading) return <Spinner />;

  const filteredAssets = assets.filter(asset =>
    asset.productName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gradient">Request Asset</h1>

      {/* Search */}
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
        <input
          type="text"
          placeholder="Search available assets..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full pl-10"
        />
      </div>

      {/* Assets Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <div key={asset._id} className="bg-base-100 p-6 rounded-xl shadow-lg">
            <img
              src={asset.productImage}
              alt={asset.productName}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">{asset.productName}</h3>
            <div className="flex items-center justify-between mb-4">
              <span className={`badge ${asset.productType === 'Returnable' ? 'badge-success' : 'badge-warning'}`}>
                {asset.productType}
              </span>
              <span className="text-sm text-base-content/70">
                Available: {asset.availableQuantity}
              </span>
            </div>
            <p className="text-sm text-base-content/70 mb-4">Company: {asset.companyName}</p>
            <button
              onClick={() => handleRequest(asset)}
              className="btn btn-gradient text-white w-full"
              disabled={asset.availableQuantity === 0}
            >
              <FaHandPaper className="mr-2" /> Request Asset
            </button>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <p className="text-base-content/70">No available assets found</p>
        </div>
      )}

      {/* Request Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-base-100 p-8 rounded-2xl max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Request Asset</h2>
            <div className="mb-4">
              <img
                src={selectedAsset.productImage}
                alt={selectedAsset.productName}
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <p className="font-semibold">{selectedAsset.productName}</p>
              <p className="text-sm text-base-content/70">{selectedAsset.companyName}</p>
            </div>
            <div className="mb-4">
              <label className="label">
                <span className="label-text">Note (Optional)</span>
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="textarea textarea-bordered w-full"
                placeholder="Add a note for your request..."
                rows="3"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setSelectedAsset(null);
                  setNote("");
                }}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button onClick={submitRequest} className="btn btn-gradient text-white flex-1">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAsset;

