import { Navigate } from "react-router";
import Spinner from "../components/ui/Spinner";
import useAuth from "../hooks/useAuth";
import useUserRole from "../hooks/useUserRole";

const HRRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const { role, roleLoading } = useUserRole();

    if (loading || roleLoading) {
        return <Spinner />;
    }
    if (!user || role !== 'hr') {
        return <Navigate to="/forbidden" />;
    }
    return children;
};

export default HRRoutes;

