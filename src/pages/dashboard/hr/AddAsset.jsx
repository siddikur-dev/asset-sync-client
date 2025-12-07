import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import { useState } from "react";
import { uploadImageToImgBB } from "../../../utils/uploadImageToImgBB";
import Swal from "sweetalert2";
import { inputBase } from "../../../utils/inputBase";
import { FaUpload } from "react-icons/fa";

const AddAsset = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    if (!imagePreview) {
      Swal.fire('Error', 'Please upload a product image', 'error');
      return;
    }

    setUploading(true);
    try {
      const fileInput = document.querySelector('input[type="file"]');
      const file = fileInput.files[0];
      
      const uploadResult = await uploadImageToImgBB(file);
      
      const assetData = {
        productName: data.productName,
        productImage: uploadResult.url,
        productType: data.productType,
        productQuantity: parseInt(data.productQuantity)
      };

      const res = await axiosSecure.post('/assets', assetData);
      
      if (res.data.success) {
        Swal.fire('Success', 'Asset added successfully!', 'success');
        navigate('/dashboard');
      }
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Failed to add asset', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gradient mb-6">Add New Asset</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-base-100 p-8 rounded-2xl shadow-lg">
        <div>
          <label className="label">
            <span className="label-text font-semibold">Product Name *</span>
          </label>
          <input
            type="text"
            {...register("productName", { required: true })}
            className={inputBase}
            placeholder="Enter product name"
          />
          {errors.productName && <span className="text-error text-sm">Product name is required</span>}
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Product Image *</span>
          </label>
          <div className="relative">
            <FaUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`${inputBase} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:btn-gradient file:text-white`}
            />
          </div>
          {imagePreview && (
            <div className="mt-4">
              <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg" />
            </div>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Product Type *</span>
          </label>
          <select
            {...register("productType", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select type</option>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
          {errors.productType && <span className="text-error text-sm">Product type is required</span>}
        </div>

        <div>
          <label className="label">
            <span className="label-text font-semibold">Product Quantity *</span>
          </label>
          <input
            type="number"
            {...register("productQuantity", { required: true, min: 1 })}
            className={inputBase}
            placeholder="Enter quantity"
            min="1"
          />
          {errors.productQuantity && <span className="text-error text-sm">Valid quantity is required</span>}
        </div>

        <button type="submit" className="btn btn-gradient text-white w-full" disabled={uploading}>
          {uploading ? 'Adding Asset...' : 'Add Asset'}
        </button>
      </form>
    </div>
  );
};

export default AddAsset;

