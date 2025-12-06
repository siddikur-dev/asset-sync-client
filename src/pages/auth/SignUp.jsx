import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import Button from "../../components/ui/Button";
import useAuth from "../../hooks/useAuth";
import Social from "./Social";
import { useState, useEffect } from "react";
import Spinner from "../../components/ui/Spinner";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUser, FaUpload, FaTimes, FaGraduationCap, FaBuilding, FaCalendarAlt, FaUserTie, FaBriefcase } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { uploadImageToImgBB } from "../../utils/uploadImageToImgBB";
import { inputBase } from "../../utils/inputBase";

// const inputBase =
//   "w-full border-b-2 border-base-content/30 px-4 py-3 pl-10 rounded-none focus:outline-none focus:ring-0 focus:border-secondary transition duration-300 bg-transparent text-base-content placeholder:text-base-content/50";


const SignUp = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  // Add state for feedback
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [selectedRole, setSelectedRole] = useState("employee");
  const axiosInstance = useAxios()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate(location?.state || "/");
      }, 100);
    } else {
      setLoading(false);
    }
  }, [user, location, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormError("");
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFormError("Please select an image file.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setFormError("Image size should be less than 5MB.");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setValue("companyLogo", null);
    setFormError("");
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = '';
  };

  const onSubmit = async (data) => {
    setFormError("");
    setFormSuccess("");
    
    // Validation
    if (!data.name) {
      setFormError("Please enter your name.");
      return;
    }
    if (!data.email) {
      setFormError("Please enter your email address.");
      return;
    }
    if (!data.password) {
      setFormError("Please enter your password.");
      return;
    }
    if (!data.dateOfBirth) {
      setFormError("Please enter your date of birth.");
      return;
    }
    
    // HR specific validation
    if (selectedRole === "hr") {
      if (!data.companyName) {
        setFormError("Company name is required for HR.");
        return;
      }
      if (!selectedImage) {
        setFormError("Please select a company logo.");
        return;
      }
    }
    
    setUploading(true);
    try {
      // Prepare registration data
      const registrationData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: selectedRole,
        dateOfBirth: data.dateOfBirth,
      };

      // Handle company logo upload for HR
      if (selectedRole === "hr" && selectedImage) {
        const uploadResult = await uploadImageToImgBB(selectedImage);
        if (uploadResult.success) {
          registrationData.companyLogo = uploadResult.url;
        } else {
          registrationData.companyLogo = imagePreview; // Fallback to preview
        }
        registrationData.companyName = data.companyName;
      }

      // Register user via backend
      const response = await axiosInstance.post("/register", registrationData);
      
      if (response.data.success) {
        setFormSuccess("Registration Successful!");
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: response.data.message || "Your account has been created successfully.",
          showConfirmButton: false,
          timer: 1500
        });
        reset();
        setSelectedImage(null);
        setImagePreview(null);
        setSelectedRole("employee");
        // Navigate to sign in after successful registration
        setTimeout(() => {
          navigate("/signIn");
        }, 1500);
      } else {
        setFormError(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      let errorMsg = "Registration failed. Please try again.";
      if (error.response?.data?.message) {
        errorMsg = error.response.data.message;
      } else if (error.message) {
        errorMsg = error.message;
      }
      setFormError(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <title>Sign Up | Asset Sync</title>
      <div className="w-full max-w-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">Create Your Account</span>
          </h1>
          <p className="text-base-content/70 text-lg">Join us and start managing assets efficiently</p>
        </div>

        {/* Form Card */}
        <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-content/10 p-6 md:p-10">
          {/* Role Selection Cards */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-base-content mb-4">Select Your Role *</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("employee");
                  setSelectedImage(null);
                  setImagePreview(null);
                  setFormError("");
                  reset();
                }}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedRole === "employee"
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 shadow-lg scale-105"
                    : "border-base-content/20 hover:border-base-content/40 bg-base-200/50"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-4 rounded-full ${selectedRole === "employee" ? "bg-gradient-to-r from-blue-500 to-teal-400" : "bg-base-content/10"}`}>
                    <FaUserTie className={`text-2xl ${selectedRole === "employee" ? "text-white" : "text-base-content/60"}`} />
                  </div>
                  <span className={`font-semibold ${selectedRole === "employee" ? "text-gradient" : "text-base-content"}`}>Employee</span>
                  <p className="text-xs text-base-content/60 text-center">Join as an employee</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("hr");
                  setSelectedImage(null);
                  setImagePreview(null);
                  setFormError("");
                  reset();
                }}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedRole === "hr"
                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 shadow-lg scale-105"
                    : "border-base-content/20 hover:border-base-content/40 bg-base-200/50"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`p-4 rounded-full ${selectedRole === "hr" ? "bg-gradient-to-r from-blue-500 to-teal-400" : "bg-base-content/10"}`}>
                    <FaBriefcase className={`text-2xl ${selectedRole === "hr" ? "text-white" : "text-base-content/60"}`} />
                  </div>
                  <span className={`font-semibold ${selectedRole === "hr" ? "text-gradient" : "text-base-content"}`}>HR Manager</span>
                  <p className="text-xs text-base-content/60 text-center">Manage company assets</p>
                </div>
              </button>
            </div>
          </div>

          {formError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-error text-center font-medium">{formError}</p>
            </div>
          )}
          {formSuccess && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-success text-center font-medium">{formSuccess}</p>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-base-content">Full Name *</label>
              <div className="relative group">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 text-lg group-focus-within:text-gradient transition-colors" />
                <input type="text" {...register("name", { required: true })} className={inputBase} placeholder="Enter your full name" />
              </div>
              {errors.name && <span className="text-error text-xs">Name is required</span>}
            </div>

            {/* Company Name - Only for HR */}
            {selectedRole === "hr" && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-base-content">Company Name *</label>
                <div className="relative group">
                  <FaBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 text-lg group-focus-within:text-gradient transition-colors" />
                  <input type="text" {...register("companyName", { required: selectedRole === "hr" })} className={inputBase} placeholder="Enter your company name" />
                </div>
                {errors.companyName && <span className="text-error text-xs">Company name is required</span>}
              </div>
            )}

            {/* Company Logo - Only for HR */}
            {selectedRole === "hr" && (
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-base-content">Company Logo *</label>
                <div className="relative group">
                  <FaUpload className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 text-lg group-focus-within:text-gradient transition-colors" />
                  <input type="file" accept="image/*" {...register("companyLogo", { required: selectedRole === "hr" })} onChange={handleImageChange} className={`${inputBase} file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:btn-gradient file:text-white hover:file:opacity-90 file:cursor-pointer`} />
                </div>
                {imagePreview && (
                  <div className="mt-4 p-4 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl border border-base-content/10 relative">
                    <button type="button" onClick={handleRemoveImage} className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg z-10" title="Remove logo">
                      <FaTimes className="text-sm" />
                    </button>
                    <p className="text-xs text-base-content/70 mb-3 font-medium">Logo Preview:</p>
                    <div className="flex justify-center">
                      <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-r from-blue-500 to-teal-400 shadow-lg">
                        <img src={imagePreview} alt="Company Logo Preview" className="w-full h-full object-cover rounded-full" />
                      </div>
                    </div>
                  </div>
                )}
                {errors.companyLogo && <span className="text-error text-xs">Company logo is required</span>}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-base-content">Email Address *</label>
              <div className="relative group">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 text-lg group-focus-within:text-gradient transition-colors" />
                <input type="email" {...register("email", { required: true })} className={inputBase} placeholder="Enter your email address" />
              </div>
              {errors.email && <span className="text-error text-xs">Email is required</span>}
            </div>

            {/* Date of Birth Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-base-content">Date of Birth *</label>
              <div className="relative group">
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 text-lg group-focus-within:text-gradient transition-colors" />
                <input type="date" {...register("dateOfBirth", { required: true })} className={inputBase} placeholder="YYYY-MM-DD" max={new Date().toISOString().split('T')[0]} />
              </div>
              {errors.dateOfBirth && <span className="text-error text-xs">Date of birth is required</span>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-base-content">Password *</label>
              <div className="relative group">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 text-lg group-focus-within:text-gradient transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                    validate: {
                      hasUpperLower: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) || "Must contain both lower and upper case letters",
                      hasNumberOrSymbol: (v) => /[0-9!@#$%^&*(),.?":{}|<>]/.test(v) || "Must contain a number or symbol",
                      notEmail: (v) => !watch("email") || !v.includes(watch("email")) || "Password should not contain your email address",
                    },
                  })}
                  className={inputBase}
                  placeholder="Enter your password"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-base-content/70 hover:text-gradient transition-colors" onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                </span>
              </div>
              {errors.password && (
                <div className="text-error text-xs mt-1">
                  {errors.password.message}
                  {errors.password.type === "validate" &&
                    Object.values(errors.password.types || {}).map((msg, idx) => (
                      <div key={idx}>{msg}</div>
                    ))}
                </div>
              )}
            </div>

            <Button type="submit" className="w-full mt-6" disabled={uploading}>
              {uploading ? (
                <div className="flex justify-center items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Account...
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <Social />

          <p className="text-sm mt-6 text-base-content text-center">
            Already have an account?{" "}
            <Link to="/signIn" className="text-gradient font-semibold underline hover:opacity-80 transition-opacity">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
