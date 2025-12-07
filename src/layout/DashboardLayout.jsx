import { useState } from "react";
import { NavLink, Outlet } from "react-router";
import { FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaUsers, FaBox, FaPlusCircle, FaClipboardList, FaChartBar, FaUser, FaHome, FaShoppingCart, FaBuilding } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useUserRole from "../hooks/useUserRole";
import Spinner from "../components/ui/Spinner";
import Logo from "../components/shared/Logo";
import Button from "../components/ui/Button";

const hrLinks = [
  {
    to: "/dashboard",
    label: "Asset List",
    icon: <FaBox />,
  },
  {
    to: "/dashboard/add-asset",
    label: "Add Asset",
    icon: <FaPlusCircle />,
  },
  {
    to: "/dashboard/all-requests",
    label: "All Requests",
    icon: <FaClipboardList />,
  },
  {
    to: "/dashboard/employee-list",
    label: "Employee List",
    icon: <FaUsers />,
  },
  {
    to: "/dashboard/upgrade-package",
    label: "Upgrade Package",
    icon: <FaShoppingCart />,
  },
  {
    to: "/dashboard/analytics",
    label: "Analytics",
    icon: <FaChartBar />,
  },
  {
    to: "/dashboard/my-profile",
    label: "My Profile",
    icon: <FaUser />,
  },
];

const employeeLinks = [
  {
    to: "/dashboard",
    label: "My Assets",
    icon: <FaBox />,
  },
  {
    to: "/dashboard/request-asset",
    label: "Request Asset",
    icon: <FaPlusCircle />,
  },
  {
    to: "/dashboard/my-team",
    label: "My Team",
    icon: <FaBuilding />,
  },
  {
    to: "/dashboard/my-profile",
    label: "My Profile",
    icon: <FaUser />,
  },
];

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  const { user, signOutUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine links based on role
  let navLinks = [];
  if (role === "hr") navLinks = hrLinks;
  else if (role === "employee") navLinks = employeeLinks;

  //Sign Out user
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser();
        Swal.fire({
          title: "Sign out!",
          text: "You have been Sign out.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  if (roleLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex min-h-screen bg-base-200 max-w-7xl mx-auto relative">
      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-base-100 shadow-md transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-200 ease-in-out md:translate-x-0 md:relative md:w-64`}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <Logo />
          <button className="md:hidden text-2xl" onClick={() => setSidebarOpen(false)}>
            <FaTimes />
          </button>
        </div>
        <nav className="mt-4 flex flex-col gap-1">
          {navLinks.map((link, idx) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={idx === 0}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-1.5 font-medium transition-colors ${isActive ? "bg-primary text-white" : "text-base-content hover:bg-primary/10"
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Button
          className="btn btn-sm flex mx-auto mt-4 lg:hidden items-center gap-2"
          onClick={handleLogOut}
        >
          <FaSignOutAlt /> Sign Out
        </Button>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col w-full">
        {/* Header */}
        <header className="max-w-5xl mx-auto fixed top-0 left-0 md:left-64 right-0 z-10 bg-base-100 px-4 py-3 shadow flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-2xl" onClick={() => setSidebarOpen(true)}>
              <FaBars />
            </button>
            <span className="text-2xl font-semibold text-primary">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  title={user?.displayName}
                  className="w-9 h-9 rounded-full object-cover border border-primary"
                />
              ) : (
                <FaUserCircle className="w-8 h-8 text-base-content" />
              )}
              <span className="font-medium hidden lg:inline">
                {user?.displayName || user?.name}
              </span>
              <span className="badge badge-outline rounded-md border-primary hidden lg:inline capitalize">
                {role}
              </span>
            </div>
            <Button
              className="btn btn-sm lg:flex items-center gap-2 hidden"
              onClick={handleLogOut}
            >
              <FaSignOutAlt /> Sign Out
            </Button>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="mt-[64px] p-4 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
