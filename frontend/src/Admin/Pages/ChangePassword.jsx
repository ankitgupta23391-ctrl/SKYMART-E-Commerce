import React, { useState } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaKey,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { changeAdminPassword } from "../../service/admin";
import { useNavigate } from "react-router";

function ChangePassword() {
  const navigate = useNavigate();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      return toast.error("All fields are required");
    }

    if (
      formData.newPassword !==
      formData.confirmPassword
    ) {
      return toast.error(
        "New Password & Confirm Password do not match"
      );
    }

    try {
      setLoading(true);

      const res = await changeAdminPassword(formData);

      toast.success("Password changed successfully. Please login again.");

      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");

      setTimeout(() => {
        navigate("/admin/login", { replace: true });
      }, 1500);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">

      <div className="bg-white rounded-3xl shadow-lg p-8">

        <div className="flex items-center gap-4 mb-8">

          <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-2xl">
            <FaKey />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Change Password
            </h1>

            <p className="text-gray-500">
              Update your admin account password.
            </p>
          </div>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Current Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Current Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showCurrent ? "text" : "password"}
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter Current Password"
                className="w-full border rounded-xl pl-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showCurrent ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              New Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showNew ? "text" : "password"}
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter New Password"
                className="w-full border rounded-xl pl-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showNew ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Confirm Password
            </label>

            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-gray-400" />

              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm New Password"
                className="w-full border rounded-xl pl-12 pr-12 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showConfirm ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
          >
            {loading
              ? "Updating Password..."
              : "Change Password"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;