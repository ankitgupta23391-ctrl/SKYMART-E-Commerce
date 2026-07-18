import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Verified Buyer",
      rating: 5,
      review:
        "Amazing shopping experience! Fast delivery and excellent product quality.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 2,
      name: "Priya Verma",
      role: "Premium Member",
      rating: 5,
      review:
        "Great customer support and fantastic discounts. Highly recommended!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 3,
      name: "Amit Singh",
      role: "Verified Buyer",
      rating: 4,
      review:
        "Products are genuine and delivery was on time. Very satisfied.",
      image: "https://randomuser.me/api/portraits/men/55.jpg",
    },
  ];

  return (
    <section className="relative w-full py-24 px-6 overflow-hidden bg-slate-50">

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">

          <span className="uppercase tracking-[0.3em] text-gray-500 text-sm font-medium">
            Testimonials
          </span>

          <h2 className="text-5xl md:text-6xl font-black text-gray-900 mt-3">
            Customer Reviews
          </h2>

          <p className="text-gray-600 mt-4 text-lg">
            Trusted by thousands of happy shoppers worldwide
          </p>

          <div className="w-24 h-1 bg-black mx-auto mt-6 rounded-full"></div>

        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {reviews.map((review) => (

            <div
              key={review.id}
              className="
                group
                bg-white/70
                backdrop-blur-xl
                border border-white
                rounded-3xl
                p-8
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-3
                transition-all
                duration-500
              "
            >

              {/* Quote */}
              <FaQuoteLeft className="text-4xl text-blue-500 opacity-30 group-hover:opacity-100 transition mb-6" />

              {/* Review */}
              <p className="text-gray-600 leading-relaxed mb-8">
                {review.review}
              </p>

              {/* User */}
              <div className="flex items-center gap-4">

                <img
                  src={review.image}
                  alt={review.name}
                  className="
                    w-16
                    h-16
                    rounded-full
                    object-cover
                    border-4
                    border-white
                    shadow-md
                  "
                />

                <div>

                  <h3 className="font-bold text-lg text-gray-900">
                    {review.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {review.role}
                  </p>

                  {/* Rating */}
                  <div className="flex gap-1 mt-2">

                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        className={`${
                          index < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Testimonials;