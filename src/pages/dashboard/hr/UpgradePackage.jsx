import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaCheck } from "react-icons/fa";
import Spinner from "../../../components/ui/Spinner";
import { useSearchParams } from "react-router";
import axios from "axios";

const UpgradePackage = () => {
  const axiosSecure = useAxiosSecure();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      const res = await axiosSecure.get('/packages');
      return res.data;
    }
  });

  const { data: userData, refetch: refetchUserData } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/me');
      return res.data;
    }
  });

  // Handle payment status from URL parameters
  useEffect(() => {
    const status = searchParams.get('status');
    const sessionId = searchParams.get('session_id');

    if (status && sessionId) {
      if (sessionId === '{CHECKOUT_SESSION_ID}') {
        return;
      }

      if (status === 'success') {
        const checkPaymentStatus = async () => {
          if (retryCount >= 5) {
            Swal.fire('Error', 'Unable to verify payment status. Please check your profile.', 'error');
            return;
          }

          setRetryCount(prev => prev + 1);

          try {
            const freshUserData = await axiosSecure.get('/users/me');
            if (freshUserData.data.packageLimit > (userData?.packageLimit || 5)) {
              Swal.fire('Success', 'Package upgraded successfully!', 'success');
              refetchUserData();
              setRetryCount(0);
            } else {
              // Fallback check
              setTimeout(checkPaymentStatus, 2000);
            }
          } catch (error) {
            console.error(error);
          }
        };

        setTimeout(checkPaymentStatus, 1000);
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (status === 'error') {
        Swal.fire('Error', 'Payment failed or cancelled', 'error');
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [searchParams, axiosSecure]); // Removed refetchUserData from deps to avoid loop if used wrongly

  const handleUpgrade = async (pkg) => {
    setLoading(true);

    try {
      const { data } = await axiosSecure.post('/create-checkout-session', {
        packageName: pkg.name,
        successUrl: `${window.location.origin}${window.location.pathname}?status=success`,
        cancelUrl: `${window.location.origin}${window.location.pathname}?status=cancelled`
      });
      window.location.href = data.url;
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Failed to initiate payment', 'error');
      setLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  // Helper to determine if a package is "lower" or "equal"
  const getPackageLevel = (name) => {
    const levels = { 'basic': 1, 'standard': 2, 'premium': 3 };
    return levels[name?.toLowerCase()] || 0;
  };

  const currentLevel = getPackageLevel(userData?.subscription);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gradient">Upgrade Package</h1>

      <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-6 border border-primary/10">
        <h2 className="text-xl font-semibold mb-2">Current Subscription</h2>
        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-base-200 rounded-lg">
            <p className="text-sm text-base-content/60">Current Plan</p>
            <p className="text-xl font-bold capitalize">{userData?.subscription || 'Basic'}</p>
          </div>
          <div className="p-4 bg-base-200 rounded-lg">
            <p className="text-sm text-base-content/60">Employee Limit</p>
            <p className="text-xl font-bold">{userData?.packageLimit || 5}</p>
          </div>
          <div className="p-4 bg-base-200 rounded-lg">
            <p className="text-sm text-base-content/60">Used Slots</p>
            <p className="text-xl font-bold">{userData?.currentEmployees || 0}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg, i) => {
          const pkgLevel = getPackageLevel(pkg.name);
          const isCurrent = pkgLevel === currentLevel;
          const isLower = pkgLevel < currentLevel;

          return (
            <div
              key={i}
              className={`bg-base-100 p-6 rounded-xl shadow-lg transition-all hover:shadow-xl relative overflow-hidden ${isCurrent ? 'border-2 border-primary ring-2 ring-primary/20' : 'border border-transparent'
                }`}
            >
              {isCurrent && (
                <div className="absolute top-0 right-0 bg-primary text-white text-xs px-3 py-1 rounded-bl-lg">
                  Active Plan
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
              <div className="text-3xl font-bold text-gradient mb-4">
                ${pkg.price}
                <span className="text-lg text-base-content/70">/month</span>
              </div>
              <p className="text-base-content/70 mb-4">Up to {pkg.employeeLimit} employees</p>

              <ul className="space-y-2 mb-6">
                {pkg.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <FaCheck className="text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {isCurrent ? (
                <button className="btn btn-disabled w-full bg-base-200 text-base-content/50 cursor-not-allowed">
                  Current Plan
                </button>
              ) : isLower ? (
                <button className="btn btn-disabled w-full bg-base-200 text-base-content/50 cursor-not-allowed">
                  Please Contact Support to Downgrade
                </button>
              ) : (
                <button
                  onClick={() => handleUpgrade(pkg)}
                  className="btn btn-gradient text-white w-full"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : `Upgrade to ${pkg.name}`}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UpgradePackage;
