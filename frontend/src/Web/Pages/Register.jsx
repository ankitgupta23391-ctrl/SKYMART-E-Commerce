import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollProgressBar from "./ScrollProgressBar";
import { register } from "../../service/auth.js";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
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

  // Register API
  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    try {
      setLoading(true);
      setProgress(30);

      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setProgress(100);

      setTimeout(() => {
        setLoading(false);
        setProgress(0);

        // Success Toast
        toast.success(
          response?.data?.message || "OTP Sent Successfully!"
        );

        // Reset Form
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        // Navigate to Verify OTP Page
        navigate("/verify-otp", {
          state: {
            email: formData.email,
          },
        });
      }, 500);
    } catch (error) {
      setLoading(false);
      setProgress(0);

      // Error Toast
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <ScrollProgressBar />
      <Navbar />

      {/* Progress Bar */}
      {loading && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="h-1 bg-slate-200">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <section className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-100 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-6xl bg-white rounded-3xl overflow-hidden shadow-2xl grid md:grid-cols-2">

          {/* Left Side */}
          <div className="hidden md:flex flex-col justify-center bg-slate-900 text-white p-12">
            <h2 className="text-5xl font-bold mb-5">
              Welcome To <br /> E-Commerce Store
            </h2>

            <p className="text-slate-300 text-lg">
              Create your account and start shopping.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "10,000+ Premium Products",
                "Secure Online Payments",
                "Fast & Free Delivery",
                "Easy Return & Refund",
                "24/7 Customer Support",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
                <FaUser className="text-3xl text-slate-700" />
              </div>

              <h2 className="text-3xl font-bold text-slate-800">
                Create Your Account
              </h2>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">

              {/* Name */}
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-12"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Terms */}
              <label className="flex items-center gap-2 text-sm text-slate-600">
                <input type="checkbox" required />
                I agree to the Terms & Conditions
              </label>

              {/* Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-6 text-slate-600">
              Already have an account?
              <Link
                to="/login"
                className="ml-2 text-blue-600 font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Register;