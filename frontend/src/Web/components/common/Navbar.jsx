import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
  FaSearch,
  FaUserPlus,
  FaSignInAlt,
} from "react-icons/fa";

import { getWishlist } from "../../../service/wishlist";
import { getCart } from "../../../service/cart";
import { searchProducts } from "../../../service/search";

const Navbar = () => {
  const navigate = useNavigate();


  // States

  const [mobileMenu, setMobileMenu] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const [user, setUser] = useState(null);

  const [wishlistCount, setWishlistCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Search States
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  // Load User

  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const currentUser = JSON.parse(storedUser);

        setUser(currentUser);

        fetchWishlistCount(currentUser);
        fetchCartCount(currentUser);
      } else {
        setUser(null);
        setWishlistCount(0);
        setCartCount(0);
      }
    };

    loadUser();

    window.addEventListener("storage", loadUser);
    window.addEventListener("userUpdated", loadUser);
    window.addEventListener("wishlistUpdated", loadUser);
    window.addEventListener("cartUpdated", loadUser);

    return () => {
      window.removeEventListener("storage", loadUser);
      window.removeEventListener("userUpdated", loadUser);
      window.removeEventListener("wishlistUpdated", loadUser);
      window.removeEventListener("cartUpdated", loadUser);
    };
  }, []);

  // Wishlist Count

  const fetchWishlistCount = async (currentUser = user) => {
    try {
      if (!currentUser) return;

      const userId = currentUser._id || currentUser.id;

      const res = await getWishlist(userId);

      setWishlistCount(
        res.data?.wishlist?.products?.length || 0
      );
    } catch (error) {
      console.log(error);
      setWishlistCount(0);
    }
  };

  // Cart Count

  const fetchCartCount = async (currentUser = user) => {
    try {
      if (!currentUser) return;

      const userId = currentUser._id || currentUser.id;

      const res = await getCart(userId);

      setCartCount(
        res.data?.cart?.products?.length || 0
      );
    } catch (error) {
      console.log(error);
      setCartCount(0);
    }
  };

  // Search Products

  const handleSearch = async (value) => {
    setSearchQuery(value);

    if (!value.trim()) {
      setSearchResults([]);
      setShowSearch(false);
      return;
    }

    try {
      setSearchLoading(true);

      const res = await searchProducts(value);

      setSearchResults(res.products || []);
      setShowSearch(true);
    } catch (error) {
      console.log(error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleProductClick = (id) => {
    setSearchQuery("");
    setSearchResults([]);
    setShowSearch(false);

    navigate(`/product-details/${id}`);
  };

  useEffect(() => {
    const closeSearch = () => {
      setTimeout(() => {
        setShowSearch(false);
      }, 200);
    };

    window.addEventListener("click", closeSearch);

    return () => {
      window.removeEventListener("click", closeSearch);
    };
  }, []);

  // Logout

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setWishlistCount(0);
    setCartCount(0);

    window.dispatchEvent(new Event("userUpdated"));

    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">

          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link
              to="/"
              className="text-2xl font-bold text-red-600"
            >
              🛍️ SKYMART
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">

              <Link
                to="/"
                className="hover:text-blue-600 transition"
              >
                Home
              </Link>

              <Link
                to="/shop"
                className="hover:text-blue-600 transition"
              >
                Shop
              </Link>

            </div>

            {/* Search */}
            <div
              className="hidden md:block relative w-[500px]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center border rounded-lg overflow-hidden bg-white">

                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) =>
                    handleSearch(e.target.value)
                  }
                  onFocus={() => {
                    if (searchResults.length > 0)
                      setShowSearch(true);
                  }}
                  className="px-5 py-2 outline-none flex-1"
                />

                <button className="bg-black text-white px-4 py-3">
                  <FaSearch />
                </button>

              </div>

              {/* Search Dropdown */}
              {showSearch && (
                <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-2xl border max-h-96 overflow-y-auto z-50">

                  {searchLoading ? (
                    <div className="p-5 text-center">
                      Loading...
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((product) => (
                      <div
                        key={product._id}
                        onClick={() =>
                          handleProductClick(product._id)
                        }
                        className="flex items-center gap-4 p-4 hover:bg-gray-100 cursor-pointer transition"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover border"
                        />

                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">
                            {product.name}
                          </h4>

                          <p className="text-sm text-gray-500">
                            {product.brand}
                          </p>

                          <p className="text-green-600 font-bold mt-1">
                            ₹
                            {product.discountPrice > 0
                              ? product.discountPrice
                              : product.price}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-5 text-center text-gray-500">
                      No products found
                    </div>
                  )}

                </div>
              )}
            </div>

            {/* Right */}
            <div className="hidden md:flex items-center gap-5">

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative"
              >
                <FaHeart
                  size={22}
                  className="hover:text-red-500 transition"
                />

                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-red-500 text-white text-[10px]">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative"
              >
                <FaShoppingCart
                  size={22}
                  className="hover:text-green-600 transition"
                />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-green-500 text-white text-[10px]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User */}
              <div className="relative">
                <button
                  onClick={() =>
                    setUserDropdown(!userDropdown)
                  }
                  className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  {user ? (
                    <>
                      <img
                        src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />

                      <span>{user.name}</span>
                    </>
                  ) : (
                    <>
                      <FaUser />
                      <span>Account</span>
                    </>
                  )}
                </button>

                {userDropdown && (
                  <div className="absolute right-0 mt-3 bg-white shadow-xl border rounded-xl w-56 overflow-hidden z-50">

                    {!user ? (
                      <div className="p-3 border-b">

                        <Link
                          to="/login"
                          className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <FaSignInAlt />
                          Login
                        </Link>

                        <Link
                          to="/signup"
                          className="flex items-center justify-center gap-2 w-full py-2 mt-2 border rounded-lg hover:bg-gray-100"
                        >
                          <FaUserPlus />
                          Sign Up
                        </Link>

                      </div>
                    ) : (
                      <div className="p-4 border-b text-center">

                        <img
                          src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                          alt={user.name}
                          className="w-16 h-16 rounded-full mx-auto mb-2"
                        />

                        <h4 className="font-semibold">
                          {user.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                          {user.email}
                        </p>

                      </div>
                    )}

                    <Link
                      to="/profile"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Profile
                    </Link>

                    <Link
                      to="/orders"
                      className="block px-4 py-3 hover:bg-gray-100"
                    >
                      My Orders
                    </Link>

                    <Link
                      to="/wishlist"
                      className="flex justify-between items-center px-4 py-3 hover:bg-gray-100"
                    >
                      Wishlist

                      {wishlistCount > 0 && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {wishlistCount}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/cart"
                      className="flex justify-between items-center px-4 py-3 hover:bg-gray-100"
                    >
                      Cart

                      {cartCount > 0 && (
                        <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          {cartCount}
                        </span>
                      )}
                    </Link>

                    {user && (
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 hover:bg-gray-100 text-red-600"
                      >
                        Logout
                      </button>
                    )}

                  </div>
                )}
              </div>

            </div>

            {/* Mobile Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? (
                <FaTimes size={22} />
              ) : (
                <FaBars size={22} />
              )}
            </button>

          </div>

          {/* Mobile Menu */}
          {mobileMenu && (
            <div className="md:hidden py-4 border-t">

              <div className="flex border rounded-lg overflow-hidden mb-4">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) =>
                    handleSearch(e.target.value)
                  }
                  className="flex-1 px-4 py-2 outline-none"
                />

                <button className="bg-blue-600 text-white px-4">
                  <FaSearch />
                </button>
              </div>

              {showSearch && (
                <div className="mb-4 bg-white border rounded-xl shadow-lg max-h-80 overflow-y-auto">

                  {searchResults.map((product) => (
                    <div
                      key={product._id}
                      onClick={() =>
                        handleProductClick(product._id)
                      }
                      className="flex items-center gap-3 p-3 border-b cursor-pointer hover:bg-gray-100"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-lg object-cover"
                      />

                      <div>
                        <h4 className="font-semibold">
                          {product.name}
                        </h4>

                        <p className="text-green-600">
                          ₹
                          {product.discountPrice > 0
                            ? product.discountPrice
                            : product.price}
                        </p>
                      </div>
                    </div>
                  ))}

                </div>
              )}

              <Link to="/" className="block py-2">
                Home
              </Link>

              <Link to="/shop" className="block py-2">
                Shop
              </Link>

              <Link
                to="/wishlist"
                className="flex justify-between py-2"
              >
                Wishlist

                <span className="bg-red-500 text-white text-xs px-2 rounded-full">
                  {wishlistCount}
                </span>
              </Link>

              <Link
                to="/cart"
                className="flex justify-between py-2"
              >
                Cart

                <span className="bg-green-500 text-white text-xs px-2 rounded-full">
                  {cartCount}
                </span>
              </Link>

              {user && (
                <>
                  <Link
                    to="/profile"
                    className="block py-2"
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="block py-2"
                  >
                    My Orders
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="block py-2 text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}

              {!user && (
                <>
                  <Link
                    to="/login"
                    className="block py-2"
                  >
                    Login
                  </Link>

                  <Link
                    to="/signup"
                    className="block py-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}

            </div>
          )}

        </div>
      </nav>
    </>
  );
};

export default Navbar;