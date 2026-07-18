import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router";
import {
  FaBoxOpen,
  FaTags,
  FaShoppingCart,
  FaUsers,
  FaTachometerAlt,
  FaChevronDown,
  FaChevronRight,
  FaCog,
  FaUser,
  FaPlus,
  FaEdit,
  FaKey,
} from "react-icons/fa";

function AdminSidebar() {

  const location = useLocation();

  const [productOpen, setProductOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);


  useEffect(() => {

    setProductOpen(
      location.pathname.includes("/admin/product")
    );

    setCategoryOpen(
      location.pathname.includes("/admin/category")
    );

  }, [location.pathname]);


  const menuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${isActive
      ? "bg-blue-600 shadow-lg"
      : "hover:bg-slate-800"
    }`;

  const subMenuClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${isActive
      ? "bg-blue-600"
      : "hover:bg-slate-800"
    }`;

  return (
    <aside className="
      fixed 
      left-0 
      top-0 
      w-72 
      h-screen 
      bg-slate-900 
      text-white 
      flex 
      flex-col 
      shadow-2xl
    ">

      {/* Logo */}
      <div className="
        p-6 
        border-b 
        border-slate-800
      ">
        <h1 className="text-3xl font-bold">
          Admin Panel
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Ecommerce Dashboard
        </p>
      </div>

      {/* Menu */}
      <div className="
        flex-1 
        overflow-y-auto 
        p-4
      ">

        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={menuClass}
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        {/* Products */}

        <div className="mt-2">
          <button
            onClick={() =>
              setProductOpen(!productOpen)
            }
            className="
              w-full
              flex
              items-center
              justify-between
              px-4
              py-3
              rounded-xl
              hover:bg-slate-800
            ">
            <span className="flex items-center gap-3">
              <FaBoxOpen />
              Products
            </span>
            {
              productOpen
                ?
                <FaChevronDown />
                :
                <FaChevronRight />
            }
          </button>
          {
            productOpen &&
            <div className="
              ml-6
              mt-2
              space-y-2
            ">
              <NavLink
                to="/admin/add-product"
                className={subMenuClass}
              >
                <FaPlus />
                Add Product
              </NavLink>
              <NavLink
                to="/admin/products"
                className={subMenuClass}
              >
                <FaEdit />
                All Products
              </NavLink>
            </div>
          }
        </div>

        {/* Categories */}

        <div className="mt-2">
          <button
            onClick={() =>
              setCategoryOpen(!categoryOpen)
            }
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-slate-800">
            <span className="flex items-center gap-3">
              <FaTags />
              Categories
            </span>
            {
              categoryOpen
                ?
                <FaChevronDown />
                :
                <FaChevronRight />
            }
          </button>
          {
            categoryOpen &&
            <div className="
              ml-6
              mt-2
              space-y-2
            ">
              <NavLink
                to="/admin/add-category"
                className={subMenuClass}
              >
                <FaPlus />
                Add Category
              </NavLink>
              <NavLink
                to="/admin/categories"
                className={subMenuClass}
              >
                <FaEdit />
                All Categories
              </NavLink>
            </div>
          }
        </div>
        
        {/* Other Menu */}
        <NavLink
          to="/admin/orders"
          className={menuClass}
        >
          <FaShoppingCart />
          Orders
        </NavLink>
        <NavLink
          to="/admin/customers"
          className={menuClass}
        >
          <FaUsers />
          Customers
        </NavLink>
        <NavLink
          to="/admin/settings"
          className={menuClass}
        >
          <FaCog />
          Settings
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={menuClass}
        >
          <FaUser />
          Profile
        </NavLink>
        <NavLink
          to="/admin/change-password" className={menuClass}
        >
          <FaKey />
          Change Password
        </NavLink>
      </div>
    </aside>
  );
}
export default AdminSidebar;