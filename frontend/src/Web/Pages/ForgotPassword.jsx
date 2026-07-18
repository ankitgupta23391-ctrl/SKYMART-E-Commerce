import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { forgotPassword } from "../../service/auth";
import { toast } from "react-toastify";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    toast .error("Please enter your email");
    return;
  }

  try {
    setLoading(true);

    const response = await forgotPassword({ email });

    // Success Toast
    toast.success(
      response?.data?.message || "OTP sent successfully"
    );

    // Navigate to Reset Password Page
    navigate("/reset-password", {
      state: { email },
    });

  } catch (error) {
    // Error Toast
    toast.error(
      error?.response?.data?.message ||
        "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Forgot Password
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Enter your email address and we'll send an OTP.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-70"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>

        </form>

        <Link
          to="/login"
          className="block text-center mt-5 text-blue-600 hover:underline"
        >
          Back to Login
        </Link>

      </div>
    </div>
  );
}

export default ForgotPassword;