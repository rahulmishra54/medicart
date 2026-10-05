import React from "react";
import {
  ArrowLeft,
  Camera,
  Upload,
  Plus,
  Eye,
} from "lucide-react";

const AddProductImages = () => {
  return (
    <div className="min-h-screen bg-[#F5FAFC] p-3 sm:p-5 lg:p-7">

      <div className="max-w-5xl mx-auto">

       830 588 173
       zvcuqf3z


        {/*  PRODUCT IMAGES */}

        <div className="
          bg-white
          border border-[#E2EDF1]
          rounded-xl
          p-4 sm:p-5 lg:p-6
          mb-5
        ">

          {/* SECTION HEADER */}

          <div className="flex items-center gap-3 mb-5">

            <div className="
              w-9 h-9
              rounded-lg
              bg-[#E5F6F0]
              flex items-center justify-center
              shrink-0
            ">
              <Camera
                size={18}
                className="text-[#15966F]"
              />
            </div>

            <div>

              <h2 className="text-sm sm:text-base font-semibold text-[#17324D]">
                Product Images
              </h2>

              <p className="text-[11px] sm:text-xs text-[#64748B]">
                Upload clear images of the product.
              </p>

            </div>

          </div>


          {/* ================= UPLOAD AREA ================= */}

          <div className="
            min-h-[130px]
            sm:min-h-[150px]
            border border-dashed
            border-[#C9DCE4]
            rounded-lg
            bg-[#F8FBFC]
            flex flex-col
            items-center justify-center
            cursor-pointer
            hover:bg-[#F1F9F6]
            hover:border-[#15966F]
            transition
          ">

            <Upload
              size={30}
              className="text-[#64748B] mb-2"
            />

            <span className="text-xs sm:text-sm font-semibold text-[#17324D]">
              Click to upload images
            </span>

            <span className="text-[10px] sm:text-xs text-[#64748B] mt-1">
              or drag and drop
            </span>

            <span className="text-[10px] text-[#94A3B8] mt-2">
              JPG, PNG, WebP (Max 5MB each)
            </span>

          </div>


          {/* ================= IMAGE SLOTS ================= */}

          <div className="
            grid
            grid-cols-3
            sm:grid-cols-5
            gap-2 sm:gap-3
            mt-3
          ">

            <div className="
              aspect-square
              rounded-lg
              border border-dashed
              border-[#C9DCE4]
              bg-[#FAFCFD]
              flex items-center justify-center
              cursor-pointer
              hover:bg-[#F1F9F6]
              hover:border-[#15966F]
              transition
            ">
              <Plus
                size={21}
                className="text-[#718096]"
              />
            </div>


            <div className="
              aspect-square
              rounded-lg
              border border-dashed
              border-[#C9DCE4]
              bg-[#FAFCFD]
              flex items-center justify-center
              cursor-pointer
              hover:bg-[#F1F9F6]
              hover:border-[#15966F]
              transition
            ">
              <Plus
                size={21}
                className="text-[#718096]"
              />
            </div>


            <div className="
              aspect-square
              rounded-lg
              border border-dashed
              border-[#C9DCE4]
              bg-[#FAFCFD]
              flex items-center justify-center
              cursor-pointer
              hover:bg-[#F1F9F6]
              hover:border-[#15966F]
              transition
            ">
              <Plus
                size={21}
                className="text-[#718096]"
              />
            </div>


            <div className="
              aspect-square
              rounded-lg
              border border-dashed
              border-[#C9DCE4]
              bg-[#FAFCFD]
              flex items-center justify-center
              cursor-pointer
              hover:bg-[#F1F9F6]
              hover:border-[#15966F]
              transition
            ">
              <Plus
                size={21}
                className="text-[#718096]"
              />
            </div>


            <div className="
              aspect-square
              rounded-lg
              border border-dashed
              border-[#C9DCE4]
              bg-[#FAFCFD]
              flex items-center justify-center
              cursor-pointer
              hover:bg-[#F1F9F6]
              hover:border-[#15966F]
              transition
            ">
              <Plus
                size={21}
                className="text-[#718096]"
              />
            </div>

          </div>

        </div>


        {/* ================= PRODUCT PREVIEW ================= */}

        <div className="
          bg-white
          border border-[#E2EDF1]
          rounded-xl
          p-4 sm:p-5 lg:p-6
        ">

          {/* SECTION HEADER */}

          <div className="flex items-center gap-3 mb-5">

            <div className="
              w-9 h-9
              rounded-lg
              bg-[#EDF7FC]
              flex items-center justify-center
              shrink-0
            ">
              <Eye
                size={18}
                className="text-[#237DA8]"
              />
            </div>

            <div>

              <h2 className="text-sm sm:text-base font-semibold text-[#17324D]">
                Product Preview
              </h2>

              <p className="text-[11px] sm:text-xs text-[#64748B]">
                This is how your product will appear on the store.
              </p>

            </div>

          </div>


          {/* ================= PRODUCT CARD ================= */}

          <div className="
            border border-[#E2EDF1]
            rounded-xl
            p-3 sm:p-4
            bg-white
          ">

            <div className="
              flex
              flex-col
              sm:flex-row
              gap-4
            ">

              {/* PRODUCT IMAGE */}

              <div className="
                w-full
                sm:w-[150px]
                h-[160px]
                sm:h-[150px]
                rounded-lg
                bg-[#F6FAFC]
                flex items-center justify-center
                shrink-0
              ">

                <div className="text-center">

                  <Camera
                    size={30}
                    className="mx-auto text-[#A0B3BC] mb-2"
                  />

                  <span className="text-xs text-[#94A3B8]">
                    Product image
                  </span>

                </div>

              </div>


              {/* PRODUCT INFORMATION */}

              <div className="flex flex-col flex-1 min-w-0">

                <div className="
                  flex
                  items-start
                  justify-between
                  gap-3
                ">

                  <div>

                    <h3 className="
                      text-sm sm:text-base
                      font-semibold
                      text-[#17324D]
                    ">
                      Paracetamol 500mg
                    </h3>

                    <p className="
                      text-xs
                      text-[#64748B]
                      mt-1
                    ">
                      Crocin
                    </p>

                  </div>


                  <span className="
                    shrink-0
                    px-2.5 py-1
                    rounded-full
                    bg-[#E5F6F0]
                    text-[#15966F]
                    text-[10px]
                    font-medium
                  ">
                    In Stock
                  </span>

                </div>


                {/* CATEGORY */}

                <div className="mt-2">

                  <span className="
                    inline-flex
                    px-2 py-1
                    rounded-md
                    bg-[#EDF7FC]
                    text-[#237DA8]
                    text-[10px]
                    font-medium
                  ">
                    Tablet
                  </span>

                </div>


                {/* PRICE */}

                <div className="
                  flex
                  items-center
                  flex-wrap
                  gap-3
                  mt-3
                ">

                  <span className="
                    text-xl
                    font-bold
                    text-[#15966F]
                  ">
                    ₹50
                  </span>

                  <span className="
                    text-xs
                    text-[#94A3B8]
                    line-through
                  ">
                    ₹60
                  </span>

                  <span className="
                    px-2 py-1
                    rounded-full
                    bg-[#E5F6F0]
                    text-[#15966F]
                    text-[10px]
                    font-medium
                  ">
                    17% OFF
                  </span>

                </div>


                {/* DESCRIPTION */}

                <p className="
                  text-xs
                  text-[#718096]
                  leading-5
                  mt-2
                  line-clamp-2
                ">
                  Effective relief from fever and mild to moderate pain
                  such as headache, body ache, toothache...
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default AddProductImages;