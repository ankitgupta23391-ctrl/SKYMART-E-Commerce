import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";
import { getDashboard } from "../controllers/admin/dashboard.controller.js";



const dashboardRouter = express.Router();

// Dashboard Stats
dashboardRouter.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  getDashboard
);

export default dashboardRouter;