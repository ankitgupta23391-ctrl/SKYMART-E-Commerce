import React from "react";
import { FaArrowRight, FaStar, FaShippingFast } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";

import "swiper/css";
import "swiper/css/pagination";

function Hero() {
  const slides = [
    {
      title: "Mega Sale 2026",
      discount: "70% OFF",
      image:
        "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800",
    },
    {
      title: "Fashion Collection",
      discount: "50% OFF",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    },
    {
      title: "Latest Electronics",
      discount: "60% OFF",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    },
    {
      title: "Premium Shoes",
      discount: "40% OFF",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    },
    {
      title: "Smart Gadgets",
      discount: "55% OFF",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    },
    {
      title: "Home & Living",
      discount: "45% OFF",
      image:
        "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800",
    },
  ];
  return (
    <section className="bg-red-500 text-white py-12">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-10">

              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-xl"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
                  <FaStar className="text-yellow-400" />
                  <span>Best Deals of the Year</span>
                </div>

                {/* Heading */}
                <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                  {slide.title}
                </h1>

                <p className="text-lg text-gray-100 mb-8">
                  Up to{" "}
                  <span className="font-bold text-yellow-300">
                    {slide.discount}
                  </span>{" "}
                  on Electronics, Fashion, Shoes, Mobiles & More.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <button className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100">
                    Shop Now
                    <FaArrowRight />
                  </button>

                  <button className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition">
                    View Offers
                  </button>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8">
                  <div>
                    <h3 className="text-3xl font-bold">50K+</h3>
                    <p className="text-gray-200">Happy Customers</p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold">10K+</h3>
                    <p className="text-gray-200">Products</p>
                  </div>

                  <div>
                    <h3 className="text-3xl font-bold">24/7</h3>
                    <p className="text-gray-200">Support</p>
                  </div>
                </div>
              </motion.div>

              {/* Right Image */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <motion.img
                  src={slide.image}
                  alt="Hero Banner"
                  className="w-full max-w-lg rounded-2xl shadow-2xl"
                  animate={{ y: [0, -15, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                />

                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-white text-black p-4 rounded-xl shadow-lg">
                  <div className="flex items-center gap-2">
                    <FaShippingFast className="text-green-600" />
                    <span className="font-semibold">
                      Free Shipping
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    On orders above ₹999
                  </p>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Hero;