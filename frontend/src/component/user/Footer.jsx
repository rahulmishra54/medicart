import React from "react";
import { Link } from "react-router-dom";
import {
  HeartPulse,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full border-t border-slate-100 bg-white text-[#17324D]">

      {/* Main Footer */}
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">

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
              Browse medicines and healthcare essentials from the MediCart catalog.
            </p>
          </div>


          {/* Quick Links */}
          <div>

            <h3 className="font-semibold text-lg mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm text-[#55758A]">

              <li><Link to="/" className="transition hover:text-[#19A974]">Home</Link></li>
              <li><Link to="/medicines" className="transition hover:text-[#19A974]">Medicines</Link></li>
              <li><Link to="/categories" className="transition hover:text-[#19A974]">Categories</Link></li>
              <li><Link to="/offers" className="transition hover:text-[#19A974]">Offers</Link></li>
            </ul>

          </div>


          {/* Customer Support */}
          <div>

            <h3 className="font-semibold text-lg mb-5">
              Shop &amp; Account
            </h3>

            <ul className="space-y-3 text-sm text-[#55758A]">

              <li><Link to="/cart" className="transition hover:text-[#19A974]">Cart</Link></li>
              <li><Link to="/login" className="transition hover:text-[#19A974]">Sign in</Link></li>
              <li><Link to="/register" className="transition hover:text-[#19A974]">Create an account</Link></li>

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
      <div className="border-t border-slate-100 bg-[#fbfdfc]">

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


          <div className="flex items-center gap-5 text-xs text-[#6B8798] sm:text-sm">
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