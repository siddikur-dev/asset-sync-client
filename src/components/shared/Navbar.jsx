import { NavLink, Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import {
  MdMenu,
  MdClose,
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

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
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
      confirmButtonColor: "#D51F63", // primary color
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser();
        Swal.fire({
          title: "Signed Out",
          text: "See you next time!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  };

  const navLinkStyles = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${isActive
      ? "active"
      : "text-[#1F2937] hover-text-gradient"
    }`;

  const mobileLinkStyles = ({ isActive }) =>
    `block px-4 py-3 rounded-lg  font-medium transition-all ${isActive
      ? "active"
      : "hover:bg-base-200 hover-text-gradient"
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
      { path: '/my-assets', label: 'My Assets' },
      { path: '/my-team', label: 'My Team' },
      { path: '/request-asset', label: 'Request Asset' },
      { path: '/profile', label: 'Profile' },
    ],
    hr: [
      { path: '/asset-list', label: 'Asset List' },
      { path: '/add-asset', label: 'Add Asset' },
      { path: '/all-requests', label: 'All Requests' },
      { path: '/employee-list', label: 'Employee List' },
      { path: '/profile', label: 'Profile' },
    ],
    hr_manager: [ // Aligning with both potential role strings
      { path: '/asset-list', label: 'Asset List' },
      { path: '/add-asset', label: 'Add Asset' },
      { path: '/all-requests', label: 'All Requests' },
      { path: '/employee-list', label: 'Employee List' },
      { path: '/profile', label: 'Profile' },
    ],
  };

  // If role is not employee or hr/hr_manager, they get NO specific links, just Logout.
  // The requirement says "Hidden for all other roles" regarding the list.
  const currentRoleLinks = userLinks[role] || [];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 bg-base-100 ${scrolled
        ? "shadow-sm border-b border-base-200 py-2"
        : "py-4 border-b border-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="AssetVerse Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
              <span className="text-2xl font-bold tracking-tight text-[#111827]">
                <span className="bg-gradient-all bg-clip-text text-transparent">Asset <span className="bg-gradient-all bg-clip-text text-transparent">
                  Verse</span>
                </span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation - Public Links */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLink to="/" className={navLinkStyles}>
              Home
            </NavLink>
            {/* Requirement 1: Public Links always visible. 
                            However, usually 'Join' implies Guest. 
                            If strict 'Always Visible' is required, remove !user check.
                            For now, keeping !user as it's standard UX for 'Join/Sign Up'. 
                            If User insists on 'Always', I will remove it. */}
            {!user && (
              <>
                <NavLink to="/signup?role=employee" className={navLinkStyles}>
                  Join as Employee
                </NavLink>
                <NavLink to="/signup?role=hr_manager" className={navLinkStyles}>
                  Join as HR Manager
                </NavLink>
              </>
            )}
          </div>

          {/* Right Side Actions & Auth */}
          <div className="hidden lg:flex items-center gap-6">
            <ThemeToggle />

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-base-300">
                    <img src={user.photoURL || userLogo} alt="profile" className="w-full h-full object-cover" />
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 py-2 transform transition-all duration-200 origin-top-right ${showDropdown
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                    }`}
                >
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.displayName}</p>
                    <p className="text-xs text-gray-500 truncate capitalize">{role?.replace('_', ' ')}</p>
                  </div>

                  <div className="py-1">
                    {currentRoleLinks.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.path}
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover-text-gradient transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-1">
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // Requirement 2: Hide profile avatar when not logged in.
              // Showing Login button instead.
              <Link to="/signin">
                <Button className="btn btn-gradient rounded-md px-6 text-white font-medium">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed top-0 right-0 z-50 w-[75%] max-w-sm h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5 flex justify-between items-center border-b border-gray-100">
          <span className="font-bold text-lg text-gradient">AssetVerse</span>
          <button onClick={toggleMenu} className="p-1 text-gray-500  rounded-full transition-colors">
            <MdClose size={24} />
          </button>
        </div>

        <div className="p-4 space-y-2 overflow-y-auto max-h-[calc(100vh-80px)]">
          <NavLink to="/" onClick={toggleMenu} className={mobileLinkStyles}>
            Home
          </NavLink>

          {!user && (
            <>
              <NavLink to="/signup?role=employee" onClick={toggleMenu} className={mobileLinkStyles}>
                Join as Employee
              </NavLink>
              <NavLink to="/signup?role=hr_manager" onClick={toggleMenu} className={mobileLinkStyles}>
                Join as HR Manager
              </NavLink>
              <div className="pt-4 border-t border-gray-100 mt-4">
                <Link to="/signin" onClick={toggleMenu}>
                  <Button className="w-full btn btn-gradient">Login</Button>
                </Link>
              </div>
            </>
          )}

          {user && (
            <>
              <div className="py-2 px-4 bg-gray-50 rounded-lg mb-2">
                <p className="font-medium text-gray-900">{user.displayName}</p>
                <p className="text-xs text-gray-500 capitalize">{role?.replace('_', ' ')}</p>
              </div>
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
              <button
                onClick={() => {
                  handleLogOut();
                  toggleMenu();
                }}
                className="w-full mt-4 flex items-center gap-2 px-4 py-3 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                <MdLogout /> Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
