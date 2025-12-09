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
      // Check if sessionId is the placeholder string
      if (sessionId === '{CHECKOUT_SESSION_ID}') {
        console.log('Stripe placeholder session ID detected, waiting for redirect...');
        // Don't process yet, wait for actual redirect
        return;
      }
      
      if (status === 'success') {
        // Poll for payment confirmation
        const checkPaymentStatus = async () => {
          // Prevent infinite retries
          if (retryCount >= 5) {
            console.error('Maximum retry attempts reached. Please refresh the page.');
            Swal.fire('Error', 'Unable to verify payment status after multiple attempts. Please refresh the page.', 'error');
            return;
          }
          
          setRetryCount(prev => prev + 1);
          
          try {
            console.log(`Checking payment status for session: ${sessionId} (attempt ${retryCount + 1})`);
            
            // First try to refresh user data directly since the server-side processing should have updated it
            const freshUserData = await axiosSecure.get('/users/me');
            console.log('Fresh user data:', freshUserData.data);
            
            // Check if package was updated by comparing with current data
            if (freshUserData.data.packageLimit > (userData?.packageLimit || 5)) {
              Swal.fire('Success', 'Package upgraded successfully!', 'success');
              refetchUserData(); // Refresh user data in the cache
              setRetryCount(0); // Reset retry count on success
            } else {
              // If no update detected yet, try the payment status endpoint
              try {
                const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                const response = await axios.get(`${baseURL}/payments/session/${sessionId}`);
                console.log('Payment status response:', response.data);
                
                if (response.data.status === 'completed') {
                  Swal.fire('Success', 'Package upgraded successfully!', 'success');
                  refetchUserData(); // Refresh user data
                  setRetryCount(0); // Reset retry count on success
                } else if (response.data.status === 'pending') {
                  // If payment is still processing, wait and check again
                  setTimeout(checkPaymentStatus, 2000);
                } else {
                  // Wait a bit longer and try refreshing user data again
                  setTimeout(checkPaymentStatus, 3000);
                }
              } catch (endpointError) {
                console.log('Payment status endpoint error, will retry user data check:', endpointError.message);
                // Just retry checking user data after a delay
                setTimeout(checkPaymentStatus, 3000);
              }
            }
          } catch (error) {
            console.error('Error checking payment status:', error);
            Swal.fire('Error', 'Unable to verify payment status. Please refresh the page.', 'error');
            setRetryCount(0); // Reset retry count on error
          }
        };
        
        // Add a small delay before checking to ensure Stripe has processed the payment
        setTimeout(checkPaymentStatus, 1000);
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else if (status === 'error') {
        const errorCode = searchParams.get('code');
        let errorMessage = 'Payment failed';
        
        switch(errorCode) {
          case 'missing_session_id':
            errorMessage = 'Session ID is missing';
            break;
          case 'session_not_found':
            errorMessage = 'Payment session not found';
            break;
          case 'missing_metadata':
            errorMessage = 'Payment information is incomplete';
            break;
          case 'user_not_found':
            errorMessage = 'User account not found';
            break;
          case 'update_failed':
            errorMessage = 'Failed to update package';
            break;
          default:
            errorMessage = 'Payment processing failed';
        }
        
        Swal.fire('Error', errorMessage, 'error');
        
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }
  }, [searchParams, axiosSecure, refetchUserData]);

  const handleUpgrade = async (pkg) => {
    setLoading(true);
    
    try {
      // Create checkout session
      const { data } = await axiosSecure.post('/create-checkout-session', {
        packageName: pkg.name,
        successUrl: `${window.location.origin}${window.location.pathname}?status=success`,
        cancelUrl: `${window.location.origin}${window.location.pathname}?status=cancelled`
      });

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
      
      // Handle different types of errors
      let errorMessage = 'Failed to initiate payment';
      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK') {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else if (error.code === 'ERR_CANCELED') {
        errorMessage = 'Payment was cancelled. Please try again.';
      }
      
      Swal.fire('Error', errorMessage, 'error');
      setLoading(false);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gradient">Upgrade Package</h1>
      
      <div className="bg-base-100 p-6 rounded-xl shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Current Package</h2>
        <p className="text-lg">
          <span className="font-semibold">Package:</span> {userData?.subscription || 'Basic'}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Employee Limit:</span> {userData?.packageLimit || 5}
        </p>
        <p className="text-lg">
          <span className="font-semibold">Current Employees:</span> {userData?.currentEmployees || 0}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className={`bg-base-100 p-6 rounded-xl shadow-lg ${
              pkg.name.toLowerCase() === userData?.subscription?.toLowerCase() ? 'border-2 border-primary' : ''
            }`}
          >
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

            {pkg.name.toLowerCase() === userData?.subscription?.toLowerCase() ? (
              <button className="btn btn-outline w-full" disabled>
                Current Package
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
        ))}
      </div>
    </div>
  );
};

export default UpgradePackage;

