import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  FaStar,
  FaShoppingCart,
  FaTruck,
  FaUndo,
  FaShieldAlt,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollProgressBar from "./ScrollProgressBar";
import { getSingleProduct } from "../../service/product";
import { addToCart } from "../../service/cart";

function ProductDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    try {
      const res =
        await getSingleProduct(id);
      if (res.data.success) {
        setProduct(res.data.product);
      }
    }
    catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ADD TO CART

  const handleAddToCart = async () => {
    try {
      const user =
        JSON.parse(
          localStorage.getItem("user")
        );

      if (!user) {
        toast.warning(
          "Please login first"
        );
        navigate("/login");
        return;
      }
      await addToCart({
        user:
          user._id || user.id,
        product:
          product._id,
        quantity: quantity
      });
      toast.success(
        "Product added to cart"
      );
      window.dispatchEvent(
        new Event("cartUpdated")
      );
    }
    catch (error) {
      console.log(error.response?.data || error);
      toast.error(
        "Unable to add cart"
      );
    }
  };
  // CHECKOUT

  const handleCheckout = () => {
    navigate("/checkout", {
      state: {
        products: [{
          productId: product._id,
          name: product.name,
          image: product.image,
          price:
            product.discountPrice ||
            product.price,
          quantity: quantity
        }],
        totalAmount:
          (
            product.discountPrice ||
            product.price
          )
          *
          quantity
      }
    });
  };

  if (!product) {
    return (
      <div className="h-screen flex justify-center items-center text-3xl font-bold">
        Loading...
      </div>
    );
  }

  const price =
    product.discountPrice ||
    product.price;

  return (
    <>
      <ScrollProgressBar />
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10 mt-20">
          {/* IMAGE */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-2xl shadow-lg" />
          </div>

          {/* DETAILS */}
          <div>
            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <div className="flex text-yellow-400 mt-4">
              {
                [1, 2, 3, 4, 5].map(i =>
                  <FaStar key={i} />
                )
              }
            </div>

            <h2 className="text-4xl font-bold text-green-600 mt-6">
              ₹{price.toLocaleString()}
            </h2>

            <p className="text-gray-600 mt-5">
              {product.description}
            </p>

            <p className=" font-bold mt-5">
              Brand :
              <span className="ml-2">
                {product.brand}
              </span>
            </p>

            {/* QUANTITY */}
            <div className="mt-6">
              <h3 className="font-bold">
                Quantity
              </h3>

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => setQuantity(
                    quantity > 1 ?
                      quantity - 1 :
                      1
                  )}
                  className="bg-gray-200 w-10 h-10 rounded-lg"
                >
                  -
                </button>

                <span className=" text-xl font-bold px-4 ">
                  {quantity}
                </span>

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className=" bg-blue-600 text-white w-10 h-10 rounded-lg "
                >
                  +
                </button>
              </div>
            </div>

            <div className=" flex gap-5 mt-8 ">
              <button
                onClick={handleAddToCart}
                className=" bg-blue-600 text-white px-8 py-3 rounded-xl flex gap-2 items-center "
              >
                <FaShoppingCart />
                Add To Cart
              </button>
            </div>

            <div className=" grid md:grid-cols-3 gap-4 mt-10 ">
              <div className="border p-4 rounded-lg flex gap-2">
                <FaTruck />
                Free Shipping
              </div>

              <div className="border p-4 rounded-lg flex gap-2">
                <FaUndo />
                7 Days Return
              </div>

              <div className="border p-4 rounded-lg flex gap-2">
                <FaShieldAlt />
                Secure Payment

              </div>
            </div>

          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
export default ProductDetails;