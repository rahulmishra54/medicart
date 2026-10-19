
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Heart,
  ShoppingCart,
  Eye,
  Star,
  Package,
  ShieldCheck,
} from "lucide-react";
import api from "../../api/api.js";

const Medicines = ({ medicines }) => {
  console.log("Medicines component received medicines:", medicines);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState({});
  const user = useSelector((state) => state.auth.user);
  
  const updateQuantity = (medicineId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [medicineId]: Math.max(1, (prev[medicineId] || 1) + change),
    }));
  };


  const addToWishList = async (medicineId)=>{
    try{
    if(!user){
      window.alert("Please sign in to add items to your wishlist.");
      return;
    }
    console.log()

    const response = await api.post("/wishlist/items",{medicineId});
    console.log(response.data)
    }catch(error){
      console.log(error.response?.data?.message)
    }

  }
  const addToCart = async (medicineId) => {
    if (!user) {
      window.alert("Please sign in to add items to your cart.");
      return;
    }

    const quantity = quantities[medicineId] || 1;

    try {
      setLoading((prev) => ({ ...prev, [medicineId]: true }));

      const response = await api.post("/cart/items", {
        medicineId,
        quantity,
      });

      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    } finally {
      setLoading((prev) => ({ ...prev, [medicineId]: false }));
    }
  };

  return (
    <section className="bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        

        {medicines && medicines.length > 0 && (
          <div className="grid min-w-0 grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {medicines.map((medicine) => {
              const quantity = quantities[medicine._id] || 1;
              const totalPrice = medicine.price * quantity;

              return (
                <article
                  key={medicine._id}
                  className="flex h-full min-w-0 flex-col rounded-2xl border border-[#E5EDF3] bg-white p-2.5 shadow-sm"
                >
                  <div className="relative flex h-28 items-center justify-center rounded-xl bg-[#F6FAFC] sm:h-32">
                    <span className="absolute left-2 top-2 rounded-md bg-[#08A875] px-2 py-1 text-[10px] font-bold text-white">
                      13% OFF
                    </span>

                    <button
                      type="button"
                      aria-label="Add to favourites"
                      className="absolute right-2 top-2 rounded-full bg-white p-1.5 text-[#718096]"
                    onClick={()=>addToWishList(medicine._id)}
                    >
                      <Heart size={16} />
                    </button>

                    <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#DDF7F0]">
                      <Package size={32} className="text-[#08A875]" />
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col pt-3">
                    <h3 className="min-h-10 wrap-break-word text-sm font-bold leading-5 text-[#0B3154]">
                      {medicine.name}
                    </h3>

                    <p className="mt-1 min-w-0 wrap-break-word text-xs text-[#718096]">
                      {medicine.pharmacy?.name || "Pharmacy"}
                    </p>

                    <div className="mt-2 flex items-center gap-1 text-xs">
                      <Star size={13} fill="#F5B942" stroke="#F5B942" />
                      <span className="font-semibold text-[#0B3154]">
                        4.6
                      </span>
                      <span className="text-[#718096]">(120)</span>
                    </div>

                    <div className="mt-3 border-t border-[#E5EDF3] pt-2">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-xl font-extrabold text-[#0B3154]">
                          ₹{medicine.price}
                        </span>

                        {medicine.originalPrice && (
                          <span className="text-xs text-[#718096] line-through">
                            ₹{medicine.originalPrice}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-[#718096]">
                        {medicine.packSize || "Standard pack"}
                      </p>

                      <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#F0F8FF] px-2 py-1 text-[10px] font-medium text-[#0B3154]">
                        <ShieldCheck size={12} />
                        OTC Product
                      </span>
                    </div>

                    {/* Quantity selector */}
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-xs font-medium text-[#0B3154]">
                        Quantity
                      </span>

                      <div className="flex items-center rounded-lg border border-[#E5EDF3]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(medicine._id, -1)}
                          disabled={quantity === 1}
                          className="px-2.5 py-1.5 text-[#08A875] disabled:opacity-40"
                        >
                          −
                        </button>

                        <span className="min-w-7 text-center text-sm font-semibold text-[#0B3154]">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => updateQuantity(medicine._id, 1)}
                          className="px-2.5 py-1.5 text-[#08A875]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Total price */}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs text-[#718096]">
                        Total Price
                      </span>

                      <span className="text-base font-bold text-[#0B3154]">
                        ₹{totalPrice}
                      </span>
                    </div>

                    <div className="mt-auto grid grid-cols-1 gap-2 pt-3 min-[400px]:grid-cols-[minmax(0,1fr)_auto]">
                      <button
                        type="button"
                        onClick={() => addToCart(medicine._id)}
                        disabled={loading[medicine._id]}
                        className="flex h-9 min-w-0 items-center justify-center gap-1 rounded-lg bg-[#08A875] px-2 text-xs font-semibold text-white disabled:opacity-60"
                      >
                        <ShoppingCart size={14} />
                        {loading[medicine._id] ? "Adding..." : "Add to Cart"}
                      </button>

                      <details className="relative">
                        <summary className="flex h-9 cursor-pointer list-none items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-[#E5EDF3] px-2 text-xs font-semibold text-[#0B3154]">
                          <Eye size={14} />
                          View
                        </summary>
                        <div className="absolute bottom-11 right-0 z-10 w-64 max-w-[calc(100vw-3rem)] rounded-lg border border-[#E5EDF3] bg-white p-3 text-left shadow-lg">
                          <h4 className="text-sm font-bold text-[#0B3154]">
                            {medicine.name}
                          </h4>
                          {medicine.description && (
                            <p className="mt-2 text-xs leading-5 text-[#718096]">
                              {medicine.description}
                            </p>
                          )}
                          <dl className="mt-3 grid gap-2 text-xs">
                            <div>
                              <dt className="font-semibold text-[#0B3154]">Brand</dt>
                              <dd className="text-[#718096]">{medicine.brand || "Not specified"}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-[#0B3154]">Category</dt>
                              <dd className="text-[#718096]">{medicine.category?.name || "Not specified"}</dd>
                            </div>
                            <div>
                              <dt className="font-semibold text-[#0B3154]">Dosage form</dt>
                              <dd className="text-[#718096]">{medicine.dosageForm || "Not specified"}</dd>
                            </div>
                          </dl>
                        </div>
                      </details>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Medicines;
