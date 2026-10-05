import React from "react";
import {
  PackagePlus,
  ChevronDown,
  CalendarDays,
  FileText,
} from "lucide-react";

const AddProduct = () => {
  return (
    <div className="min-h-screen bg-[#F5FAFC] p-3 sm:p-5 lg:p-7">

      {/* PAGE CONTAINER */}
      <div className="max-w-6xl mx-auto">

        {/* PAGE HEADER */}
        <div className="mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-[#17324D]">
            Add New Product
          </h1>

          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            List a new medicine or healthcare product to your store.
          </p>
        </div>


        {/* MAIN FORM CARD */}
        <div className="bg-white border border-[#E2EDF1] rounded-xl shadow-sm overflow-hidden">

          {/* ================= PRODUCT INFORMATION ================= */}
          <div className="p-4 sm:p-5 lg:p-6">

            {/* SECTION HEADER */}
            <div className="flex items-center gap-3 mb-5">

              <div className="
                w-9 h-9
                rounded-lg
                bg-[#E5F6F0]
                flex
                items-center
                justify-center
                shrink-0
              ">
                <PackagePlus
                  size={19}
                  className="text-[#15966F]"
                />
              </div>

              <div>
                <h2 className="text-sm sm:text-base font-semibold text-[#17324D]">
                  Product Information
                </h2>

                <p className="text-[11px] sm:text-xs text-[#64748B]">
                  Fill in the details of the product you want to add.
                </p>
              </div>

            </div>


            {/* ================= PRODUCT NAME + BRAND ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* PRODUCT NAME */}
              <div>
                <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                  Product Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Paracetamol 500mg"
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    border
                    border-[#DCE7EC]
                    bg-white
                    text-xs
                    text-[#17324D]
                    placeholder:text-[#94A3B8]
                    outline-none
                    focus:border-[#15966F]
                    focus:ring-2
                    focus:ring-[#15966F]/10
                  "
                />
              </div>


              {/* BRAND */}
              <div>
                <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                  Brand <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. Crocin"
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    border
                    border-[#DCE7EC]
                    text-xs
                    text-[#17324D]
                    placeholder:text-[#94A3B8]
                    outline-none
                    focus:border-[#15966F]
                    focus:ring-2
                    focus:ring-[#15966F]/10
                  "
                />
              </div>


              {/* CATEGORY */}
              <div>
                <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>

                <div className="relative">
                  <select
                    className="
                      appearance-none
                      w-full
                      h-10
                      px-3
                      pr-9
                      rounded-lg
                      border
                      border-[#DCE7EC]
                      bg-white
                      text-xs
                      text-[#64748B]
                      outline-none
                      focus:border-[#15966F]
                      focus:ring-2
                      focus:ring-[#15966F]/10
                    "
                  >
                    <option>Select Category</option>
                    <option>Medicine</option>
                    <option>Healthcare</option>
                    <option>Personal Care</option>
                    <option>Medical Equipment</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-[#64748B]
                      pointer-events-none
                    "
                  />
                </div>
              </div>


              {/* SUB CATEGORY */}
              <div>
                <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                  Sub Category
                </label>

                <div className="relative">
                  <select
                    className="
                      appearance-none
                      w-full
                      h-10
                      px-3
                      pr-9
                      rounded-lg
                      border
                      border-[#DCE7EC]
                      bg-white
                      text-xs
                      text-[#64748B]
                      outline-none
                      focus:border-[#15966F]
                      focus:ring-2
                      focus:ring-[#15966F]/10
                    "
                  >
                    <option>Select Sub Category</option>
                    <option>Tablets</option>
                    <option>Capsules</option>
                    <option>Syrup</option>
                    <option>Cream</option>
                  </select>

                  <ChevronDown
                    size={16}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-[#64748B]
                      pointer-events-none
                    "
                  />
                </div>
              </div>


              {/* GENERIC NAME */}
              <div>
                <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                  Generic Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. Paracetamol"
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    border
                    border-[#DCE7EC]
                    text-xs
                    text-[#17324D]
                    placeholder:text-[#94A3B8]
                    outline-none
                    focus:border-[#15966F]
                    focus:ring-2
                    focus:ring-[#15966F]/10
                  "
                />
              </div>


              {/* MANUFACTURER */}
              <div>
                <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                  Manufacturer
                </label>

                <input
                  type="text"
                  placeholder="e.g. GSK, Sun Pharma"
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    border
                    border-[#DCE7EC]
                    text-xs
                    text-[#17324D]
                    placeholder:text-[#94A3B8]
                    outline-none
                    focus:border-[#15966F]
                    focus:ring-2
                    focus:ring-[#15966F]/10
                  "
                />
              </div>

            </div>


            {/* ================= PRICE SECTION ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">

              {/* PRICE */}
              <div>
                <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                  Price (₹) <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  placeholder="e.g. 50"
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    border
                    border-[#DCE7EC]
                    text-xs
                    outline-none
                    focus:border-[#15966F]
                    focus:ring-2
                    focus:ring-[#15966F]/10
                  "
                />
              </div>


              {/* MRP */}
              <div>
                <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                  MRP (₹)
                </label>

                <input
                  type="number"
                  placeholder="e.g. 60"
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    border
                    border-[#DCE7EC]
                    text-xs
                    outline-none
                    focus:border-[#15966F]
                    focus:ring-2
                    focus:ring-[#15966F]/10
                  "
                />
              </div>


              {/* STOCK */}
              <div>
                <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>

                <input
                  type="number"
                  placeholder="e.g. 100"
                  className="
                    w-full
                    h-10
                    px-3
                    rounded-lg
                    border
                    border-[#DCE7EC]
                    text-xs
                    outline-none
                    focus:border-[#15966F]
                    focus:ring-2
                    focus:ring-[#15966F]/10
                  "
                />
              </div>

            </div>


            {/* ================= DESCRIPTION ================= */}
            <div className="mt-4">

              <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                Description <span className="text-red-500">*</span>
              </label>

              <div className="relative">

                <textarea
                  rows="4"
                  maxLength="500"
                  placeholder="Enter product description, uses, benefits, dosage etc..."
                  className="
                    w-full
                    px-3
                    py-3
                    pb-7
                    rounded-lg
                    border
                    border-[#DCE7EC]
                    text-xs
                    text-[#17324D]
                    placeholder:text-[#94A3B8]
                    outline-none
                    resize-none
                    focus:border-[#15966F]
                    focus:ring-2
                    focus:ring-[#15966F]/10
                  "
                />

                <span className="
                  absolute
                  bottom-2
                  right-3
                  text-[10px]
                  text-[#94A3B8]
                ">
                  0/500
                </span>

              </div>

            </div>


            {/* ================= ADDITIONAL INFORMATION ================= */}
            <div className="mt-5 pt-5 border-t border-[#EEF3F5]">

              {/* SECTION HEADER */}
              <div className="flex items-center gap-3 mb-5">

                <div className="
                  w-9 h-9
                  rounded-lg
                  bg-[#EDF7FC]
                  flex
                  items-center
                  justify-center
                  shrink-0
                ">
                  <FileText
                    size={18}
                    className="text-[#237DA8]"
                  />
                </div>

                <div>
                  <h2 className="text-sm sm:text-base font-semibold text-[#17324D]">
                    Additional Information
                  </h2>
                </div>

              </div>


              {/* DOSAGE / PRESCRIPTION / EXPIRY */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                {/* DOSAGE FORM */}
                <div>

                  <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                    Dosage Form
                  </label>

                  <div className="relative">

                    <select
                      className="
                        appearance-none
                        w-full
                        h-10
                        px-3
                        pr-9
                        rounded-lg
                        border
                        border-[#DCE7EC]
                        bg-white
                        text-xs
                        text-[#64748B]
                        outline-none
                        focus:border-[#15966F]
                        focus:ring-2
                        focus:ring-[#15966F]/10
                      "
                    >
                      <option>Select Dosage Form</option>
                      <option>Tablet</option>
                      <option>Capsule</option>
                      <option>Syrup</option>
                      <option>Cream</option>
                      <option>Injection</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-[#64748B]
                        pointer-events-none
                      "
                    />

                  </div>

                </div>


                {/* PRESCRIPTION */}
                <div>

                  <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                    Prescription Required
                  </label>

                  <div className="relative">

                    <select
                      className="
                        appearance-none
                        w-full
                        h-10
                        px-3
                        pr-9
                        rounded-lg
                        border
                        border-[#DCE7EC]
                        bg-white
                        text-xs
                        text-[#64748B]
                        outline-none
                        focus:border-[#15966F]
                        focus:ring-2
                        focus:ring-[#15966F]/10
                      "
                    >
                      <option>No</option>
                      <option>Yes</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-[#64748B]
                        pointer-events-none
                      "
                    />

                  </div>

                </div>


                {/* EXPIRY DATE */}
                <div>

                  <label className="block text-xs font-medium text-[#17324D] mb-1.5">
                    Expiry Date
                  </label>

                  <div className="relative">

                    <input
                      type="text"
                      placeholder="dd/mm/yyyy"
                      className="
                        w-full
                        h-10
                        px-3
                        pr-10
                        rounded-lg
                        border
                        border-[#DCE7EC]
                        text-xs
                        text-[#17324D]
                        placeholder:text-[#94A3B8]
                        outline-none
                        focus:border-[#15966F]
                        focus:ring-2
                        focus:ring-[#15966F]/10
                      "
                    />

                    <CalendarDays
                      size={16}
                      className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-[#64748B]
                      "
                    />

                  </div>

                </div>

              </div>


              {/* ================= CHECKBOXES ================= */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">

                {/* FEATURED */}
                <label className="flex items-start gap-2 cursor-pointer">

                  <input
                    type="checkbox"
                    className="
                      mt-0.5
                      w-4
                      h-4
                      accent-[#15966F]
                    "
                  />

                  <div className="flex flex-col">

                    <span className="text-xs font-medium text-[#17324D]">
                      Featured Product
                    </span>

                    <span className="text-[10px] sm:text-xs text-[#718096] mt-0.5">
                      Show this product in featured section
                    </span>

                  </div>

                </label>


                {/* ACTIVE */}
                <label className="flex items-start gap-2 cursor-pointer">

                  <input
                    type="checkbox"
                    defaultChecked
                    className="
                      mt-0.5
                      w-4
                      h-4
                      accent-[#15966F]
                    "
                  />

                  <div className="flex flex-col">

                    <span className="text-xs font-medium text-[#17324D]">
                      Active
                    </span>

                    <span className="text-[10px] sm:text-xs text-[#718096] mt-0.5">
                      Make this product visible on store
                    </span>

                  </div>

                </label>

              </div>

            </div>

          </div>


          {/* ================= FORM ACTIONS ================= */}
          <div className="
            border-t
            border-[#EEF3F5]
            bg-[#FBFDFE]
            px-4
            sm:px-5
            lg:px-6
            py-4
            flex
            flex-col-reverse
            sm:flex-row
            sm:justify-end
            gap-3
          ">

            <button
              type="button"
              className="
                w-full
                sm:w-auto
                h-10
                px-5
                rounded-lg
                border
                border-[#DCE7EC]
                text-sm
                font-medium
                text-[#64748B]
                hover:bg-white
                transition
              "
            >
              Cancel
            </button>

            <button
              type="button"
              className="
                w-full
                sm:w-auto
                h-10
                px-6
                rounded-lg
                bg-[#15966F]
                text-white
                text-sm
                font-medium
                hover:bg-[#117F5E]
                transition
                shadow-sm
              "
            >
              Add Product
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddProduct;