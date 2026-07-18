import React from "react";
import { useNavigate } from "react-router";
import {
  FaStar,
  FaHeart,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";

function ProductCard({
  product,
  onAddToCart,
  onWishlist,
  isWishlisted,
}) {
  const navigate = useNavigate();

  const categoryName =
    product.category?.name ||
    product.category ||
    "Category";

  const productId = product._id || product.id;

  const rating = product.rating || 5;

  const price =
    product.discountPrice > 0
      ? product.discountPrice
      : product.price;

  const oldPrice =
    product.discountPrice > 0
      ? product.price
      : Math.floor(product.price * 1.2);

  return (
    <div
      className="
        bg-white
        rounded-3xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        transition-all
        duration-500
        group
        border
        border-gray-100
      "
    >
      {/* Image */}
      <div className="relative overflow-hidden">

        {/* Category */}
        <span
          className="
            absolute
            top-4
            left-4
            z-20
            bg-blue-600
            text-white
            text-xs
            px-3
            py-1
            rounded-full
            font-semibold
          "
        >
          {categoryName}
        </span>

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onWishlist();
          }}
          className={`
            absolute
            top-4
            right-4
            z-20
            w-10
            h-10
            rounded-full
            shadow-lg
            flex
            items-center
            justify-center
            transition-all
            duration-300
            ${
              isWishlisted
                ? "bg-red-100 text-red-500 scale-110"
                : "bg-white text-gray-500 hover:bg-red-100 hover:text-red-500"
            }
          `}
        >
          {isWishlisted ? (
            <FaHeart className="text-xl" />
          ) : (
            <FaRegHeart className="text-xl" />
          )}
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          onClick={() => navigate(`/product/${productId}`)}
          className="
            w-full
            h-72
            object-cover
            cursor-pointer
            group-hover:scale-110
            transition-transform
            duration-500
          "
        />
      </div>

      {/* Content */}
      <div className="p-5">

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, index) => (
            <FaStar
              key={index}
              className={
                index < Math.floor(rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}

          <span className="text-sm text-gray-500 ml-2">
            ({rating})
          </span>
        </div>

        {/* Product Name */}
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
          {product.name}
        </h3>

        {/* Brand */}
        {product.brand && (
          <p className="text-gray-500 mt-2 text-sm">
            Brand : {product.brand}
          </p>
        )}

        {/* Price */}
        <div className="mt-4 flex items-center gap-3">
          <span className="text-2xl font-bold text-green-600">
            ₹{price.toLocaleString()}
          </span>

          {oldPrice > price && (
            <span className="text-gray-400 line-through">
              ₹{oldPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onAddToCart}
            className="
              flex-1
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              transition
            "
          >
            <FaShoppingCart />
            Add To Cart
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProductCard;