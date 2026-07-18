import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebook,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { googleLogin, login } from "../../service/auth";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await login(formData);

      console.log("Login Response:", response.data);

      // Save Token
      localStorage.setItem("token", response.data.token);

      // Save User Data
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Success Toast
      toast.success(
        response?.data?.message || "Login Successful!"
      );

      // Reset Form
      setFormData({
        email: "",
        password: "",
      });

      // Redirect
      navigate("/");

    } catch (error) {
      // Error Toast
      toast.error(
        error?.response?.data?.message || "Login Failed!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 px-4 py-10">
        <div className="w-full max-w-md bg-white/70 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg bg-blue-600">
              F
            </div>

            <h2 className="text-3xl font-bold mt-4 text-slate-800">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                required
                className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
                className="w-full pl-12 pr-12 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Remember */}
            <div className="flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" />
                Remember Me
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 text-sm hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold hover:scale-[1.02] transition shadow-lg disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
              <button
                onClick={googleLogin}
                className="border rounded-xl py-3 text-white bg-blue-500 flex items-center justify-center gap-2 hover:bg-gray-500 transition"
              >
                <FaGoogle className="text-red-500" />
                Google
              </button>

              <button className="border rounded-xl py-3  text-white bg-blue-500 flex items-center justify-center gap-2 hover:bg-gray-500 text-xl">
                <FaFacebook className="text-blue-800 text-2xl" />
                Facebook
              </button>


            </div>

            {/* Register */}
            <p className="text-center mt-8 text-gray-600">
              Don't have an account?

              <Link
                to="/signup"
                className="ml-2 text-blue-600 font-semibold hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
      </section>

      <Footer />
    </>
  );
}

export default Login;