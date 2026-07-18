import axios from "axios";

// Register
export const register = async (data) => {
  const response = await axios.post(
    "http://localhost:3000/api/auth/register",
    data,
  );
  return response;
};

// Login
export const login = async (data) => {
  const response = await axios.post(
    "http://localhost:3000/api/auth/login",
    data,
  );
  return response;
};

// Verify OTP
export const verifyOTP = async (data) => {
  const response = await axios.post(
    "http://localhost:3000/api/auth/verify-otp",
    data,
  );
  return response;
};

// Forgot Password
export const forgotPassword = async (data) => {
  return await axios.post(
    "http://localhost:3000/api/auth/forgot-password",
    data,
  );
};

// Verify Forgot OTP
export const verifyForgotOTP = async (data) => {
  return await axios.post(
    "http://localhost:3000/api/auth/verify-forgot-otp",
    data,
  );
};

// Reset Password
export const resetPassword = async (data) => {
  return await axios.post(
    "http://localhost:3000/api/auth/reset-password",
    data,
  );
};

// Google Login
  export const googleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };
