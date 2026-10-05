import React from "react";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  ArrowRight,
} from "lucide-react";

import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const PharmacySignup = () => {
    const navigate = useNavigate();
  return (
    <div className="h-screen overflow-hidden bg-[#f5fbfa] flex">

      {/* =====================================================
          LEFT SIDE
      ====================================================== */}
      <div className="hidden lg:flex w-1/2 h-screen px-14 xl:px-20 flex-col justify-center">

        {/* Logo */}
        <div className="mb-10">
          <img
            src={logo}
            alt="MediCart"
            className="w-64 h-auto object-contain object-left"
          />
        </div>

        {/* Main Heading */}
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

          {/* Grow Business */}
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


          {/* Verified Partners */}
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
      <div className="w-full lg:w-1/2 h-screen min-h-0 p-3 flex">

        {/* WHITE CARD */}
        <div className="w-full h-full min-h-0 bg-white rounded-[30px] shadow-[0_12px_45px_rgba(20,70,90,0.10)] flex flex-col overflow-hidden">

          {/* =================================================
              FIXED HEADER
          ================================================== */}
          <div className="shrink-0 px-6 sm:px-8 xl:px-10 pt-5 pb-4">

            {/* Logo */}
            <div className="flex justify-center">

              <img
                src={logo}
                alt="MediCart"
                className="w-40 h-auto object-contain"
              />

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
              SCROLLABLE RIGHT CONTENT
          ================================================== */}
          <div
            className="
              flex-1
              min-h-0
              overflow-y-auto
              overscroll-contain
              px-6
              sm:px-8
              xl:px-10
              pb-6
              [scrollbar-width:thin]
              [scrollbar-color:#b8d9ce_transparent]
            "
          >

            {/* =================================================
                CUSTOMER / PARTNER SELECTION
            ================================================== */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">

              {/* CUSTOMER */}
              <div
                className="
                  border-2
                  border-[#d3dfeb]
                  bg-white
                  rounded-2xl
                  px-4
                  py-4
                  flex
                  items-center
                  gap-4
                  cursor-pointer
                  hover:border-emerald-400
                  transition
                "
                onClick={()=>{navigate("/register");}}
              >

                <div className="w-12 h-12 rounded-full bg-[#f1f5f8] flex items-center justify-center shrink-0">

                  <User
                    size={26}
                    className="text-[#7891aa]"
                  />

                </div>


                <div className="min-w-0">

                  <h3 className="font-bold text-base text-[#123b61]">
                    I am a Customer
                  </h3>

                  <p className="text-sm text-[#6683a0] mt-1">
                    Shop medicines for you and your family
                  </p>

                </div>

              </div>


              {/* PARTNER - SELECTED */}
              <div
                className="
                  border-2
                  border-emerald-500
                  bg-emerald-50
                  rounded-2xl
                  px-4
                  py-4
                  flex
                  items-center
                  gap-4
                "
              >

                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">

                  <Building2
                    size={26}
                    className="text-emerald-500"
                  />

                </div>


                <div className="min-w-0">

                  <h3 className="font-bold text-base text-[#123b61]">
                    I am a Partner
                  </h3>

                  <p className="text-sm text-[#6683a0] mt-1">
                    Register your pharmacy or medical store
                  </p>

                </div>


                <div className="ml-auto w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shrink-0">

                  ✓

                </div>

              </div>

            </div>


            {/* =================================================
                FORM
            ================================================== */}
            <form className="flex flex-col gap-4">

              {/* Pharmacy Name */}
              <div>

                <label
                  htmlFor="name"
                  className="block mb-1.5 text-sm font-semibold text-[#123b61]"
                >
                  Pharmacy Name
                </label>


                <div className="relative">

                  <Building2
                    size={19}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#7891aa]
                    "
                  />

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter pharmacy or store name"
                    className="
                      w-full
                      h-12
                      pl-12
                      pr-4
                      rounded-xl
                      border
                      border-[#d3dfeb]
                      outline-none
                      text-sm
                      text-[#123b61]
                      placeholder:text-[#8ba0b5]
                      focus:border-emerald-500
                      focus:ring-2
                      focus:ring-emerald-100
                    "
                  />

                </div>

              </div>


              {/* Email + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Email */}
                <div>

                  <label
                    htmlFor="email"
                    className="block mb-1.5 text-sm font-semibold text-[#123b61]"
                  >
                    Email
                  </label>


                  <div className="relative">

                    <Mail
                      size={19}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[#7891aa]
                      "
                    />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      className="
                        w-full
                        h-12
                        pl-12
                        pr-3
                        rounded-xl
                        border
                        border-[#d3dfeb]
                        outline-none
                        text-sm
                        text-[#123b61]
                        placeholder:text-[#8ba0b5]
                        focus:border-emerald-500
                        focus:ring-2
                        focus:ring-emerald-100
                      "
                    />

                  </div>

                </div>


                {/* Phone */}
                <div>

                  <label
                    htmlFor="phone"
                    className="block mb-1.5 text-sm font-semibold text-[#123b61]"
                  >
                    Phone Number
                  </label>


                  <div className="relative">

                    <Phone
                      size={19}
                      className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-[#7891aa]
                      "
                    />

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      className="
                        w-full
                        h-12
                        pl-12
                        pr-3
                        rounded-xl
                        border
                        border-[#d3dfeb]
                        outline-none
                        text-sm
                        text-[#123b61]
                        placeholder:text-[#8ba0b5]
                        focus:border-emerald-500
                        focus:ring-2
                        focus:ring-emerald-100
                      "
                    />

                  </div>

                </div>

              </div>


              {/* Pharmacy Address */}
              <div>

                <label
                  htmlFor="address"
                  className="block mb-1.5 text-sm font-semibold text-[#123b61]"
                >
                  Pharmacy Address
                </label>


                <div className="relative">

                  <MapPin
                    size={19}
                    className="
                      absolute
                      left-4
                      top-4
                      text-[#7891aa]
                    "
                  />

                  <textarea
                    id="address"
                    name="address"
                    placeholder="Enter complete pharmacy address"
                    className="
                      w-full
                      h-20
                      pl-12
                      pr-4
                      py-3
                      rounded-xl
                      border
                      border-[#d3dfeb]
                      outline-none
                      resize-none
                      text-sm
                      text-[#123b61]
                      placeholder:text-[#8ba0b5]
                      focus:border-emerald-500
                      focus:ring-2
                      focus:ring-emerald-100
                    "
                  />

                </div>

              </div>


              {/* Drug License Number */}
              <div>

                <label
                  htmlFor="licenseNumber"
                  className="block mb-1.5 text-sm font-semibold text-[#123b61]"
                >
                  Drug License Number
                </label>


                <div className="relative">

                  <FileText
                    size={19}
                    className="
                      absolute
                      left-4
                      top-1/2
                      -translate-y-1/2
                      text-[#7891aa]
                    "
                  />

                  <input
                    id="licenseNumber"
                    name="licenseNumber"
                    type="text"
                    placeholder="Enter your pharmacy license number"
                    className="
                      w-full
                      h-12
                      pl-12
                      pr-4
                      rounded-xl
                      border
                      border-[#d3dfeb]
                      outline-none
                      text-sm
                      text-[#123b61]
                      placeholder:text-[#8ba0b5]
                      focus:border-emerald-500
                      focus:ring-2
                      focus:ring-emerald-100
                    "
                  />

                </div>

              </div>


              {/* Terms */}
              <div className="flex items-start gap-2">

                <input
                  id="terms"
                  type="checkbox"
                  className="
                    w-4
                    h-4
                    mt-0.5
                    accent-emerald-500
                    shrink-0
                  "
                />

                <label
                  htmlFor="terms"
                  className="text-xs leading-5 text-[#6683a0]"
                >
                  I agree to MediCart's partner terms and confirm
                  that the information provided is accurate.
                </label>

              </div>


              {/* Register Button */}
              <button
                type="button"
                className="
                  w-full
                  h-12
                  rounded-xl
                  bg-emerald-500
                  hover:bg-emerald-600
                  text-white
                  font-bold
                  text-base
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >
                Register Pharmacy

                <ArrowRight size={19} />

              </button>

            </form>


            
            

          </div>

        </div>

      </div>

    </div>
  );
};

export default PharmacySignup;