import React from "react";
import { Route, Routes } from "react-router";
import ScrollToTop from "../Web/components/common/ScrollToTop";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Toastify imports


// Web Pages
import Home from "../Web/Pages/Home";
import ProductDetails from "../Web/Pages/ProductDetails";
import Cart from "../Web/Pages/Cart";
import Wishlist from "../Web/Pages/Wishlist";
import Shop from "../Web/Pages/Shop";
import Checkout from "../Web/Pages/Checkout";
import Login from "../Web/Pages/Login";
import Register from "../Web/Pages/Register";
import Profile from "../Web/Pages/Profile";
import Orders1 from "../Web/Pages/Orders1";
import ForgotPassword from "../Web/Pages/ForgotPassword";
import VerifyOtp from "../Web/Pages/VerifyOtp";
import ResetPassword from "../Web/Pages/ResetPassword";
import VerifyForgotOTP from "../Web/Pages/VerifyForgotOTP";

// Admin Layout
import AdminLayout from "../Admin/Layout/AdminLayout";

// Admin Pages
import Dashboard from "../Admin/Pages/Dashboard";
import AllProducts from "../Admin/Pages/AllProducts";
import AddProduct from "../Admin/Pages/AddProduct";
import EditProduct from "../Admin/Pages/EditProduct";
import AllCategories from "../Admin/Pages/AllCategory";
import AddCategory from "../Admin/Pages/AddCategory";
import Orders from "../Admin/Pages/Orders";
import Customers from "../Admin/Pages/Customers";
import Settings from "../Admin/Pages/Settings";
import Profile1 from "../Admin/Pages/Profile";
import Login1 from "../Admin/Pages/Login";
import ViewProduct from "../Admin/Pages/ViewProduct";
import ViewCategory from "../Admin/Pages/ViewCategory";
import EditCategory from "../Admin/Pages/EditCategory";
import PaymentPage from "../Web/Pages/PaymentPage";
import SuccessPage from "../Web/Pages/SuccessPage";
import FailedPage from "../Web/Pages/FailedPage";
import TrackOrder from "../Web/Pages/TrackOrder";
import OrderDetails from "../Web/Pages/OrderDetails";
import ProtectedAdminRoute from "../Admin/componets/ProtectedAdminRoute";
import ChangePassword from "../Admin/Pages/ChangePassword";
import GoogleSuccess from "../Web/Pages/GoogleSuccess";



function AppRoutes() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders1 />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-forgot-otp" element={<VerifyForgotOTP />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/failed" element={<FailedPage />} />
        <Route path="/google-success" element={<GoogleSuccess />} />
        <Route
          path="/track-order/:id"
          element={<TrackOrder />}
        />


        <Route
          path="/order-details/:id"
          element={<OrderDetails />}
        />

        {/* ----------------Admin Router---------------------- */}

        <Route path="/admin" element={<AdminLayout />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedAdminRoute>
              <Dashboard />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <AllProducts />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/add-product"
          element={
            <ProtectedAdminRoute>
              <AddProduct />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/edit-product/:id"
          element={
            <ProtectedAdminRoute>
              <EditProduct />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/product/view/:id"
          element={
            <ProtectedAdminRoute>
              <ViewProduct />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedAdminRoute>
              <AllCategories />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/add-category"
          element={
            <ProtectedAdminRoute>
              <AddCategory />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/view-category/:id"
          element={
            <ProtectedAdminRoute>
              <ViewCategory />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/edit-category/:id"
          element={
            <ProtectedAdminRoute>
              <EditCategory />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <Orders />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/customers"
          element={
            <ProtectedAdminRoute>
              <Customers />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <Settings />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/profile"
          element={
            <ProtectedAdminRoute>
              <Profile1 />
            </ProtectedAdminRoute>
          }
        />

        <Route
          path="/admin/change-password"
          element={
            <ProtectedAdminRoute>
              <ChangePassword />
            </ProtectedAdminRoute>
          }
        />

        {/* Public Routes */}
        <Route
          path="/admin/login"
          element={<Login1 />}
        />


      </Routes>

      {/* ✅ Toast Container */}
      <ToastContainer />
    </>
  );
}

export default AppRoutes;