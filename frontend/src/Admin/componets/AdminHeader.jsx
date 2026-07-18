import React, { useEffect, useState } from "react";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { adminProfile } from "../../service/admin";

function AdminHeader() {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState(null);

  // GET ADMIN PROFILE

  const fetchProfile = async () => {
    try {
      const res = await adminProfile();

      if (res.data.success) {
        setAdmin(res.data.user);

        // Always keep latest data
        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.user)
        );
      }
    } catch (error) {
      console.log(error);

      localStorage.removeItem("admin");
      localStorage.removeItem("adminToken");

      navigate("/admin/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // LOGOUT

  const handleLogout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");

    navigate("/admin/login");
  };

  return (
    <header className="fixed top-0 left-72 right-0 h-24 bg-white border-b border-gray-200 px-10 flex items-center justify-between z-50 shadow-sm">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Welcome back, {admin?.name || "Admin"} 👋
        </p>
      </div>

      {/* Search */}
      <div className="hidden lg:flex items-center w-[420px] bg-gray-100 rounded-xl overflow-hidden border">

        <FaSearch className="ml-4 text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-3 bg-transparent outline-none"
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        {/* Messages */}
        <div className="relative w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200">

          <FaEnvelope />

          <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
            5
          </span>

        </div>

        {/* Notification */}
        <div className="relative w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200">

          <FaBell />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
            3
          </span>

        </div>

        {/* Settings */}
        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-pointer">

          <FaCog className="hover:rotate-180 duration-500" />

        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 border-l pl-5">

          <FaUserCircle
            size={46}
            className="text-blue-600"
          />

          <div>

            <h3 className="font-semibold">
              {admin?.name}
            </h3>

            <p className="text-xs text-gray-500">
              {admin?.email}
            </p>

            <p className="text-xs text-blue-600 capitalize">
              {admin?.role}
            </p>

          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </header>
  );
}

export default AdminHeader;