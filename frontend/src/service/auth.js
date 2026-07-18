import axios from "axios";

// Register
export const register = async (data) => {
  const response = await axios.post(
    "https://skymart-e-commerce.onrender.com/api/auth/register",
    data,
  );
  return response;
};

// Login
export const login = async (data) => {
  const response = await axios.post(
    "https://skymart-e-commerce.onrender.com/api/auth/login",
    data,
  );
  return response;
};

// Verify OTP
export const verifyOTP = async (data) => {
  const response = await axios.post(
    "https://skymart-e-commerce.onrender.com/api/auth/verify-otp",
    data,
  );
  return response;
};

// Forgot Password
export const forgotPassword = async (data) => {
  return await axios.post(
    "https://skymart-e-commerce.onrender.com/api/auth/forgot-password",
    data,
  );
};

// Verify Forgot OTP
export const verifyForgotOTP = async (data) => {
  return await axios.post(
    "https://skymart-e-commerce.onrender.com/api/auth/verify-forgot-otp",
    data,
  );
};

// Reset Password
export const resetPassword = async (data) => {
  return await axios.post(
    "https://skymart-e-commerce.onrender.com/api/auth/reset-password",
    data,
  );
};

// Google Login
  export const googleLogin = () => {
    window.location.href = "https://skymart-e-commerce.onrender.com/api/auth/google";
  };
