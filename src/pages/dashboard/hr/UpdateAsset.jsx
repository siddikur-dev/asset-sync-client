import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router"; // react-router-dom v6 -> react-router in v7
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../components/ui/Spinner";

const UpdateAsset = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    const { data: asset, isLoading } = useQuery({
        queryKey: ['asset', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/assets/${id}`);
            return res.data;
        }
    });

    useEffect(() => {
        if (asset) {
            setValue("productName", asset.productName);
            setValue("productType", asset.productType);
            setValue("productQuantity", asset.productQuantity);
            // Note: We don't pre-fill file input, user must upload new if they want to change
        }
    }, [asset, setValue]);

    const onSubmit = async (data) => {
        try {
            // 1. Upload new image if provided
            let imageUrl = asset.productImage;
            if (data.productImage && data.productImage[0]) {
                const formData = new FormData();
                formData.append('image', data.productImage[0]);
                
                // Use regular fetch for ImgBB API to avoid CORS issues
                const res = await fetch(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                    {
                        method: 'POST',
                        body: formData
                    }
                );
                const result = await res.json();
                if (result.success) {
                    imageUrl = result.data.display_url;
                } else {
                    throw new Error('Image upload failed');
                }
            }

            // 2. Prepare Update Data
            const updateItem = {
                productName: data.productName,
                productType: data.productType,
                productQuantity: parseInt(data.productQuantity),
                productImage: imageUrl
            };

            // 3. Send PUT Request
            const menuRes = await axiosSecure.put(`/assets/${id}`, updateItem);

            if (menuRes.data.modifiedCount > 0 || menuRes.data.matchedCount > 0) {
                // matchedCount > 0 covers case where data didn't change but request succeeded
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.productName} updated successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
            Swal.fire('Error', 'Failed to update asset', 'error');
        }
    };

    if (isLoading) return <Spinner />;

    return (
        <div className="w-full p-10">
            <h2 className="text-3xl font-bold text-gradient mb-10">Update Asset</h2>

            <div className="bg-base-100 p-8 rounded-xl shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Product Name */}
                    <div className="form-control w-full mb-6">
                        <label className="label">
                            <span className="label-text font-semibold">Product Name*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Product Name"
                            {...register("productName", { required: true })}
                            className="input input-bordered w-full"
                        />
                        {errors.productName && <span className="text-red-500 text-sm mt-1">Product Name is required</span>}
                    </div>

                    <div className="flex gap-6">
                        {/* Product Type */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text font-semibold">Product Type*</span>
                            </label>
                            <select
                                defaultValue="default"
                                {...register("productType", { required: true })}
                                className="select select-bordered w-full"
                            >
                                <option disabled value="default">Select a category</option>
                                <option value="Returnable">Returnable</option>
                                <option value="Non-returnable">Non-returnable</option>
                            </select>
                            {errors.productType && <span className="text-red-500 text-sm mt-1">Product Type is required</span>}
                        </div>

                        {/* Product Quantity */}
                        <div className="form-control w-full md:w-1/2">
                            <label className="label">
                                <span className="label-text font-semibold">Product Quantity*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Quantity"
                                {...register("productQuantity", { required: true, min: 0 })}
                                className="input input-bordered w-full"
                            />
                            {errors.productQuantity && <span className="text-red-500 text-sm mt-1">Quantity is required</span>}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text font-semibold">Change Image (Optional)</span>
                        </label>
                        <div className="flex items-center gap-4">
                            {asset?.productImage && (
                                <img src={asset.productImage} alt="Current" className="w-16 h-16 object-cover rounded-lg border" />
                            )}
                            <input
                                {...register("productImage")}
                                type="file"
                                className="file-input file-input-bordered w-full max-w-xs"
                            />
                        </div>
                    </div>

                    <button className="btn btn-gradient w-full text-white mt-4">
                        Update Asset
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="btn btn-ghost w-full mt-2"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateAsset;
