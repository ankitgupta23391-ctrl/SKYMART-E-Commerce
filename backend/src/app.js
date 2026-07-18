import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport.js";
import adminRouter from "./routes/admin.route.js";
import authRoutes from "./routes/auth.routes.js";
import webRoutes from "./routes/web.routes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminAuthRouter from "./routes/adminAuth.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();

// Middlewares

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Test Route

app.get("/", (req, res) => {
  res.send("Server is Running...");
});

// Admin Routes

app.use("/api/admin", adminRouter);

// Authentication Routes

app.use("/api/auth", authRoutes);

// Website Routes

app.use("/api/web", webRoutes);

// Cart Routes

app.use("/api/cart", cartRoutes);

// Wishlist Routes

app.use("/api/wishlist", wishRoutes);

// Order Routes

app.use("/api/order", orderRoutes);

// Admin Auth
app.use("/api/adminroutes", adminAuthRouter);

// Dashboard Routes
app.use("/api/dashboard", dashboardRouter);

// Search Products

app.use("/api/product", productRoutes);

// 404 Route

app.use("/", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;
