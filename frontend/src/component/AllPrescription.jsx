import React from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  ArrowRight,
} from "lucide-react";

const PharmacySignup = () => {
  return (
    <div className="h-screen overflow-hidden bg-[#f5fbfa] flex">

      {/* =====================================================
          LEFT SIDE
      ====================================================== */}
      <div className="hidden lg:flex w-1/2 h-screen px-14 xl:px-20 flex-col justify-center">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">

          <div className="w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">
              +
            </span>
          </div>

          <div>
            <h1 className="text-4xl font-bold text-[#123b61]">
              Medi<span className="text-emerald-500">Cart</span>
            </h1>

            <p className="text-sm text-[#6683a0]">
              Your Health, Our Priority
            </p>
          </div>

        </div>


        {/* Heading */}
        <h2 className="text-5xl xl:text-6xl font-bold leading-[1.05] text-[#123b61]">
          Grow Your
          <br />
          Pharmacy,
          <br />
          <span className="text-emerald-500">
            With MediCart
          </span>
        </h2>


        {/* Description */}
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#6683a0]">
          Join MediCart and connect your pharmacy with customers
          looking for trusted medicines and healthcare products.
        </p>


        {/* Benefits */}
        <div className="grid grid-cols-2 gap-8 mt-10">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <Building2
                size={27}
                className="text-emerald-500"
              />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#123b61]">
                Grow Your Business
              </h3>

              <p className="text-sm text-[#6683a0] mt-1">
                Reach more customers
              </p>
            </div>

          </div>


          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
              <FileText
                size={27}
                className="text-emerald-500"
              />
            </div>

            <div>
              <h3 className="font-bold text-base text-[#123b61]">
                Verified Partners
              </h3>

              <p className="text-sm text-[#6683a0] mt-1">
                Trusted healthcare network
              </p>
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          RIGHT SIDE
      ====================================================== */}
      <div className="w-full lg:w-1/2 h-full min-h-0 p-3 flex">

        {/* WHITE CARD */}
        <div className="w-full h-full min-h-0 bg-white rounded-[30px] shadow-[0_12px_45px_rgba(20,70,90,0.10)] flex flex-col overflow-hidden">

          {/* =================================================
              FIXED CARD HEADER
          ================================================== */}
          <div className="shrink-0 px-6 sm:px-8 xl:px-10 pt-5 pb-4">

            {/* Logo */}
            <div className="flex justify-center items-center gap-2">

              <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">
                  +
                </span>
              </div>

              <h1 className="text-2xl font-bold text-[#123b61]">
                Medi<span className="text-emerald-500">
                  Cart
                </span>
              </h1>

            </div>


            {/* Heading */}
            <div className="text-center mt-2">

              <h2 className="text-2xl sm:text-3xl font-bold text-[#123b61]">
                Register Your Pharmacy
              </h2>

              <p className="mt-1 text-sm text-[#6683a0]">
                Join MediCart and grow your healthcare business
              </p>

            </div>

          </div>


          {/* =================================================
              SCROLLABLE CONTENT
          ================================================== */}
          <div
            className="
              flex-1
              min-h-0
              overflow-y-auto
              px-6
              sm:px-8
              xl:px-10
              pb-6
              [scrollbar-width:thin]
              [scrollbar-color:#b8d9ce_transparent]
            "
          >

            {/* Partner Card */}
            <div className="border-2 border-emerald-500 bg-emerald-50 rounded-xl px-4 py-3 flex items-center gap-3 mb-5">

              <div className="w-11 h-11 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <Building2
                  size={23}
                  className="text-emerald-500"
                />
              </div>

              <div className="min-w-0">

                <h3 className="font-bold text-sm text-[#123b61]">
                  I am a Partner
                </h3>

                <p className="text-sm text-[#6683a0] mt-0.5">
                  Register your pharmacy or medical store
                </p>

              </div>

              <div className="ml-auto w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">
                ✓
              </div>

            </div>


            {/* FORM */}
            <form className="flex flex-col gap-4">

              {/* Pharmacy Name */}
              <div>

                <label className="block mb-1.5 text-sm font-semibold text-[#123b61]">
                  Pharmacy Name
                </label>

                <div className="relative">

                  <Building2
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7891aa]"
                  />

                  <input
                    type="text"
                    placeholder="Enter pharmacy or store name"
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-[#d3dfeb] outline-none text-sm text-[#123b61] placeholder:text-[#8ba0b5] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />

                </div>

              </div>


              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Email */}
                <div>

                  <label className="block mb-1.5 text-sm font-semibold text-[#123b61]">
                    Email
                  </label>

                  <div className="relative">

                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7891aa]"
                    />

                    <input
                      type="email"
                      placeholder="Enter email"
                      className="w-full h-12 pl-12 pr-3 rounded-xl border border-[#d3dfeb] outline-none text-sm text-[#123b61] placeholder:text-[#8ba0b5] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />

                  </div>

                </div>


                {/* Phone */}
                <div>

                  <label className="block mb-1.5 text-sm font-semibold text-[#123b61]">
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7891aa]"
                    />

                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="w-full h-12 pl-12 pr-3 rounded-xl border border-[#d3dfeb] outline-none text-sm text-[#123b61] placeholder:text-[#8ba0b5] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />

                  </div>

                </div>

              </div>


              {/* Address */}
              <div>

                <label className="block mb-1.5 text-sm font-semibold text-[#123b61]">
                  Pharmacy Address
                </label>

                <div className="relative">

                  <MapPin
                    size={19}
                    className="absolute left-4 top-4 text-[#7891aa]"
                  />

                  <textarea
                    placeholder="Enter complete pharmacy address"
                    className="w-full h-20 pl-12 pr-4 py-3 rounded-xl border border-[#d3dfeb] outline-none resize-none text-sm text-[#123b61] placeholder:text-[#8ba0b5] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />

                </div>

              </div>


              {/* License */}
              <div>

                <label className="block mb-1.5 text-sm font-semibold text-[#123b61]">
                  Drug License Number
                </label>

                <div className="relative">

                  <FileText
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7891aa]"
                  />

                  <input
                    type="text"
                    placeholder="Enter your pharmacy license number"
                    className="w-full h-12 pl-12 pr-4 rounded-xl border border-[#d3dfeb] outline-none text-sm text-[#123b61] placeholder:text-[#8ba0b5] focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  />

                </div>

              </div>


              {/* Terms */}
              <div className="flex items-start gap-2">

                <input
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 accent-emerald-500 shrink-0"
                />

                <p className="text-xs leading-5 text-[#6683a0]">
                  I agree to MediCart's partner terms and confirm
                  that the information provided is accurate.
                </p>

              </div>


              {/* Button */}
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-base flex items-center justify-center gap-2 transition"
              >
                Register Pharmacy
                <ArrowRight size={19} />
              </button>

            </form>


            {/* Sign In */}
            <p className="text-center mt-5 pb-3 text-sm text-[#6683a0]">

              Already have a partner account?{" "}

              <button
                type="button"
                className="text-emerald-600 font-semibold hover:underline"
              >
                Sign in
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PharmacySignup;