import express from "express";

import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/admin/product.controller.js";

import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
  searchCategory,
  updateCategory,
} from "../controllers/admin/category.controller.js";

import {
  allCustomers,
  singleCustomer,
  updateCustomerStatus,
  deleteCustomer,
} from "../controllers/admin/customerController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const adminRouter = express.Router();

// Protect All Admin Routes

adminRouter.use(authMiddleware);
adminRouter.use(adminMiddleware);

// Product Routes

adminRouter.post("/add-product", addProduct);

adminRouter.get("/getAll", getProducts);

adminRouter.get("/getby/:id", getProductById);

adminRouter.patch("/update/:id", updateProduct);

adminRouter.delete("/delete/:id", deleteProduct);

// Category Routes

adminRouter.post("/category/add", addCategory);

adminRouter.get("/category", getCategories);

adminRouter.get("/category/getby/:id", getCategoryById);

adminRouter.patch("/category/update/:id", updateCategory);

adminRouter.delete("/category/delete/:id", deleteCategory);

adminRouter.get("/category/search", searchCategory);

// Customer Routes

adminRouter.get("/customer/get-all", allCustomers);

adminRouter.get("/customer/getby/:id", singleCustomer);

adminRouter.patch("/customer/status/:id", updateCustomerStatus);

adminRouter.delete("/customer/delete/:id", deleteCustomer);

export default adminRouter;