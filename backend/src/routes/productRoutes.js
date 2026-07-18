import express from "express";
import { searchProducts } from "../controllers/web/productController.js";


const productRoutes = express.Router();

productRoutes.get("/search", searchProducts);

export default productRoutes;