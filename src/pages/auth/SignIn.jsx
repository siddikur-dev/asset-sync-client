import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Spinner from "../../components/ui/Spinner";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { inputBase } from "../../utils/inputBase";


const SignIn = () => {
  const { user, signInUser, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [formError, setFormError] = useState("");
  
  const togglePassword = () => setShowPassword(!showPassword);
  
  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate(location?.state?.from?.pathname || location?.state || "/");
      }, 100);
    } else {
      setLoading(false);
    }
  }, [user, location, navigate]);

  const onSubmit = async (data) => {
    clearErrors();
    setFormError("");
    setSigningIn(true);
    
    try {
      // Login via Firebase first
      const userCredential = await signInUser(data.email, data.password);
      const firebaseUser = userCredential.user;
      
      // Set Firebase user
      setUser(firebaseUser);

      Swal.fire({
        icon: "success",
        title: "Sign In Successful!",
        text: "Welcome back!",
        showConfirmButton: false,
        timer: 1500,
      });

      // Navigate to intended route or dashboard
      const from = location?.state?.from?.pathname || "/";
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 1500);
    } catch (error) {
      let errorMsg = "Login failed. Please try again.";
      if (error.code === "auth/user-not-found") {
        errorMsg = "No account found with this email. Please sign up first.";
      } else if (error.code === "auth/wrong-password") {
        errorMsg = "Incorrect password. Please try again.";
      } else if (error.code === "auth/invalid-email") {
        errorMsg = "Invalid email address.";
      } else if (error.message) {
        errorMsg = error.message;
      }
      setFormError(errorMsg);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: errorMsg,
      });
    } finally {
      setSigningIn(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 ">
      <title>Sign In | Asset Sync</title>
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-gradient">Welcome Back</span>
          </h1>
          <p className="text-base-content/70 text-lg">Sign in to continue to your account</p>
        </div>

        {/* Form Card */}
        <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-content/10 p-6 md:p-10">
          {formError && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-error text-center font-medium">{formError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-base-content">
                Email Address *
              </label>
              <div className="relative group">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 text-lg group-focus-within:text-gradient transition-colors" />
                <input
                  type="email"
                  name="email"
                  className={inputBase}
                  placeholder="Enter your email address"
                  {...register("email", { required: "Email is required" })}
                />
              </div>
              {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-base-content">
                Password *
              </label>
              <div className="relative group">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-content/50 text-lg group-focus-within:text-gradient transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className={inputBase}
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-base-content/70 hover:text-gradient transition-colors"
                  onClick={togglePassword}
                >
                  {showPassword ? <FaEyeSlash className="text-lg" /> : <FaEye className="text-lg" />}
                </span>
              </div>
              {errors.password && <span className="text-error text-xs">{errors.password.message}</span>}
              <div className="flex justify-end mt-2">
                <Link
                  to="/reset-password"
                  className="text-xs text-gradient hover:opacity-80 underline transition-opacity font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button type="submit" className="w-full mt-6" disabled={signingIn}>
              {signingIn ? (
                <div className="flex justify-center items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing In...
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <p className="text-sm mt-6 text-base-content text-center">
            Don't have an account?{" "}
            <Link to="/signUp" className="text-gradient font-semibold underline hover:opacity-80 transition-opacity">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
