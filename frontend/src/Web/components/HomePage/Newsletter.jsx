import React from "react";
import { FaEnvelope, FaPaperPlane } from "react-icons/fa";

function Newsletter() {
  return (
    <section className="w-full py-24 px-6 bg-gray-500">

      <div className="max-w-5xl mx-auto">

        <div
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-10 md:p-16 shadow-2xl text-center">
            
          {/* Icon */}
          <div
            className="
              w-24
              h-24
              mx-auto
              rounded-full
              bg-white/10
              flex
              items-center
              justify-center
              mb-8
              border
              border-white/10
            "
          >
            <FaEnvelope className="text-4xl text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-black text-white">
            Join Our Newsletter
          </h2>

          <p className="text-gray-400 mt-5 text-lg max-w-2xl mx-auto">
            Subscribe to receive exclusive offers, new arrivals,
            product launches and special discounts directly in your inbox.
          </p>

          {/* Input */}
          <div className="mt-10 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">

            <input
              type="email"
              placeholder="Enter your email address"
              className="
                flex-1
                px-6
                py-4
                rounded-2xl
                bg-[#1e293b]
                border
                border-slate-700
                text-white
                placeholder:text-gray-500
                outline-none
                focus:border-white
                transition
              "
            />

            <button
              className="
                px-8
                py-4
                rounded-2xl
                bg-white
                text-black
                font-semibold
                flex
                items-center
                justify-center
                gap-3
                hover:bg-gray-200
                hover:scale-105
                transition-all
                duration-300
              "
            >
              <FaPaperPlane />
              Subscribe
            </button>

          </div>

          {/* Footer Text */}
          <p className="text-gray-500 text-sm mt-6">
            No spam. Unsubscribe anytime.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Newsletter;