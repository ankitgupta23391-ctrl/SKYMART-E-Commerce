import React, { useState } from "react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import {
  useNavigate,
  useLocation,
} from "react-router";
import { resetPassword } from "../../service/auth";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // VerifyForgotOTP page se data aayega
  const email = location.state?.email || "";
  const otp = location.state?.otp || "";

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset Password Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password match check
    if (
      formData.password !== formData.confirmPassword
    ) {
      alert(
        "Password and Confirm Password do not match"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await resetPassword({
        email,
        otp,
        password: formData.password,
      });

      alert(
        response?.data?.message ||
          "Password Reset Successfully"
      );

      // Login page pe redirect
      navigate("/login");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Password Reset Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Reset Password
        </h1>

        <p className="text-center text-gray-500 mb-2">
          Create your new password
        </p>

        <p className="text-center text-blue-600 font-medium mb-6">
          {email}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* New Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type={
                showPassword ? "text" : "password"
              }
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="New Password"
              required
              className="w-full pl-12 pr-12 py-3 border rounded-xl outline-none"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-4"
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            required
            className="w-full py-3 px-4 border rounded-xl outline-none"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-70"
          >
            {loading
              ? "Resetting..."
              : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;