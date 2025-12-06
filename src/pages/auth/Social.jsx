import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router';
import Button from '../../components/ui/Button';
import { FcGoogle } from 'react-icons/fc';
import Spinner from '../../components/ui/Spinner';
import useAxios from '../../hooks/useAxios';

const Social = ({ defaultRole = "employee" }) => {
    const { createUserWithGoogle, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [showSpinner, setShowSpinner] = useState(false);
    const axiosInstance = useAxios()

    // google sign in/up
    const handleSignInWithGoogle = async () => {
        try {
            setShowSpinner(true);
            // Sign in with Google via Firebase
            const result = await createUserWithGoogle();
            const firebaseUser = result.user;
            
            // Set Firebase user
            setUser(firebaseUser);

            // Register user in backend with default role
            try {
                const registrationData = {
                    name: firebaseUser.displayName || firebaseUser.name || '',
                    email: firebaseUser.email,
                    password: '', // Google auth doesn't need password - backend should handle this
                    role: defaultRole,
                    dateOfBirth: '', // Can be updated later
                    profileImage: firebaseUser.photoURL || '',
                };

                // Add HR specific fields if role is hr
                if (defaultRole === 'hr') {
                    registrationData.companyName = '';
                    registrationData.companyLogo = firebaseUser.photoURL || '';
                }

                // Try to register in backend (will handle if user already exists)
                try {
                    await axiosInstance.post('/register', registrationData);
                } catch (registerError) {
                    // If user already exists, that's okay - continue
                    if (registerError.response?.status !== 400 || 
                        !registerError.response?.data?.message?.includes('already exists')) {
                        console.error('Backend registration error:', registerError);
                    }
                }
            } catch (backendError) {
                console.error('Backend registration error:', backendError);
                // Continue even if backend registration fails - Firebase user is already created
            }

            // Show SweetAlert success popup
            Swal.fire({
                icon: 'success',
                title: 'Sign Up Successful!',
                text: 'Your account has been created with Google.',
                showConfirmButton: false,
                timer: 1500,
            });
            
            // Redirect to the desired route after sign in
            const from = location.state?.from?.pathname || "/";
            setTimeout(() => {
                navigate(from, { replace: true });
            }, 1500);
        } catch (error) {
            setShowSpinner(false);
            console.error('Google sign-in error:', error);
            let errorMessage = "Sign up failed. Please try again.";
            if (error.code === 'auth/popup-closed-by-user') {
                errorMessage = "Sign up was cancelled.";
            } else if (error.code === 'auth/popup-blocked') {
                errorMessage = "Pop-up was blocked. Please allow pop-ups and try again.";
            } else if (error.code === 'auth/account-exists-with-different-credential') {
                errorMessage = "An account already exists with the same email address but different sign-in credentials.";
            } else if (error.code === 'auth/email-already-in-use') {
                errorMessage = "This email is already registered. Please sign in instead.";
            }
            Swal.fire({
                title: "Sign Up Failed",
                text: errorMessage,
                icon: "error",
                showConfirmButton: true,
            });
        }
    };

    return (
        <div className="relative">
            {showSpinner && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/80">
                    <Spinner />
                    <span className="ml-4 text-lg font-semibold text-primary">Loading...</span>
                </div>
            )}
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-base-content/20"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-base-100 text-base-content/60">OR</span>
                </div>
            </div>
            <Button
                onClick={handleSignInWithGoogle}
                variant="outline"
                className="w-full flex justify-center items-center gap-3 text-base font-medium hover:bg-base-200"
            >
                <FcGoogle className="text-xl" />
                Continue with Google
            </Button>
        </div>
    );
};

export default Social;