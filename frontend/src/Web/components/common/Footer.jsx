import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* About Us */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-blue-400">
              MyShop
            </h3>

            <p className="text-gray-300">
              MyShop is your trusted online shopping destination
              for electronics, fashion, shoes, mobiles, and more.
              We provide quality products at affordable prices.
            </p>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-gray-300">
              <p className="flex items-center gap-2">
                <FaPhone />
                +91 98765 43210
              </p>

              <p className="flex items-center gap-2">
                <FaEnvelope />
                support@myshop.com
              </p>

              <p className="flex items-center gap-2">
                <FaMapMarkerAlt />
                Lucknow, Uttar Pradesh, India
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="/" className="hover:text-blue-400">
                  Home
                </a>
              </li>

              <li>
                <a href="/about" className="hover:text-blue-400">
                  About Us
                </a>
              </li>

              <li>
                <a href="/contact" className="hover:text-blue-400">
                  Contact Us
                </a>
              </li>

              <li>
                <a href="/privacy-policy" className="hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Follow Us
            </h3>

            <div className="flex gap-4">
              <a
                href="#"
                className="bg-blue-600 p-3 rounded-full hover:scale-110 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="bg-pink-600 p-3 rounded-full hover:scale-110 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="bg-sky-500 p-3 rounded-full hover:scale-110 transition"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="bg-blue-700 p-3 rounded-full hover:scale-110 transition"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} MyShop. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;