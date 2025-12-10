import { NavLink, Link, useNavigate } from "react-router"; // Fixed import
import { useEffect, useRef, useState } from "react";
import {
  MdMenu,
  MdClose,
  MdLogout,
} from "react-icons/md";
import Button from "../ui/Button";
import Swal from "sweetalert2";
import ThemeToggle from "../ui/ThemeToggle";
import userLogo from "../../assets/user-logo.png";
import logo from "../../assets/logo.png";

import useAuth from "../../hooks/useAuth";
import useUserRole from "../../hooks/useUserRole";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const { role } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  //Sign Out user
  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#143065", // Primary dark blue
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign out!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await signOutUser();
        // Force reload or just navigate? Navigation is usually enough in React, 
        // but user asked for "auto reload" feel. signOutUser usually clears context.
        // We'll trust context update, but navigate to home.
        Swal.fire({
          title: "Signed Out",
          text: "See you next time!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/');
      }
    });
  };

  const navLinkStyles = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive
      ? "text-primary font-bold border-b-2 border-primary" // Active state style
      : "hover:text-primary"
    }`;

  const mobileLinkStyles = ({ isActive }) =>
    `block px-4 py-3 rounded-lg font-medium transition-all ${isActive
      ? "bg-primary/10 text-primary border-l-4 border-primary"
      : "hover:bg-base-200 hover:text-primary"
    }`;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userLinks = {
    employee: [
      { path: '/dashboard', label: 'Dashboard', isDashboard: true },
      { path: '/dashboard/my-assets', label: 'My Assets' },
      { path: '/dashboard/my-team', label: 'My Team' },
      { path: '/dashboard/request-asset', label: 'Request Asset' },
      { path: '/dashboard/my-profile', label: 'Profile' },
    ],
    hr: [
      { path: '/dashboard', label: 'Dashboard', isDashboard: true },
      { path: '/dashboard/asset-list', label: 'Asset List' }, // Default HR home might be asset list or separate
      { path: '/dashboard/add-asset', label: 'Add Asset' },
      { path: '/dashboard/all-requests', label: 'All Requests' },
      { path: '/dashboard/employee-list', label: 'Employee List' },
      { path: '/dashboard/my-profile', label: 'Profile' },
    ],
  };

  const currentRoleLinks = userLinks[role] || [];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-base-100/95 backdrop-blur-md ${scrolled
        ? "shadow-md py-2 border-b border-base-200"
        : "py-3 md:py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">

          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-xl transition-transform group-hover:scale-105">
              <img src={logo} alt="AssetVerse" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-base-content">
              <span className="text-gradient">AssetVerse</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLinkStyles}>Home</NavLink>
            <NavLink to="/about-us" className={navLinkStyles}>About Us</NavLink>
            <NavLink to="/support" className={navLinkStyles}>Support</NavLink>
          </div>

          {/* Rigth Side Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-3 pl-3 pr-1 py-1 rounded-full border border-base-200 hover:border-primary/50 transition-all hover:shadow-md group"
                >
                  <span className="text-sm font-medium max-w-[100px] truncate hidden xl:block">
                    {user.displayName}
                  </span>
                  <div className="w-9 h-9 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary transition-all">
                    <img src={user.photoURL || userLogo} alt="profile" className="w-full h-full object-cover" />
                  </div>
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute right-0 mt-3 w-56 bg-base-100 rounded-xl shadow-2xl ring-1 ring-black/5 py-2 transform transition-all duration-200 origin-top-right ${showDropdown
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                >
                  <div className="px-4 py-3 border-b border-base-200">
                    <p className="text-sm font-semibold truncate">{user.displayName}</p>
                    <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                    <div className="mt-2 text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary w-fit uppercase">
                      {role}
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-base-200 transition-colors"
                    >
                      <span className="text-lg">📊</span> Dashboard
                    </Link>
                  </div>

                  <div className="border-t border-base-200 pt-2 pb-1">
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors flex items-center gap-2"
                    >
                      <MdLogout /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link to="/signin">
                <button className="btn btn-gradient text-white btn-sm px-6 h-10 rounded-full shadow-lg hover:shadow-xl">
                  Login
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 text-base-content transition-colors hover:text-primary"
            >
              {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={toggleMenu}
      />

      <div
        className={`lg:hidden fixed top-0 right-0 z-50 w-[80%] max-w-sm h-full bg-base-100 shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 flex justify-between items-center border-b border-base-200">
          <span className="font-bold text-lg text-gradient">Menu</span>
          <button onClick={toggleMenu} className="p-2 hover:bg-base-200 rounded-full">
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-4 flex flex-col h-[calc(100%-70px)]">
          <div className="flex-1 space-y-2 overflow-y-auto">
            <NavLink to="/" onClick={toggleMenu} className={mobileLinkStyles}>Home</NavLink>
            <NavLink to="/about-us" onClick={toggleMenu} className={mobileLinkStyles}>About Us</NavLink>
            <NavLink to="/support" onClick={toggleMenu} className={mobileLinkStyles}>Support</NavLink>

            {user && (
              <>
                <div className="my-4 border-t border-base-200" />
                <p className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">Dashboard</p>
                {currentRoleLinks.map((link, idx) => (
                  <NavLink
                    key={idx}
                    to={link.path}
                    onClick={toggleMenu}
                    className={mobileLinkStyles}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </>
            )}
          </div>

          <div className="pt-4 border-t border-base-200 mt-auto">
            {!user ? (
              <div className="space-y-3">
                <Link to="/signin" onClick={toggleMenu} className="block w-full">
                  <button className="btn btn-gradient w-full text-white">Login</button>
                </Link>
                <Link to="/signup" onClick={toggleMenu} className="block w-full">
                  <button className="btn btn-outline border-base-300 w-full">Join Now</button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 px-2">
                  <img src={user.photoURL || userLogo} className="w-10 h-10 rounded-full bg-base-200" />
                  <div className="overflow-hidden">
                    <p className="font-semibold truncate">{user.displayName}</p>
                    <p className="text-xs text-base-content/60 truncate">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogOut();
                    toggleMenu();
                  }}
                  className="w-full btn btn-error btn-outline btn-sm"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
