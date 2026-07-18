import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaUser,
  FaLock,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

import {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
} from "../../service/profile";

function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // ==========================
  // Profile State
  // ==========================

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // ==========================
  // Password State
  // ==========================

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // ==========================
  // Load Profile
  // ==========================

  const fetchProfile = async () => {
    try {
      const res = await getProfile();

      if (res.data.success) {
        setUser(res.data.user);
      }
    } catch (error) {
      toast.error("Please login first");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================
  // Update Profile
  // ==========================

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await updateProfile(user);

      toast.success(res.data.message);

      // Backend se updated user lo
      const updatedUser = res.data.user;

      // State Update
      setUser(updatedUser);

      // LocalStorage Update
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );

      // Navbar ko notify karo
      window.dispatchEvent(new Event("userUpdated"));

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Profile update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================
  // Logout
  // ==========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logout Successfully");


    navigate("/login");
  };


  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 py-10 px-4">

        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Header */}

          <div className="bg-blue-600 text-white p-8 text-center">

            <FaUserCircle className="text-8xl mx-auto mb-4" />

            <h1 className="text-3xl font-bold">
              {user.name}
            </h1>

            <p>{user.email}</p>

          </div>

          <div className="p-8">

            <form
              onSubmit={handleUpdate}
              className="space-y-5"
            >

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaUser />
                  Name
                </label>

                <input
                  type="text"
                  value={user.name}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      name: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaEnvelope />
                  Email
                </label>

                <input
                  type="email"
                  value={user.email}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      email: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaPhone />
                  Phone
                </label>

                <input
                  type="text"
                  value={user.phone || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      phone: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <div>

                <label className="font-semibold flex items-center gap-2 mb-2">
                  <FaMapMarkerAlt />
                  Address
                </label>

                <textarea
                  rows={3}
                  value={user.address || ""}
                  onChange={(e) =>
                    setUser({
                      ...user,
                      address: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>

              {/* ==========================
                  Change Password
              ========================== */}

              <hr className="my-8" />

              <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
                <FaLock />
                Change Password
              </h2>

              <div className="space-y-4">

                <input
                  type="password"
                  placeholder="Current Password"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full border rounded-lg p-3"
                />

                <button
                  type="button"
                  onClick={async () => {
                    try {
                      const res = await changePassword(passwordData);

                      toast.success(res.data.message);

                      setPasswordData({
                        oldPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });

                      localStorage.removeItem("token");
                      localStorage.removeItem("user");

                      navigate("/login");

                    } catch (error) {
                      toast.error(
                        error.response?.data?.message ||
                        "Failed to change password"
                      );
                    }
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg"
                >
                  Change Password
                </button>

              </div>

              {/* ==========================
                  Danger Zone
              ========================== */}

              <hr className="my-8" />

              <h2 className="text-2xl font-bold text-red-600 mb-5">
                Danger Zone
              </h2>

              <div className="flex gap-4 flex-wrap">

                <button
                  type="button"
                  onClick={async () => {

                    const confirmDelete = window.confirm(
                      "Are you sure you want to delete your account?"
                    );

                    if (!confirmDelete) return;

                    try {

                      const res = await deleteAccount();

                      toast.success(res.data.message);

                      localStorage.removeItem("token");
                      localStorage.removeItem("user");

                      navigate("/");

                    } catch (error) {

                      toast.error(
                        error.response?.data?.message ||
                        "Delete Failed"
                      );

                    }

                  }}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
                >
                  <FaTrash />
                  Delete Account
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-lg"
                >
                  <FaSignOutAlt />
                  Logout
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

      <Footer />

    </>
  );
}

export default Profile;