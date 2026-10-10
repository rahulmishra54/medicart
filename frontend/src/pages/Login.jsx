import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Truck,
  CreditCard,
  Headphones,
  UserRound,
  Store,
} from "lucide-react";
import logo from "../assets/logo.png";
import {useDispatch} from "react-redux";
import {login} from "../redux/authSlice.js";
import api from "../api/api.js";
// =====================================================
// LEFT SIDE BENEFITS
// =====================================================

const benefits = [
  {
    icon: ShieldCheck,
    title: "100% Genuine",
    text: "Medicines",
  },
  {
    icon: Truck,
    title: "Fast & Reliable",
    text: "Delivery",
  },
  {
    icon: CreditCard,
    title: "Secure",
    text: "Payments",
  },
  {
    icon: Headphones,
    title: "24/7",
    text: "Customer Support",
  },
];

// =====================================================
// INPUT STYLES
// =====================================================

const fieldClass =
  "flex items-center gap-3 h-11 px-4 rounded-xl border border-[#D7E1EA] bg-white text-[#667B98] transition focus-within:border-[#08A875] focus-within:ring-2 focus-within:ring-[#DDF7F0]";

const inputClass =
  "flex-1 min-w-0 h-full bg-transparent outline-none text-sm text-[#0B3154] placeholder:text-[#8A9BB2]";

// =====================================================
// LOGIN COMPONENT
// =====================================================

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("customer");

  // =====================================================
  // LOGIN SUBMIT
  // =====================================================

  const handleSubmit = async(e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const loginData = {

      identifier: formData.get("identifier"),
      password: formData.get("password"),
      accountType: accountType,
      remember: formData.get("remember"),
    };
    console.log(accountType);
    console.log(loginData);

    try{
      if(accountType === "customer"){
      const response = await api.post("/auth/login",loginData)
      dispatch(login(response.data));
      if(response.data.user.role==="admin"){
        navigate("/admin/Category")
      }
      console.log(response.data);
      
      }else{
        const response = await api.post("/auth/pharmacists/login",loginData)
        dispatch(login(response.data));
       

        if(response.data.user.status === "pending"){
          navigate("/pharmacist/registration-submitted");
        }
        else if(response.data.user.status ==="rejected"){
          alert("Your pharmacist account has been rejected. Please contact support for more information.");
        }
        else{
          navigate("/pharmacist");
        }
      }
    }
    catch(error){
      console.log(error.response.data.message);

    }


    

    
  };
  

  return (
    <div className="h-screen w-full overflow-hidden bg-[#F2FAF9] flex">

      {/* =====================================================
          LEFT SIDE
      ===================================================== */}

      <section
        className="
          hidden
          lg:flex
          lg:w-1/2
          h-screen
          shrink-0
          flex-col
          justify-center
          px-10
          xl:px-14
          2xl:px-16
        "
      >
        {/* LOGO */}

        <img
          src={logo}
          alt="MediCart"
          className="
            w-36
            xl:w-40
            h-auto
            object-contain
            mb-6
          "
        />

        {/* HEADING */}

        <h1
          className="
            text-4xl
            xl:text-5xl
            font-bold
            leading-tight
            tracking-tight
            text-[#0B3154]
          "
        >
          Your Health,
          <br />
          Our <span className="text-[#08A875]">Priority</span>
        </h1>

        {/* DESCRIPTION */}

        <p
          className="
            mt-4
            max-w-lg
            text-base
            xl:text-lg
            leading-7
            text-[#667B98]
          "
        >
          Genuine medicines, trusted pharmacies and expert support — delivered to your doorstep.
        </p>

        {/* BENEFITS */}

        <div
          className="
            mt-6
            grid
            grid-cols-2
            gap-3
            max-w-xl
          "
        >
          {benefits.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="flex min-w-0 items-center gap-3 rounded-xl border border-[#DDEBEF] bg-white/70 p-3"
            >
              <div
                className="
                  w-12
                  h-12
                  rounded-full
                  bg-[#DDF7F0]
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Icon
                  size={21}
                  strokeWidth={2}
                  className="text-[#08A875]"
                />
              </div>

              <div className="min-w-0 leading-5">
                <p
                  className="
                    text-sm
                    xl:text-base
                    font-bold
                    text-[#0B3154]
                  "
                >
                  {title}
                </p>

                <p
                  className="
                    text-sm
                    xl:text-base
                    text-[#667B98]
                  "
                >
                  {text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================
          RIGHT SIDE
      ===================================================== */}

      <main
        className="
          w-full
          lg:w-1/2
          h-screen
          min-h-0
          overflow-x-hidden
          overflow-y-auto
          overscroll-contain
          flex
          items-center
          justify-center
          px-5
          sm:px-7
          xl:px-10
          py-10
          lg:py-12
          xl:py-14
        "
      >
        {/* =================================================
            LOGIN CARD
        ================================================= */}

        <div
          className="
            w-full
            max-w-[550px]
            bg-white
            rounded-[28px]
            border
            border-[#E3EEF0]
            shadow-[0_8px_30px_rgba(11,49,84,0.06)]
            px-5
            sm:px-6
            xl:px-7
            py-3
            sm:py-4
          "
        >
          {/* =================================================
              LOGO + HEADER
          ================================================= */}

          <div className="text-center">
            <img
              src={logo}
              alt="MediCart"
              className="
                w-24
                sm:w-28
                h-auto
                object-contain
                mx-auto
              "
            />

            <h2
              className="
                mt-1.5
                text-2xl
                sm:text-3xl
                font-bold
                text-[#0B3154]
              "
            >
              Welcome Back
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-[#667B98]
              "
            >
              Login to your MediCart account and continue your healthcare
              journey.
            </p>
          </div>

          {/* =================================================
              CUSTOMER / PHARMACIST
          ================================================= */}

          <div className="mt-3 grid grid-cols-2 gap-3">

            {/* CUSTOMER */}

            <button
              type="button"
              onClick={() => setAccountType("customer")}
              className={`
                relative
                flex
                items-center
                gap-3
                h-[68px]
                rounded-xl
                border
                px-3
                text-left
                transition
                ${
                  accountType === "customer"
                    ? "border-[#08A875] bg-[#F2FBF8]"
                    : "border-[#D7E1EA] bg-white hover:border-[#B8C8D8]"
                }
              `}
            >
              <div
                className={`
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center
                  shrink-0
                  ${
                    accountType === "customer"
                      ? "bg-[#DDF7F0]"
                      : "bg-[#F1F4F7]"
                  }
                `}
              >
                <UserRound
                  size={19}
                  className={
                    accountType === "customer"
                      ? "text-[#08A875]"
                      : "text-[#7186A1]"
                  }
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-[#0B3154]">
                  Customer
                </p>

                <p className="text-xs text-[#667B98]">
                  Shop medicines
                </p>
              </div>

              {accountType === "customer" && (
                <div
                  className="
                    absolute
                    top-2
                    right-2
                    w-5
                    h-5
                    rounded-full
                    bg-[#08A875]
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xs
                    font-bold
                  "
                >
                  ✓
                </div>
              )}
            </button>

            {/* PHARMACIST */}

            <button
              type="button"
              onClick={() => setAccountType("pharmacist")}
              className={`
                relative
                flex
                items-center
                gap-3
                h-[68px]
                rounded-xl
                border
                px-3
                text-left
                transition
                ${
                  accountType === "pharmacist"
                    ? "border-[#08A875] bg-[#F2FBF8]"
                    : "border-[#D7E1EA] bg-white hover:border-[#B8C8D8]"
                }
              `}
            >
              <div
                className={`
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center
                  shrink-0
                  ${
                    accountType === "pharmacist"
                      ? "bg-[#DDF7F0]"
                      : "bg-[#F1F4F7]"
                  }
                `}
              >
                <Store
                  size={19}
                  className={
                    accountType === "pharmacist"
                      ? "text-[#08A875]"
                      : "text-[#7186A1]"
                  }
                />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-bold text-[#0B3154]">
                  Pharmacist
                </p>

                <p className="text-xs text-[#667B98]">
                  Manage pharmacy
                </p>
              </div>

              {accountType === "pharmacist" && (
                <div
                  className="
                    absolute
                    top-2
                    right-2
                    w-5
                    h-5
                    rounded-full
                    bg-[#08A875]
                    text-white
                    flex
                    items-center
                    justify-center
                    text-xs
                    font-bold
                  "
                >
                  ✓
                </div>
              )}
            </button>
          </div>

          {/* =================================================
              LOGIN / CREATE ACCOUNT
          ================================================= */}

          <div
            className="
              mt-2
              grid
              grid-cols-2
              gap-1
              p-1
              rounded-xl
              bg-[#F0F4F8]
            "
          >
            <button
              type="button"
              className="
                h-9
                rounded-lg
                bg-[#08A875]
                text-white
                text-sm
                font-semibold
              "
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="
                h-9
                rounded-lg
                text-[#0B3154]
                text-sm
                font-semibold
                hover:bg-slate-200
                transition
              "
            >
              Create Account
            </button>
          </div>

          {/* =================================================
              LOGIN FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="mt-2.5 flex flex-col gap-2"
          >
            {/* EMAIL / PHONE */}

            <div>
              <label
                htmlFor="identifier"
                className="
                  block
                  mb-1
                  text-sm
                  font-semibold
                  text-[#0B3154]
                "
              >
                Email or Phone Number
              </label>

              <div className={fieldClass}>
                <Mail
                  size={18}
                  className="shrink-0"
                />

                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  required
                  autoComplete="username"
                  placeholder="Enter your email or phone number"
                  className={inputClass}
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label
                htmlFor="password"
                className="
                  block
                  mb-1
                  text-sm
                  font-semibold
                  text-[#0B3154]
                "
              >
                Password
              </label>

              <div className={fieldClass}>
                <Lock
                  size={18}
                  className="shrink-0"
                />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={inputClass}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    shrink-0
                    text-[#7186A1]
                    hover:text-[#0B3154]
                  "
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* REMEMBER / FORGOT */}

            <div
              className="
                flex
                items-center
                justify-between
                text-sm
                pt-0.5
              "
            >
              <label
                htmlFor="remember"
                className="
                  flex
                  items-center
                  gap-2
                  text-[#667B98]
                  cursor-pointer
                "
              >
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="w-4 h-4 accent-[#08A875]"
                />

                Remember me
              </label>

              <button
                type="button"
                className="
                  font-semibold
                  text-[#08A875]
                  hover:underline
                "
              >
                Forgot password?
              </button>
            </div>

            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="
                w-full
                h-11
                rounded-xl
                bg-[#08A875]
                hover:bg-[#078F65]
                text-white
                font-semibold
                text-base
                flex
                items-center
                justify-center
                gap-2
                transition
              "
            >
              Login
              <ArrowRight size={19} />
            </button>
          </form>

          {/* =================================================
              DIVIDER
          ================================================= */}

          <div
            className="
              my-2
              flex
              items-center
              gap-3
            "
          >
            <div className="h-px flex-1 bg-slate-200" />

            <span className="text-sm text-[#667B98]">
              Or
            </span>

            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* =================================================
              CREATE ACCOUNT
          ================================================= */}

          <p className="text-center text-sm text-[#667B98]">
            Don't have an account?{" "}

            <button
              type="button"
              onClick={() => navigate("/register")}
              className="
                font-semibold
                text-[#08A875]
                hover:underline
              "
            >
              Create Account
            </button>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Login;