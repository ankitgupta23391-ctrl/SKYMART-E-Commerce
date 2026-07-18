import express from "express";

import {
  adminSignup,
  adminLogin,
  getProfile,
  updateProfile,
  changePassword,
} from "../controllers/admin/adminAuth.controller.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const adminAuthRouter = express.Router();

// ADMIN SIGNUP

adminAuthRouter.post("/signup", adminSignup);

// ADMIN LOGIN

adminAuthRouter.post("/login", adminLogin);

// ADMIN PROFILE

adminAuthRouter.get("/profile", authMiddleware, adminMiddleware, getProfile);

adminAuthRouter.patch(
  "/profile", authMiddleware, adminMiddleware, updateProfile,);

adminAuthRouter.patch(
  "/change-password", authMiddleware, adminMiddleware, changePassword,);

export default adminAuthRouter;
