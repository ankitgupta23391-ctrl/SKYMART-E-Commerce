import React, { useState } from "react";
import { useNavigate } from "react-router";
import {
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import { adminLogin } from "../../service/admin";

function Login1() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await adminLogin({
        email,
        password,
      });

      const data = res.data;

      // Only Admin Login
      if (data.user.role !== "admin") {
        setError("Only Admin can login.");
        return;
      }

      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.user));

      navigate("/admin/dashboard");

    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">

      <form
        onSubmit={handleLogin}
        className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 border"
      >

        {/* Logo */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-3xl font-bold">
            A
          </div>

          <h1 className="text-3xl font-bold mt-4 text-slate-800">
            Admin Login
          </h1>

          <p className="text-gray-500 mt-2">
            Login to Admin Dashboard
          </p>

        </div>

        {error && (
          <p className="text-center text-red-500 mb-4">
            {error}
          </p>
        )}

        {/* Email */}
        <div className="relative mb-5">

          <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded-xl p-3 pl-12 outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Password */}
        <div className="relative mb-6">

          <FaLock className="absolute left-4 top-4 text-gray-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border rounded-xl p-3 pl-12 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

    </div>
  );
}

export default Login1;