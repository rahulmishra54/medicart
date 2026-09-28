import React from "react";

import {
  User,
  Mail,
  Lock,
  Eye,
  ShieldCheck,
  Truck,
  CreditCard,
  Headphones,
  Plus,
  ArrowRight,
  Store,
} from "lucide-react";

const Signup = () => {
  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-[#F4FBFC] via-white to-[#ECF9F6]">

      <div className="grid h-full w-full lg:grid-cols-[45%_50%]">


        {/* ================= LEFT ================= */}
        <div className="hidden lg:flex h-full items-center px-10 sm:px-14 lg:px-16 xl:px-20">

          <div className="w-full max-w-[650px]">

            {/* Logo */}
            <div className="mb-8 flex items-center gap-3">

              <div className="relative flex h-12 w-12 items-center justify-center">

                <div className="absolute h-9 w-9 rounded-lg bg-[#08A875]" />

                <div className="absolute h-12 w-4 rounded-lg bg-[#08A875]" />

                <div className="absolute h-4 w-12 rounded-lg bg-[#08A875]" />

                <Plus
                  size={28}
                  strokeWidth={4}
                  className="relative z-10 text-white"
                />

              </div>

              <div>
                <h1 className="text-[28px] font-bold leading-none text-[#0B3154]">
                  Medi<span className="text-[#08A875]">Cart</span>
                </h1>

                <p className="mt-1 text-[10px] text-[#49627C]">
                  Your Health, Our Priority
                </p>
              </div>

            </div>


            {/* Heading */}
            <h2 className="text-6xl font-extrabold leading-[0.98] tracking-tight text-[#0B3154] xl:text-7xl">

              Your
              <br />

              Health,
              <br />

              Our{" "}

              <span className="text-[#08A875]">
                Priority
              </span>

            </h2>


            {/* Description */}
            <p className="mt-6 max-w-[570px] text-lg leading-7 text-[#667B98]">
              Genuine medicines, trusted pharmacies and expert support —
              delivered to your doorstep.
            </p>


            {/* Features */}
            <div className="mt-9 grid max-w-[610px] grid-cols-2 gap-x-10 gap-y-6">

              {/* 1 */}
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#DDF7F0]">

                  <ShieldCheck
                    size={27}
                    className="text-[#08A875]"
                  />

                </div>

                <div>
                  <p className="font-bold text-[#0B3154]">
                    100% Genuine
                  </p>

                  <p className="mt-0.5 text-sm text-[#667B98]">
                    Medicines
                  </p>
                </div>

              </div>


              {/* 2 */}
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#DDF7F0]">

                  <Truck
                    size={27}
                    className="text-[#08A875]"
                  />

                </div>

                <div>
                  <p className="font-bold text-[#0B3154]">
                    Fast & Reliable
                  </p>

                  <p className="mt-0.5 text-sm text-[#667B98]">
                    Delivery
                  </p>
                </div>

              </div>


              {/* 3 */}
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#DDF7F0]">

                  <CreditCard
                    size={27}
                    className="text-[#08A875]"
                  />

                </div>

                <div>
                  <p className="font-bold text-[#0B3154]">
                    Secure
                  </p>

                  <p className="mt-0.5 text-sm text-[#667B98]">
                    Payments
                  </p>
                </div>

              </div>


              {/* 4 */}
              <div className="flex items-center gap-4">

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#DDF7F0]">

                  <Headphones
                    size={27}
                    className="text-[#08A875]"
                  />

                </div>

                <div>
                  <p className="font-bold text-[#0B3154]">
                    24/7
                  </p>

                  <p className="mt-0.5 text-sm text-[#667B98]">
                    Customer Support
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= RIGHT ================= */}
        <div className="flex h-full items-center justify-center px-6 py-5 xl:px-10">

          <div className="w-full  rounded-[28px] border border-white bg-white/95 px-7 py-5 shadow-[0_20px_60px_rgba(11,49,84,0.12)] sm:px-9">


            {/* Logo */}
            <div className="flex justify-center">

              <div className="flex items-center gap-2">

                <div className="relative flex h-10 w-10 items-center justify-center">

                  <div className="absolute h-7 w-7 rounded-lg bg-[#08A875]" />

                  <div className="absolute h-10 w-4 rounded-lg bg-[#08A875]" />

                  <div className="absolute h-4 w-10 rounded-lg bg-[#08A875]" />

                  <Plus
                    size={23}
                    strokeWidth={4}
                    className="relative z-10 text-white"
                  />

                </div>

                <div>

                  <h1 className="text-[25px] font-bold leading-none text-[#0B3154]">
                    Medi<span className="text-[#08A875]">
                      Cart
                    </span>
                  </h1>

                  <p className="mt-1 text-[8px] text-[#49627C]">
                    Your Health, Our Priority
                  </p>

                </div>

              </div>

            </div>


            {/* Heading */}
            <div className="mt-3 text-center">

              <h2 className="text-[28px] font-bold text-[#0B3154]">
                Create Your Account
              </h2>

              <p className="mt-1 text-sm leading-5 text-[#667B98]">
                Join MediCart and start your healthcare journey
                <br />
                today.
              </p>

            </div>


            {/* Customer / Partner */}
            <div className="mt-4 grid grid-cols-2 gap-3">

              {/* Customer */}
              <button
                className="relative rounded-xl border-2 border-[#08A875] bg-[#F1FBF8] p-3 text-left"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DDF7F0]">

                    <User
                      size={20}
                      className="text-[#08A875]"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-bold text-[#0B3154]">
                      I am a Customer
                    </p>

                    <p className="mt-0.5 text-[11px] leading-4 text-[#667B98]">
                      Shop medicines for you and your family
                    </p>

                  </div>

                </div>

                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#08A875] text-xs font-bold text-white">
                  ✓
                </div>

              </button>


              {/* Partner */}
              <button
                className="rounded-xl border border-[#D7E1EA] bg-white p-3 text-left"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F1F5F8]">

                    <Store
                      size={20}
                      className="text-[#7185A0]"
                    />

                  </div>

                  <div>

                    <p className="text-sm font-bold text-[#0B3154]">
                      I am a Partner
                    </p>

                    <p className="mt-0.5 text-[11px] leading-4 text-[#667B98]">
                      Register your pharmacy or medical store
                    </p>

                  </div>

                </div>

              </button>

            </div>


            {/* Full Name */}
            <div className="mt-3">

              <label className="mb-1 block text-sm font-semibold text-[#0B3154]">
                Full Name
              </label>

              <div className="flex h-10 items-center rounded-lg border border-[#D7E1EA] px-3">

                <User
                  size={18}
                  className="text-[#7185A0]"
                />

                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="ml-3 w-full outline-none placeholder:text-[#8191A8]"
                />

              </div>

            </div>


            {/* Email */}
            <div className="mt-2.5">

              <label className="mb-1 block text-sm font-semibold text-[#0B3154]">
                Email or Phone Number
              </label>

              <div className="flex h-10 items-center rounded-lg border border-[#D7E1EA] px-3">

                <Mail
                  size={18}
                  className="text-[#7185A0]"
                />

                <input
                  type="text"
                  placeholder="Enter your email or phone number"
                  className="ml-3 w-full outline-none placeholder:text-[#8191A8]"
                />

              </div>

            </div>


            {/* Password */}
            <div className="mt-2.5">

              <label className="mb-1 block text-sm font-semibold text-[#0B3154]">
                Password
              </label>

              <div className="flex h-10 items-center rounded-lg border border-[#D7E1EA] px-3">

                <Lock
                  size={18}
                  className="text-[#7185A0]"
                />

                <input
                  type="password"
                  placeholder="Create a password"
                  className="ml-3 w-full outline-none placeholder:text-[#8191A8]"
                />

                <Eye
                  size={18}
                  className="text-[#7185A0]"
                />

              </div>

            </div>


            {/* Confirm Password */}
            <div className="mt-2.5">

              <label className="mb-1 block text-sm font-semibold text-[#0B3154]">
                Confirm Password
              </label>

              <div className="flex h-10 items-center rounded-lg border border-[#D7E1EA] px-3">

                <Lock
                  size={18}
                  className="text-[#7185A0]"
                />

                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="ml-3 w-full outline-none placeholder:text-[#8191A8]"
                />

                <Eye
                  size={18}
                  className="text-[#7185A0]"
                />

              </div>

            </div>


            {/* Terms */}
            <div className="mt-2.5 flex items-center gap-2">

              <input
                type="checkbox"
                className="h-4 w-4 accent-[#08A875]"
              />

              <p className="text-[11px] text-[#667B98]">
                I agree to the{" "}
                <span className="font-semibold text-[#08A875]">
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span className="font-semibold text-[#08A875]">
                  Privacy Policy
                </span>
              </p>

            </div>


            {/* Create Account */}
            <button
              className="mt-3 flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-[#08A875] text-sm font-semibold text-white shadow-sm transition hover:bg-[#078F65]"
            >

              Create Account

              <ArrowRight size={19} />

            </button>


            {/* Login */}
            <div className="mt-3 border-t border-[#E1E8ED] pt-2.5 text-center">

              <p className="text-sm text-[#667B98]">

                Already have an account?

                <button className="ml-2 font-semibold text-[#08A875] hover:underline">
                  Login
                </button>

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;