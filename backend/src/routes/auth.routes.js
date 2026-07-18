import express from "express";
import passport from "passport";
import {
  forgotPassword,
  googleCallback,
  login,
  register,
  resetPassword,
  verifyForgotOTP,
  verifyOTP,
} from "../controllers/admin/auth.controller.js";
import { changePassword, deleteAccount, getProfile, updateProfile } from "../controllers/web/profileController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/verify-otp", verifyOTP);
authRoutes.post("/login", login);
authRoutes.post("/forgot-password", forgotPassword);
authRoutes.post("/verify-forgot-otp", verifyForgotOTP);
authRoutes.post("/reset-password", resetPassword);

// GOOGLE AUTH

authRoutes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

authRoutes.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed",
  }),
  googleCallback,
);

// USER PROFILE ROUTES

authRoutes.get("/profile", authMiddleware, getProfile);

authRoutes.patch("/profile", authMiddleware, updateProfile);

authRoutes.patch("/change-password", authMiddleware, changePassword);

authRoutes.delete("/delete-account", authMiddleware, deleteAccount);

export default authRoutes;
