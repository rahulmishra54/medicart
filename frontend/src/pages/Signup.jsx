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
  ArrowRight,
  Store,
} from "lucide-react";

import logo from "../assets/logo.png";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../api/api.js";
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
   
  })
 
  
  const handleSignup = async(e)=>{
    e.preventDefault();
    try{
      const response = await api.post("/auth/register",formData);
      console.log(response)
      if(response.data.success){
        console.log("User registered successfully")
        navigate("/")
      }
    }
    catch(error){
      
      console.log("Error registering user:",error.response.data.message);
    }
  }

  return (
    <div className="h-screen w-full overflow-hidden bg-gradient-to-br from-[#F4FBFC] via-white to-[#ECF9F6]">

      <div className="grid h-screen w-full lg:grid-cols-[45%_55%]">

        {/* 
            LEFT SIDE
       */}
        <div className="hidden h-full min-h-0 overflow-hidden px-10 lg:flex lg:items-center lg:justify-center lg:px-14 xl:px-16">

          <div className="w-full max-w-[620px]">

            {/* Logo */}
              <div className="mb-6">

              <img
                src={logo}
                alt="MediCart"
                className="w-44 xl:w-52 h-auto object-contain object-left"
              />

            </div>


            {/* Heading */}
            <h2 className="text-4xl font-extrabold leading-tight tracking-tight text-[#0B3154] xl:text-5xl">

              Your Health,
              <br />

              Our{" "}

              <span className="text-[#08A875]">
                Priority
              </span>

            </h2>


            {/* Description */}
            <p className="mt-4 max-w-lg text-base leading-7 text-[#667B98] xl:text-lg">

              Genuine medicines, trusted pharmacies and expert support — delivered to your doorstep.

            </p>


            {/* Features */}
            <div className="mt-6 grid max-w-[610px] grid-cols-2 gap-3">

              {/* 1 */}
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#DDEBEF] bg-white/70 p-3">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DDF7F0]">

                  <ShieldCheck
                    size={22}
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
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#DDEBEF] bg-white/70 p-3">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DDF7F0]">

                  <Truck
                    size={22}
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
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#DDEBEF] bg-white/70 p-3">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DDF7F0]">

                  <CreditCard
                    size={22}
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
              <div className="flex min-w-0 items-center gap-3 rounded-xl border border-[#DDEBEF] bg-white/70 p-3">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DDF7F0]">

                  <Headphones
                    size={22}
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


        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}
        <div className="h-screen min-h-0 w-full overflow-x-hidden overflow-y-auto p-3 sm:p-4 lg:p-5">

          {/* WHITE CARD */}
          <div
            className="
              w-full
              max-w-[760px]
              mx-auto
              min-h-[calc(100vh-1.5rem)]
              bg-white
              rounded-[28px]
              border
              border-white
              shadow-[0_20px_60px_rgba(11,49,84,0.12)]
              overflow-hidden
              flex
              flex-col
            "
          >

            {/* =================================================
                FIXED HEADER
            ================================================== */}
            <div className="shrink-0 px-6 sm:px-8 pt-5 pb-3">

              {/* Logo */}
              <div className="flex justify-center">

                <img
                  src={logo}
                  alt="MediCart"
                  className="w-[150px] sm:w-[170px] h-auto object-contain"
                />

              </div>


              {/* Heading */}
              <div className="mt-2 text-center">

                <h2 className="text-[26px] sm:text-[30px] font-bold text-[#0B3154]">

                  Create Your Account

                </h2>

                <p className="mt-1 text-sm leading-5 text-[#667B98]">

                  Join MediCart and start your healthcare journey today.

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
                pb-6
              "
            >

              {/* =================================================
                  CUSTOMER / PARTNER
              ================================================== */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">

                {/* CUSTOMER */}
                <button
                  type="button"
                  className="
                    relative
                    rounded-xl
                    border-2
                    border-[#08A875]
                    bg-[#F3FBF8]
                    p-3
                    text-left
                    transition
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DDF7F0]">

                      <User
                        size={21}
                        className="text-[#08A875]"
                      />

                    </div>

                    <div className="min-w-0 pr-7">

                      <p className="text-sm font-bold text-[#0B3154]" >
                        I am a Customer
                      </p>

                      <p className="mt-0.5 text-[11px] leading-4 text-[#667B98]">
                        Shop medicines for you and your family
                      </p>

                    </div>

                  </div>


                  {/* Selected */}
                  <div
                    className="
                      absolute
                      right-2
                      top-2
                      flex
                      h-6
                      w-6
                      items-center
                      justify-center
                      rounded-full
                      bg-[#08A875]
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    ✓
                  </div>

                </button>


                {/* PARTNER */}
                <button onClick={()=>{navigate("/pharmacy/register");}}
                  type="button"
                  className="
                    rounded-xl
                    border
                    border-[#D7E1EA]
                    bg-white
                    p-3
                    text-left
                    transition
                    hover:border-[#08A875]
                  "
                >

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F1F5F8]">

                      <Store
                        size={21}
                        className="text-[#7185A0]"
                      />

                    </div>

                    <div className="min-w-0">

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


              {/* =================================================
                  FORM
              ================================================== */}
              <form >

                {/* Full Name */}
                <div>

                  <label className="mb-1 block text-sm font-semibold text-[#0B3154]">
                    Full Name
                  </label>

                  <div className="flex h-11 items-center rounded-xl border border-[#D7E1EA] px-3 transition focus-within:border-[#08A875] focus-within:ring-2 focus-within:ring-[#DDF7F0]">

                    <User
                      size={18}
                      className="shrink-0 text-[#7185A0]"
                    />

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-[#8191A8]"
                      onChange={(e)=>{setFormData({...formData,name:e.target.value})}}
                    />

                  </div>

                </div>


                {/* Email */}
                <div className="mt-3">

                  <label className="mb-1 block text-sm font-semibold text-[#0B3154]">
                    Email or Phone Number
                  </label>

                  <div className="flex h-11 items-center rounded-xl border border-[#D7E1EA] px-3 transition focus-within:border-[#08A875] focus-within:ring-2 focus-within:ring-[#DDF7F0]">

                    <Mail
                      size={18}
                      className="shrink-0 text-[#7185A0]"
                    />

                    <input
                      type="text"
                      placeholder="Enter your email or phone number"
                      className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-[#8191A8]"
                      onChange={(e)=>{setFormData({...formData,email:e.target.value})}}
                    />

                  </div>

                </div>


                {/* Password */}
                <div className="mt-3">

                  <label className="mb-1 block text-sm font-semibold text-[#0B3154]">
                    Password
                  </label>

                  <div className="flex h-11 items-center rounded-xl border border-[#D7E1EA] px-3 transition focus-within:border-[#08A875] focus-within:ring-2 focus-within:ring-[#DDF7F0]">

                    <Lock
                      size={18}
                      className="shrink-0 text-[#7185A0]"
                    />

                    <input
                      type="password"
                      placeholder="Create a password"
                      className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-[#8191A8]"
                      onChange={(e)=>{setFormData({...formData,password:e.target.value})}}
                    />

                    

                  </div>

                </div>


                {/* Confirm Password */}
                <div className="mt-3">

                  <label className="mb-1 block text-sm font-semibold text-[#0B3154]">
                    Confirm Password
                  </label>

                  <div className="flex h-11 items-center rounded-xl border border-[#D7E1EA] px-3 transition focus-within:border-[#08A875] focus-within:ring-2 focus-within:ring-[#DDF7F0]">

                    <Lock
                      size={18}
                      className="shrink-0 text-[#7185A0]"
                    />

                    <input
                      type="password"
                      placeholder="Confirm your password"
                      className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-[#8191A8]"
                      onChange={(e)=>{setFormData({...formData,confirmPassword:e.target.value})}}
                    />

                    

                  </div>

                </div>


                {/* Terms */}
                <div className="mt-3 flex items-start gap-2">

                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#08A875]"
                  />

                  <p className="text-[11px] leading-5 text-[#667B98]">

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
                  type="button"
                  className="
                    mt-4
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    gap-3
                    rounded-xl
                    bg-[#08A875]
                    text-sm
                    font-semibold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#078F65]
                  "
                 onClick={handleSignup}
                >

                  Create Account

                  <ArrowRight size={19} />

                </button>

              </form>


              {/* Login */}
              <div className="mt-4 border-t border-[#E1E8ED] pt-3 text-center">

                <p className="text-sm text-[#667B98]">

                  Already have an account?

                  <button
                  onClick={()=>{navigate("/login");}}
                    type="button"
                    className="ml-2 font-semibold text-[#08A875] hover:underline"
                  >
                    Login
                  </button>

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;