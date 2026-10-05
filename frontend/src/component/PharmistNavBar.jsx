import React, { useState } from "react";
import {
  Search,
  Bell,
  ChevronDown,
  ChevronUp,
  UserRound,
  LockKeyhole,
  LogOut,
} from "lucide-react";

import logo from "../assets/logo.png";

const PharmistNavBar = () => {
  const [expand, setExpand] = useState(false);

  return (
    <header className="w-full bg-white border-b border-[#E6EEF2]">

      {/* =====================================================
          TOP NAVBAR
      ===================================================== */}
      <div className="h-[68px] px-4 sm:px-6 lg:px-8 flex items-center gap-3">

        {/* ================= LOGO ================= */}
        <div className="shrink-0">
          <img
            src={logo}
            alt="MediCart"
            className="
              w-[105px]
              sm:w-[125px]
              lg:w-[145px]
              h-auto
              object-contain
            "
          />
        </div>


        {/* ================= DESKTOP SEARCH ================= */}
        <div className="hidden lg:flex flex-1 justify-center px-8">

          <div className="relative w-full max-w-[540px]">

            <Search
              size={18}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-[#718096]
              "
            />

            <input
              type="text"
              placeholder="Search medicines, orders, customers..."
              className="
                w-full
                h-10
                pl-11
                pr-4
                rounded-xl
                bg-[#F6FAFC]
                border
                border-[#E2EDF1]
                text-sm
                text-[#17324D]
                placeholder:text-[#94A3B8]
                outline-none
                transition
                focus:bg-white
                focus:border-[#15966F]
                focus:ring-2
                focus:ring-[#15966F]/10
              "
            />

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3">

          {/* ================= NOTIFICATION ================= */}
          <button
            type="button"
            className="
              relative
              w-10
              h-10
              shrink-0
              rounded-xl
              bg-[#F6FAFC]
              border
              border-[#E2EDF1]
              flex
              items-center
              justify-center
              hover:bg-[#EAF7F3]
              transition
            "
          >

            <Bell
              size={19}
              className="text-[#17324D]"
            />

            <span
              className="
                absolute
                top-[7px]
                right-[7px]
                w-[7px]
                h-[7px]
                rounded-full
                bg-[#EF4444]
                border-2
                border-white
              "
            />

          </button>


          {/* ================= ACCOUNT ================= */}
          <div className="relative">

            <button
              type="button"
              onClick={() => setExpand(!expand)}
              className="
                flex
                items-center
                gap-2
                sm:gap-3
                rounded-xl
                p-1
                sm:px-2
                sm:py-1
                hover:bg-[#F6FAFC]
                transition
              "
            >

              {/* AVATAR */}
              <div
                className="
                  w-9
                  h-9
                  sm:w-10
                  sm:h-10
                  shrink-0
                  rounded-full
                  bg-[#E5F6F0]
                  flex
                  items-center
                  justify-center
                "
              >

                <UserRound
                  size={18}
                  className="text-[#15966F]"
                />

              </div>


              {/* STORE INFO
                  Hidden on mobile
              */}
              <div
                className="
                  hidden
                  sm:flex
                  flex-col
                  items-start
                  min-w-0
                "
              >

                <span
                  className="
                    text-sm
                    font-semibold
                    text-[#17324D]
                    whitespace-nowrap
                  "
                >
                  Sharma Medical Store
                </span>

                <span className="text-[11px] text-[#718096]">
                  Pharmacist
                </span>

              </div>


              {/* ARROW */}
              <div className="hidden sm:block">

                {expand ? (
                  <ChevronUp
                    size={17}
                    className="text-[#64748B]"
                  />
                ) : (
                  <ChevronDown
                    size={17}
                    className="text-[#64748B]"
                  />
                )}

              </div>

            </button>


            {/* =================================================
                ACCOUNT DROPDOWN
            ================================================= */}

            {expand && (
              <div
                className="
                  absolute
                  right-0
                  top-[48px]

                  w-[calc(100vw-24px)]
                  max-w-[320px]

                  sm:w-[300px]

                  bg-white
                  border
                  border-[#E2EDF1]
                  rounded-2xl

                  shadow-[0_15px_40px_rgba(23,50,77,0.15)]

                  p-2

                  z-[100]
                "
              >

                {/* ================= DROPDOWN HEADER ================= */}
                <div
                  className="
                    px-3
                    sm:px-4
                    py-3
                    border-b
                    border-[#EEF3F5]
                  "
                >

                  <p className="text-sm font-semibold text-[#17324D]">
                    Sharma Medical Store
                  </p>

                  <p className="text-xs text-[#718096] mt-1">
                    Pharmacist Account
                  </p>

                </div>


                {/* ================= PROFILE ================= */}
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    cursor-pointer
                    hover:bg-[#F6FAFC]
                    transition
                  "
                >

                  <div
                    className="
                      w-9
                      h-9
                      shrink-0
                      rounded-lg
                      bg-[#E5F6F0]
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <UserRound
                      size={18}
                      className="text-[#15966F]"
                    />

                  </div>


                  <div className="flex flex-col min-w-0">

                    <span className="text-sm font-medium text-[#17324D]">
                      My Profile
                    </span>

                    <span className="text-xs text-[#718096] truncate">
                      View and edit your information
                    </span>

                  </div>

                </div>


                {/* ================= NOTIFICATIONS ================= */}
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    cursor-pointer
                    hover:bg-[#F6FAFC]
                    transition
                  "
                >

                  <div
                    className="
                      w-9
                      h-9
                      shrink-0
                      rounded-lg
                      bg-[#EDF7FC]
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <Bell
                      size={18}
                      className="text-[#237DA8]"
                    />

                  </div>


                  <div className="flex flex-col min-w-0">

                    <span className="text-sm font-medium text-[#17324D]">
                      Notifications
                    </span>

                    <span className="text-xs text-[#718096]">
                      View your notifications
                    </span>

                  </div>

                </div>


                {/* ================= CHANGE PASSWORD ================= */}
                <div
                  className="
                    flex
                    items-center
                    gap-3
                    p-3
                    rounded-xl
                    cursor-pointer
                    hover:bg-[#F6FAFC]
                    transition
                  "
                >

                  <div
                    className="
                      w-9
                      h-9
                      shrink-0
                      rounded-lg
                      bg-[#EDF7FC]
                      flex
                      items-center
                      justify-center
                    "
                  >

                    <LockKeyhole
                      size={18}
                      className="text-[#237DA8]"
                    />

                  </div>


                  <div className="flex flex-col min-w-0">

                    <span className="text-sm font-medium text-[#17324D]">
                      Change Password
                    </span>

                    <span className="text-xs text-[#718096]">
                      Keep your account secure
                    </span>

                  </div>

                </div>


                {/* ================= LOGOUT ================= */}
                <div className="border-t border-[#EEF3F5] mt-1 pt-1">

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      p-3
                      rounded-xl
                      cursor-pointer
                      hover:bg-red-50
                      transition
                    "
                  >

                    <div
                      className="
                        w-9
                        h-9
                        shrink-0
                        rounded-lg
                        bg-red-50
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <LogOut
                        size={18}
                        className="text-red-500"
                      />

                    </div>


                    <div className="flex flex-col">

                      <span className="text-sm font-medium text-red-500">
                        Sign out
                      </span>

                      <span className="text-xs text-[#718096]">
                        Sign out from your account
                      </span>

                    </div>

                  </div>

                </div>

              </div>
            )}

          </div>

        </div>

      </div>


      {/* =====================================================
          TABLET SEARCH
          Visible between sm and lg
      ===================================================== */}
      <div className="hidden sm:flex lg:hidden px-6 pb-3">

        <div className="relative w-full">

          <Search
            size={17}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-[#718096]
            "
          />

          <input
            type="text"
            placeholder="Search medicines, orders, customers..."
            className="
              w-full
              h-10
              pl-10
              pr-4
              rounded-xl
              bg-[#F6FAFC]
              border
              border-[#E2EDF1]
              text-sm
              text-[#17324D]
              placeholder:text-[#94A3B8]
              outline-none
              focus:bg-white
              focus:border-[#15966F]
              focus:ring-2
              focus:ring-[#15966F]/10
              transition
            "
          />

        </div>

      </div>


      {/* =====================================================
          MOBILE SEARCH
          Visible below sm
      ===================================================== */}
      <div className="sm:hidden px-3 pb-3">

        <div className="relative w-full">

          <Search
            size={17}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-[#718096]
            "
          />

          <input
            type="text"
            placeholder="Search medicines, orders..."
            className="
              w-full
              h-10
              pl-10
              pr-3
              rounded-xl
              bg-[#F6FAFC]
              border
              border-[#E2EDF1]
              text-sm
              text-[#17324D]
              placeholder:text-[#94A3B8]
              outline-none
              focus:bg-white
              focus:border-[#15966F]
              focus:ring-2
              focus:ring-[#15966F]/10
              transition
            "
          />

        </div>

      </div>

    </header>
  );
};

export default PharmistNavBar;