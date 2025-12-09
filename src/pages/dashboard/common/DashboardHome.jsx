
import Spinner from "../../../components/ui/Spinner";
import useUserRole from "../../../hooks/useUserRole";
import Forbidden from "../../forbidden/Forbidden";
import MyAssets from "../employee/MyAssets";
import HRDashboard from "../hr/HRDashboard";


const DashboardHome = () => {
    const { role, roleLoading } = useUserRole();

    if (roleLoading) {
        return <Spinner />;
    }
    if (role === 'employee') {
        return <MyAssets />;
    } else if (role === 'hr') {
        return <HRDashboard />;
    } else if (role === 'admin') {
        return <HRDashboard />; // Using HR dashboard for admin as well
    } else {
        return <Forbidden />;
    }
};

export default DashboardHome;