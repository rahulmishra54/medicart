import React from "react";
import {
  Mail,
  Lock,
  Eye,
  ArrowRight,
  Plus,
  ShieldCheck,
  Truck,
  CreditCard,
  Headphones,
} from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen w-full bg-[#f2faf9] overflow-hidden">
      
      {/* Main Layout */}
      <div className="mx-auto grid min-h-screen w-full max-w-[1500px] grid-cols-1 lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div className="hidden lg:flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">

          {/* Logo */}
          <div className="mb-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#08a875] shadow-md">
              <Plus
                size={30}
                strokeWidth={4}
                className="text-white"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold leading-none text-[#0b3154]">
                Medi<span className="text-[#08a875]">Cart</span>
              </h1>

              <p className="mt-1 text-[10px] text-[#667b98]">
                Your Health, Our Priority
              </p>
            </div>
          </div>

          {/* Heading */}
          <div>
            <h2 className="max-w-[560px] text-5xl font-extrabold leading-[1.02] tracking-tight text-[#0b3154] sm:text-6xl xl:text-7xl">
              Your
              <br />
              Health,
              <br />
              Our{" "}
              <span className="text-[#08a875]">
                Priority
              </span>
            </h2>

            <p className="mt-6 max-w-[480px] text-base leading-7 text-[#667b98] sm:text-lg">
              Genuine medicines, trusted pharmacies and
              expert support — delivered to your doorstep.
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-10 grid max-w-[600px] grid-cols-1 gap-5 sm:grid-cols-2">

            {/* Benefit 1 */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dff8f1]">
                <ShieldCheck
                  size={25}
                  className="text-[#08a875]"
                />
              </div>

              <div>
                <p className="font-bold text-[#0b3154]">
                  100% Genuine
                </p>
                <p className="text-sm text-[#667b98]">
                  Medicines
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dff8f1]">
                <Truck
                  size={25}
                  className="text-[#08a875]"
                />
              </div>

              <div>
                <p className="font-bold text-[#0b3154]">
                  Fast & Reliable
                </p>
                <p className="text-sm text-[#667b98]">
                  Delivery
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dff8f1]">
                <CreditCard
                  size={25}
                  className="text-[#08a875]"
                />
              </div>

              <div>
                <p className="font-bold text-[#0b3154]">
                  Secure
                </p>
                <p className="text-sm text-[#667b98]">
                  Payments
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#dff8f1]">
                <Headphones
                  size={25}
                  className="text-[#08a875]"
                />
              </div>

              <div>
                <p className="font-bold text-[#0b3154]">
                  24/7
                </p>
                <p className="text-sm text-[#667b98]">
                  Customer Support
                </p>
              </div>
            </div>

          </div>
        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-10 xl:px-16">

          {/* Login Card */}
          <div className="w-full max-w-[600px] rounded-[26px] border border-white bg-white p-6 shadow-[0_20px_60px_rgba(11,49,84,0.10)] sm:p-8 lg:p-9">

            {/* Logo */}
            <div className="flex justify-center">
              <div className="flex items-center gap-2">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#08a875]">
                  <Plus
                    size={27}
                    strokeWidth={4}
                    className="text-white"
                  />
                </div>

                <div>
                  <h1 className="text-[25px] font-bold leading-none text-[#0b3154]">
                    Medi<span className="text-[#08a875]">
                      Cart
                    </span>
                  </h1>

                  <p className="mt-1 text-[9px] text-[#667b98]">
                    Your Health, Our Priority
                  </p>
                </div>

              </div>
            </div>


            {/* Heading */}
            <div className="mt-7 text-center">
              <h2 className="text-3xl font-bold text-[#0b3154]">
                Welcome Back
              </h2>

              <p className="mx-auto mt-2 max-w-[350px] text-sm leading-5 text-[#667b98]">
                Login to your MediCart account and
                continue your healthcare journey.
              </p>
            </div>


            {/* Login / Create Account */}
            <div className="mt-7 grid grid-cols-2 rounded-xl bg-[#edf5f7] p-1">

              <button
                type="button"
                className="rounded-lg bg-[#08a875] py-3 text-sm font-semibold text-white shadow-sm"
              >
                Login
              </button>

              <button
                type="button"
                className="rounded-lg py-3 text-sm font-semibold text-[#0b3154]"
              >
                Create Account
              </button>

            </div>


            {/* Email */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-semibold text-[#0b3154]">
                Email or Phone Number
              </label>

              <div className="flex h-12 items-center rounded-xl border border-[#d8e3eb] px-4 transition focus-within:border-[#08a875] focus-within:ring-2 focus-within:ring-[#08a875]/10">

                <Mail
                  size={19}
                  className="shrink-0 text-[#7185a0]"
                />

                <input
                  type="text"
                  placeholder="Enter your email or phone number"
                  className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-[#8b9bb0]"
                />

              </div>
            </div>


            {/* Password */}
            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-[#0b3154]">
                Password
              </label>

              <div className="flex h-12 items-center rounded-xl border border-[#d8e3eb] px-4 transition focus-within:border-[#08a875] focus-within:ring-2 focus-within:ring-[#08a875]/10">

                <Lock
                  size={19}
                  className="shrink-0 text-[#7185a0]"
                />

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-[#8b9bb0]"
                />

                <Eye
                  size={19}
                  className="cursor-pointer text-[#7185a0]"
                />

              </div>
            </div>


            {/* Remember / Forgot */}
            <div className="mt-4 flex items-center justify-between gap-3">

              <label className="flex items-center gap-2 text-sm text-[#667b98]">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-[#08a875]"
                />

                Remember me
              </label>

              <button
                type="button"
                className="text-sm font-semibold text-[#08a875] hover:underline"
              >
                Forgot password?
              </button>

            </div>


            {/* Login Button */}
            <button
              type="button"
              className="mt-6 flex h-13 w-full items-center justify-center gap-3 rounded-xl bg-[#08a875] py-3.5 text-base font-semibold text-white shadow-md shadow-[#08a875]/20 transition hover:bg-[#078f65]"
            >
              Login
              <ArrowRight size={20} />
            </button>


            {/* Divider */}
            <div className="mt-7 flex items-center gap-3">

              <div className="h-px flex-1 bg-[#dce5eb]" />

              <span className="text-sm text-[#7185a0]">
                Or
              </span>

              <div className="h-px flex-1 bg-[#dce5eb]" />

            </div>


            {/* Create Account */}
            <p className="mt-6 text-center text-sm text-[#667b98]">
              Don't have an account?

              <button
                type="button"
                className="ml-2 font-semibold text-[#08a875] hover:underline"
              >
                Create Account
              </button>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;