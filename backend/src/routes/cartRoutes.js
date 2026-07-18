import express from "express";
import { addToCart, clearCart, deleteCart, getCart, removeCartItem, updateCart } from "../controllers/web/cartController.js";


const cartRoutes = express.Router();

cartRoutes.post("/add-cart", addToCart);

cartRoutes.get("/get/:userId", getCart);

cartRoutes.patch("/cart/update", updateCart);

cartRoutes.delete("/cart/remove", removeCartItem);

cartRoutes.delete("/cart/clear/:userId", clearCart);

cartRoutes.delete("/cart/delete/:userId", deleteCart);

export default cartRoutes;
