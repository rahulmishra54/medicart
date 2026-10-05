import React from "react";
import {
  HeartPulse,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#F1F9FE] text-[#123B5D]">

      {/* Main Footer */}
      <div className="w-full px-8 md:px-12 lg:px-16 xl:px-20 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-5">

              <div className="w-10 h-10 rounded-xl bg-[#19A974] flex items-center justify-center">
                <HeartPulse
                  className="text-white"
                  size={22}
                />
              </div>

              <h2 className="text-2xl font-bold">
                Medi<span className="text-[#19A974]">Cart</span>
              </h2>

            </div>

            <p className="text-sm leading-6 text-[#55758A] max-w-xs">
              Your trusted online healthcare store for medicines,
              wellness products, and everyday healthcare essentials.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6">

              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-white flex items-center
                justify-center hover:bg-[#19A974] hover:text-white
                transition font-semibold text-sm"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-white flex items-center
                justify-center hover:bg-[#19A974] hover:text-white
                transition font-semibold text-sm"
              >
                ◎
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full bg-white flex items-center
                justify-center hover:bg-[#19A974] hover:text-white
                transition font-semibold text-sm"
              >
                𝕏
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-full bg-white flex items-center
                justify-center hover:bg-[#19A974] hover:text-white
                transition font-semibold text-sm"
              >
                in
              </a>

            </div>
          </div>


          {/* Quick Links */}
          <div>

            <h3 className="font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-[#55758A]">

              <li>
                <a
                  href="#"
                  className="hover:text-[#19A974] transition"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#19A974] transition"
                >
                  Medicines
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#19A974] transition"
                >
                  Health Products
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#19A974] transition"
                >
                  Offers
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#19A974] transition"
                >
                  About Us
                </a>
              </li>

            </ul>

          </div>


          {/* Customer Support */}
          <div>

            <h3 className="font-semibold text-lg mb-5">
              Customer Support
            </h3>

            <ul className="space-y-3 text-sm text-[#55758A]">

              <li>
                <a
                  href="#"
                  className="hover:text-[#19A974] transition"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#19A974] transition"
                >
                  Shipping & Delivery
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#19A974] transition"
                >
                  Returns & Refunds
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#19A974] transition"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#19A974] transition"
                >
                  Terms & Conditions
                </a>
              </li>

            </ul>

          </div>


          {/* Contact */}
          <div>

            <h3 className="font-semibold text-lg mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-sm text-[#55758A]">

              {/* Location */}
              <div className="flex gap-3">

                <MapPin
                  size={19}
                  className="text-[#19A974] shrink-0 mt-0.5"
                />

                <p>
                  Noida, Uttar Pradesh
                  <br />
                  India
                </p>

              </div>


              {/* Phone */}
              <div className="flex gap-3 items-center">

                <Phone
                  size={18}
                  className="text-[#19A974] shrink-0"
                />

                <p>
                  +91 98765 43210
                </p>

              </div>


              {/* Email */}
              <div className="flex gap-3 items-center">

                <Mail
                  size={18}
                  className="text-[#19A974] shrink-0"
                />

                <p>
                  support@medicart.com
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Bottom Bar */}
      <div className="border-t border-[#D9EAF2]">

        <div
          className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-5
          flex flex-col md:flex-row items-center justify-between gap-3"
        >

          {/* Copyright */}
          <p
            className="text-xs sm:text-sm text-[#6B8798]
            text-center md:text-left"
          >
            © 2026 MediCart. All rights reserved.
          </p>


          {/* Bottom Links */}
          <div
            className="flex items-center gap-5
            text-xs sm:text-sm text-[#6B8798]"
          >

            <a
              href="#"
              className="hover:text-[#19A974] transition"
            >
              Privacy
            </a>

            <a
              href="#"
              className="hover:text-[#19A974] transition"
            >
              Terms
            </a>

            <a
              href="#"
              className="hover:text-[#19A974] transition"
            >
              Cookies
            </a>


            {/* Back To Top */}
            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              aria-label="Back to top"
              className="w-8 h-8 rounded-full bg-white
              flex items-center justify-center
              hover:bg-[#19A974] hover:text-white
              transition"
            >
              <ArrowUp size={16} />
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;