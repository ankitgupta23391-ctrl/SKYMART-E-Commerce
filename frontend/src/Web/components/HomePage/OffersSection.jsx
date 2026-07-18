import React from "react";
import { FaTag, FaGift } from "react-icons/fa";

function OffersSection() {
  const offers = [
    {
      id: 1,
      title: "Electronics Mega Sale",
      discount: "Up to 60% OFF",
      description: "Get amazing discounts on mobiles, laptops and gadgets.",
    },
    {
      id: 2,
      title: "Fashion Festival",
      discount: "Flat 50% OFF",
      description: "Latest fashion trends at unbeatable prices.",
    },
    {
      id: 3,
      title: "Shoes Collection",
      discount: "Buy 1 Get 1 Free",
      description: "Premium shoes with exciting offers.",
    },
  ];

  return (
    <section className="w-full py-20 px-6">

      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-5xl font-extrabold text-black">
          Special Offers
        </h2>

        <p className="text-gray-200 mt-3">
          Grab the hottest deals before they're gone
        </p>

        <div className="w-32 h-1 mx-auto mt-5 rounded-full bg-amber-400"></div>
      </div>

      {/* Offer Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {offers.map((offer) => (

          <div
            key={offer.id}
            className="
            relative
            overflow-hidden
            rounded-3xl
            p-8
            border
            border-gray-950
            bg-green-700
            hover:scale-105
            hover:shadow-2xl
            transition-all
            duration-300
            group
          "
          >

            {/* Background Glow */}
            <div className="absolute h-32 w-32 rounded-full blur-3xl"></div>

            <FaTag
              size={40}
              className="text-yellow-400 mb-5"
            />

            <h3 className="text-2xl font-bold text-white">
              {offer.title}
            </h3>

            <p className="text-3xl font-extrabold text-yellow-400 mt-3">
              {offer.discount}
            </p>

            <p className="text-gray-300 mt-4">
              {offer.description}
            </p>

            <button
              className="
              mt-6
              px-6
              py-3
              bg-red-500
              rounded-xl
              font-semibold
              hover:scale-105
              transition
              text-white
            "
            >
              Shop Now →
            </button>

          </div>

        ))}

      </div>

      {/* Coupon Banner */}
      <div
        className="
        mt-16
        bg-blue-700
        rounded-3xl
        p-8
        shadow-2xl
      "
      >

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="flex items-center gap-5">

            <div className="bg-white p-4 rounded-2xl">
              <FaGift
                size={35}
                className="text-orange-500"
              />
            </div>

            <div>

              <h3 className="text-3xl font-bold text-white">
                Extra 20% OFF
              </h3>

              <p className="text-white/90 mt-1">
                Apply coupon at checkout and save more.
              </p>

            </div>

          </div>

          {/* Coupon Code */}
          <div
            className="
            bg-white
            px-8
            py-4
            rounded-2xl
            border-4
            border-dashed
            border-orange-400
            shadow-lg
          "
          >
            <span className="text-3xl font-black text-orange-600 tracking-widest">
              SAVE20
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default OffersSection;