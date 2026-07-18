import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { verifyOTP } from "../../service/auth";
import { toast } from "react-toastify";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleChange = (value, index) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    if (finalOtp.length < 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyOTP({
        email,
        otp: finalOtp,
      });

      // Success Toast
      toast.success(
        response?.data?.message || "OTP Verified Successfully"
      );

      // Redirect to Login
      navigate("/login");

    } catch (error) {
      // Error Toast
      toast.error(
        error?.response?.data?.message ||
        "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center">
          Verify OTP
        </h2>

        <p className="text-center text-gray-500 mt-2 mb-2">
          Enter 6 digit OTP sent to your email
        </p>

        <p className="text-center text-purple-600 font-medium mb-8">
          {email}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleChange(e.target.value, index)
                }
                className="w-12 h-12 border rounded-lg text-center text-xl font-bold outline-none focus:ring-2 focus:ring-purple-500"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center mt-5 text-gray-500">
          Didn't receive OTP?
          <button className="text-purple-600 ml-2">
            Resend OTP
          </button>
        </p>

        <Link
          to="/login"
          className="block text-center mt-4 text-blue-600"
        >
          Back To Login
        </Link>
      </div>
    </div>
  );
}

export default VerifyOtp;