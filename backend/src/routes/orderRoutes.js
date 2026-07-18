import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  updateOrderStatus,
} from "../controllers/admin/orderController.js";

const orderRoutes = express.Router();

orderRoutes.post("/add-order", createOrder);
orderRoutes.get("/getall", getAllOrders);
orderRoutes.patch("/update/:id", updateOrderStatus);
orderRoutes.get("/user/:userId", getUserOrders);
orderRoutes.delete("/delete/:id", deleteOrder);

// SINGLE ORDER DETAILS

orderRoutes.get("/singleorderby/:id", getSingleOrder);

export default orderRoutes;
