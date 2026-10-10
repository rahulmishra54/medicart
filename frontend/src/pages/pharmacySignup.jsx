import React, { useState } from "react";
import {
  User,
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  Lock,
  ArrowRight,
} from "lucide-react";

import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux";

import { registerPharmisct } from "../redux/pharmisctAuthSlice.js";
const PharmacySignup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePharmacySignup = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    const formValues = new FormData(event.currentTarget);
    const requestData = {
      name: formValues.get("name"),
      email: formValues.get("email"),
      phone: formValues.get("phone"),
      address: formValues.get("address"),
      licenseNumber: formValues.get("licenseNumber"),
      password: formValues.get("password"),
      confirmPassword: formValues.get("confirmPassword"),
    };

    console.log("PHARMACIST REGISTER REQUEST:", requestData);
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/pharmacists/register",
        requestData,
        { headers: { "Content-Type": "application/json" } },
      );
      dispatch(registerPharmisct(response.data));
      navigate("/pharmacist/registration-submitted");
    } catch (error) {
      console.log("PHARMACIST REGISTER ERROR:", error.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f5fbfa]">

      {/* =====================================================
          LEFT SIDE
      ====================================================== */}

      <div className="hidden h-screen shrink-0 flex-col justify-center px-8 lg:flex lg:w-1/2 xl:px-14 2xl:px-20">

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

      <div className="h-screen min-h-0 w-full overflow-x-hidden overflow-y-auto overscroll-contain p-3 lg:w-1/2">

        {/* WHITE CARD */}

        <div className="mx-auto flex w-full min-h-[calc(100vh-1.5rem)] flex-col overflow-hidden rounded-[30px] bg-white shadow-[0_12px_45px_rgba(20,70,90,0.10)]">

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
              px-6
              sm:px-8
              xl:px-10
              pb-6
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
                onClick={() => {
                  navigate("/register");
                }}
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

            <form className="flex flex-col gap-4" onSubmit={handlePharmacySignup}>

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


              {/* Password */}

              <div>

                <label
                  htmlFor="password"
                  className="block mb-1.5 text-sm font-semibold text-[#123b61]"
                >
                  Password
                </label>

                <div className="relative">

                  <Lock
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
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Create your password"
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


              {/* Confirm Password */}

              <div>

                <label
                  htmlFor="confirmPassword"
                  className="block mb-1.5 text-sm font-semibold text-[#123b61]"
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
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
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
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
                type="submit"
                disabled={isSubmitting}
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
                {isSubmitting ? "Registering..." : "Register Pharmacy"}

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