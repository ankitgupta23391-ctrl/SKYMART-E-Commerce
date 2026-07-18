import express from "express";
import passport from "passport";
import { homeData } from "../controllers/web/homeController.js";
import {
  productDetails,
  shopProducts,
} from "../controllers/web/productController.js";
import { addToCart } from "../controllers/web/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createOrder,
  verifyPayment,
} from "../controllers/web/paymentController.js";


const webRoutes = express.Router();
// home
webRoutes.get("/home", homeData);

// products
webRoutes.get("/", shopProducts);
webRoutes.get("/shopby/:id", productDetails);


webRoutes.post("/add", authMiddleware, addToCart);

// PAYMENT (RAZORPAY)

webRoutes.post("/payment/create-order", createOrder);

webRoutes.post("/payment/verify", verifyPayment);


export default webRoutes;
