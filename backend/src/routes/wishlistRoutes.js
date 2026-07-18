import express from "express";
import { addToWishlist, clearWishlist, deleteWishlist, getWishlist, removeWishlistItem } from "../controllers/web/wishlistController.js";



const wishRoutes = express.Router();

wishRoutes.post("/add-wish", addToWishlist);

wishRoutes.get("/wish/:userId", getWishlist);

wishRoutes.delete("/wish/remove", removeWishlistItem);

wishRoutes.delete("/wish/clear/:userId", clearWishlist);

wishRoutes.delete("/wish/delete/:userId", deleteWishlist);

export default wishRoutes;