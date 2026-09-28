import React from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronRight,
} from "lucide-react";

const AllPrescription = () => {
  return (
    <div className="w-full min-h-screen bg-[#F7FAFC] px-4 py-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">

        {/* ================= STATUS TABS ================= */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto">
          <button
            className="shrink-0 rounded-lg bg-[#15966F] px-5 py-2
                       text-sm font-semibold text-white"
          >
            All (24)
          </button>

          <button
            className="shrink-0 rounded-lg bg-white px-5 py-2
                       text-sm font-medium text-[#17324D]
                       border border-gray-100"
          >
            Pending (8)
          </button>

          <button
            className="shrink-0 rounded-lg bg-white px-5 py-2
                       text-sm font-medium text-[#17324D]
                       border border-gray-100"
          >
            Verified (12)
          </button>

          <button
            className="shrink-0 rounded-lg bg-white px-5 py-2
                       text-sm font-medium text-[#17324D]
                       border border-gray-100"
          >
            Rejected (4)
          </button>
        </div>


        {/* ================= SEARCH + FILTER ================= */}
        <div className="mt-3 flex gap-2">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={19}
              strokeWidth={2}
              className="absolute left-3 top-1/2
                         -translate-y-1/2 text-[#17324D]"
            />

            <input
              type="text"
              placeholder="Search by order ID, customer name or medicine..."
              className="h-11 w-full rounded-xl
                         border border-gray-200
                         bg-white
                         pl-10 pr-4
                         text-sm text-[#17324D]
                         placeholder:text-gray-400
                         outline-none
                         focus:border-[#15966F]
                         focus:ring-2
                         focus:ring-[#15966F]/10"
            />
          </div>

          {/* Filter */}
          <button
            className="flex h-11 shrink-0 items-center gap-2
                       rounded-xl border border-gray-200
                       bg-white px-4
                       text-sm font-semibold text-[#17324D]
                       hover:border-[#15966F]"
          >
            <SlidersHorizontal size={18} />
            <span className="hidden sm:block">Filter</span>
          </button>

        </div>


        {/* ================= PRESCRIPTION LIST ================= */}
        <div className="mt-3 overflow-y-auto rounded-xl bg-white
                        border border-gray-100">

          {/* ================= ROW 1 ================= */}
          <div className="flex items-center gap-3
                          border-b border-gray-100
                          bg-[#F0FBF7]
                          px-3 py-3">

            {/* Image */}
            <div className="h-12 w-10 shrink-0 overflow-hidden rounded-md
                            border border-gray-200 bg-white">
              <img
                src=""
                alt="Prescription"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Prescription ID */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#17324D]">
                #PR1024
              </p>

              <p className="mt-1 text-xs text-[#15966F]">
                Order: #MC1024
              </p>
            </div>

            {/* Customer */}
            <div className="hidden min-w-0 flex-1 sm:block">
              <p className="truncate text-sm font-semibold text-[#17324D]">
                Rahul Mishra
              </p>

              <p className="mt-1 text-xs text-gray-500">
                3 medicines
              </p>
            </div>

            {/* Date */}
            <div className="hidden min-w-[90px] md:block">
              <p className="text-xs text-gray-500">
                28 Sep 2026
              </p>

              <p className="mt-1 text-xs text-gray-500">
                10:24 AM
              </p>
            </div>

            {/* Status */}
            <span className="shrink-0 rounded-full bg-[#FFF4D9]
                             px-3 py-2 text-xs font-semibold
                             text-[#E99A00]">
              Pending
            </span>

            {/* View */}
            <button
              className="flex shrink-0 items-center gap-1
                         rounded-xl border border-gray-200
                         bg-white px-3 py-2
                         text-sm font-semibold text-[#17324D]"
            >
              <span className="hidden sm:block">View</span>
              <ChevronRight size={17} />
            </button>
          </div>


          {/* ================= ROW 2 ================= */}
          <div className="flex items-center gap-3
                          border-b border-gray-100
                          px-3 py-3">

            <div className="h-12 w-10 shrink-0 rounded-md
                            border border-gray-200 bg-gray-50" />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#17324D]">
                #PR1023
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Order: #MC1023
              </p>
            </div>

            <div className="hidden min-w-0 flex-1 sm:block">
              <p className="truncate text-sm font-semibold text-[#17324D]">
                Priya Sharma
              </p>
              <p className="mt-1 text-xs text-gray-500">
                2 medicines
              </p>
            </div>

            <div className="hidden min-w-[90px] md:block">
              <p className="text-xs text-gray-500">
                27 Sep 2026
              </p>
              <p className="mt-1 text-xs text-gray-500">
                08:15 PM
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-[#E5F6F0]
                             px-3 py-2 text-xs font-semibold
                             text-[#15966F]">
              Verified
            </span>

            <button
              className="flex shrink-0 items-center gap-1
                         rounded-xl border border-gray-200
                         bg-white px-3 py-2
                         text-sm font-semibold text-[#17324D]"
            >
              <span className="hidden sm:block">View</span>
              <ChevronRight size={17} />
            </button>
          </div>


          {/* ================= ROW 3 ================= */}
          <div className="flex items-center gap-3
                          border-b border-gray-100
                          px-3 py-3">

            <div className="h-12 w-10 shrink-0 rounded-md
                            border border-gray-200 bg-gray-50" />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#17324D]">
                #PR1022
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Order: #MC1022
              </p>
            </div>

            <div className="hidden min-w-0 flex-1 sm:block">
              <p className="truncate text-sm font-semibold text-[#17324D]">
                Amit Kumar
              </p>
              <p className="mt-1 text-xs text-gray-500">
                1 medicine
              </p>
            </div>

            <div className="hidden min-w-[90px] md:block">
              <p className="text-xs text-gray-500">
                27 Sep 2026
              </p>
              <p className="mt-1 text-xs text-gray-500">
                05:40 PM
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-red-50
                             px-3 py-2 text-xs font-semibold text-red-500">
              Rejected
            </span>

            <button
              className="flex shrink-0 items-center gap-1
                         rounded-xl border border-gray-200
                         bg-white px-3 py-2
                         text-sm font-semibold text-[#17324D]"
            >
              <span className="hidden sm:block">View</span>
              <ChevronRight size={17} />
            </button>
          </div>


          {/* ================= ROW 4 ================= */}
          <div className="flex items-center gap-3
                          border-b border-gray-100
                          px-3 py-3">

            <div className="h-12 w-10 shrink-0 rounded-md
                            border border-gray-200 bg-gray-50" />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#17324D]">
                #PR1021
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Order: #MC1021
              </p>
            </div>

            <div className="hidden min-w-0 flex-1 sm:block">
              <p className="truncate text-sm font-semibold text-[#17324D]">
                Neha Singh
              </p>
              <p className="mt-1 text-xs text-gray-500">
                2 medicines
              </p>
            </div>

            <div className="hidden min-w-[90px] md:block">
              <p className="text-xs text-gray-500">
                26 Sep 2026
              </p>
              <p className="mt-1 text-xs text-gray-500">
                11:20 AM
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-[#FFF4D9]
                             px-3 py-2 text-xs font-semibold
                             text-[#E99A00]">
              Pending
            </span>

            <button
              className="flex shrink-0 items-center gap-1
                         rounded-xl border border-gray-200
                         bg-white px-3 py-2
                         text-sm font-semibold text-[#17324D]"
            >
              <span className="hidden sm:block">View</span>
              <ChevronRight size={17} />
            </button>
          </div>


          {/* ================= ROW 5 ================= */}
          <div className="flex items-center gap-3
                          border-b border-gray-100
                          px-3 py-3">

            <div className="h-12 w-10 shrink-0 rounded-md
                            border border-gray-200 bg-gray-50" />

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[#17324D]">
                #PR1020
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Order: #MC1020
              </p>
            </div>

            <div className="hidden min-w-0 flex-1 sm:block">
              <p className="truncate text-sm font-semibold text-[#17324D]">
                Vikram Patel
              </p>
              <p className="mt-1 text-xs text-gray-500">
                1 medicine
              </p>
            </div>

            <div className="hidden min-w-[90px] md:block">
              <p className="text-xs text-gray-500">
                25 Sep 2026
              </p>
              <p className="mt-1 text-xs text-gray-500">
                09:10 PM
              </p>
            </div>

            <span className="shrink-0 rounded-full bg-[#E5F6F0]
                             px-3 py-2 text-xs font-semibold
                             text-[#15966F]">
              Verified
            </span>

            <button
              className="flex shrink-0 items-center gap-1
                         rounded-xl border border-gray-200
                         bg-white px-3 py-2
                         text-sm font-semibold text-[#17324D]"
            >
              <span className="hidden sm:block">View</span>
              <ChevronRight size={17} />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AllPrescription;