import { createBrowserRouter } from "react-router";
import Root from "../layout/Root";
import Home from "../pages/home/Home";
import SignIn from "../pages/auth/SignIn";
import SignUp from "../pages/auth/SignUp";
import MyProfile from "../pages/myprofile/MyProfile";
import PrivateRoutes from "./PrivateRoutes";
import HRRoutes from "./HRRoutes";
import EmployeeRoutes from "./EmployeeRoutes";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../pages/dashboard/common/DashboardHome";
import NotFound from "../pages/notFound/NotFound";
import Forbidden from "../pages/forbidden/Forbidden";

// HR Dashboard Pages
import AddAsset from "../pages/dashboard/hr/AddAsset";
import AllRequests from "../pages/dashboard/hr/AllRequests";
import EmployeeList from "../pages/dashboard/hr/EmployeeList";
import UpgradePackage from "../pages/dashboard/hr/UpgradePackage";

// Employee Dashboard Pages
import MyAssets from "../pages/dashboard/employee/MyAssets";
import RequestAsset from "../pages/dashboard/employee/RequestAsset";
import MyTeam from "../pages/dashboard/employee/MyTeam";
import Analytics from "../pages/dashboard/hr/Analytics";
import UpdateAsset from "../pages/dashboard/hr/UpdateAsset";
import About from "../components/homePage/About";
import Support from "../pages/PageOfStatic/Support";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      { path: 'forbidden', Component: Forbidden },
      { path: "signin", Component: SignIn },
      { path: "signup", Component: SignUp },
      { path: "about-us", Component: About },
      { path: "support", Component: Support },
      {
        path: "my-profile",
        element: (
          <PrivateRoutes>
            <MyProfile />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <PrivateRoutes><DashboardLayout /></PrivateRoutes>,
    children: [
      // Default dashboard route that handles all roles
      {
        path: '',
        Component: DashboardHome
      },
      // HR Routes
      {
        path: 'add-asset',
        element: <HRRoutes><AddAsset /></HRRoutes>
      },
      {
        path: 'all-requests',
        element: <HRRoutes><AllRequests /></HRRoutes>
      },
      {
        path: 'employee-list',
        element: <HRRoutes><EmployeeList /></HRRoutes>
      },
      {
        path: 'upgrade-package',
        element: <HRRoutes><UpgradePackage /></HRRoutes>
      },
      {
        path: 'my-profile',
        element: <MyProfile />
      },
      {
        path: 'analytics',
        element: <Analytics />
      },

      // Employee Routes
      {
        path: 'my-assets',
        element: <EmployeeRoutes><MyAssets /></EmployeeRoutes>
      },
      {
        path: 'request-asset',
        element: <EmployeeRoutes><RequestAsset /></EmployeeRoutes>
      },
      {
        path: 'my-team',
        element: <EmployeeRoutes><MyTeam /></EmployeeRoutes>
      },
    ]
  },
  {
    path: '*',
    Component: NotFound
  }
]);

export default router;
