
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  ShoppingCart,
  Eye,
  Package,
} from "lucide-react";
import api from "../../api/api.js";

const FeatureMedicines = ({ medicines = [], isLoading = false, error = "" }) => {
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState({});
  const user = useSelector((state) => state.auth.user);
  
  const updateQuantity = (medicineId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [medicineId]: Math.max(1, (prev[medicineId] || 1) + change),
    }));
  };

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
        <div className="mb-5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#08A875]">
            Our Collection
          </p>

          <h2 className="text-2xl font-bold text-[#0B3154]">
            Featured Medicines
          </h2>

          <p className="mt-1 text-sm text-[#718096]">
            Healthcare essentials for your everyday needs.
          </p>
        </div>

        {isLoading && <p className="text-sm text-slate-500">Loading medicines...</p>}
        {error && <p role="alert" className="text-sm text-red-700">Unable to load medicines: {error}</p>}
        {!isLoading && !error && medicines.length === 0 && <p className="text-sm text-slate-500">No medicines are available right now.</p>}
        {!isLoading && !error && medicines.length > 0 && (
          <div className="grid min-w-0 grid-cols-1 gap-3 min-[400px]:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
            {medicines.slice(0,4).map((medicine) => {
              const quantity = quantities[medicine._id] || 1;
              const totalPrice = medicine.price * quantity;
              const discount = medicine.mrp > medicine.price
                ? Math.round(((medicine.mrp - medicine.price) / medicine.mrp) * 100)
                : 0;

              return (
                <article
                  key={medicine._id}
                  className="flex h-full min-w-0 flex-col rounded-2xl border border-[#E5EDF3] bg-white p-2.5 shadow-sm"
                >
                  <div className="relative flex h-28 items-center justify-center rounded-xl bg-[#F6FAFC] sm:h-32">
                    {discount > 0 && <span className="absolute left-2 top-2 rounded-md bg-[#08A875] px-2 py-1 text-[10px] font-bold text-white">{discount}% OFF</span>}

                    {medicine.image
                      ? <img src={medicine.image} alt={medicine.name} className="h-full w-full rounded-xl object-contain" />
                      : <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#DDF7F0]"><Package size={32} className="text-[#08A875]" /></div>}
                  </div>

                  <div className="flex flex-1 flex-col pt-3">
                    <h3 className="min-h-10 wrap-break-word text-sm font-bold leading-5 text-[#0B3154]">
                      {medicine.name}
                    </h3>

                    <p className="mt-1 min-w-0 wrap-break-word text-xs text-[#718096]">
                      {medicine.pharmacy?.name || "Pharmacy"}
                    </p>

                    <div className="mt-3 border-t border-[#E5EDF3] pt-2">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-xl font-extrabold text-[#0B3154]">
                          ₹{medicine.price}
                        </span>

                        {medicine.mrp > medicine.price && (
                          <span className="text-xs text-[#718096] line-through">
                            ₹{medicine.mrp}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-[#718096]">
                        {medicine.stockQuantity > 0 ? `${medicine.stockQuantity} in stock` : "Out of stock"}
                      </p>

                      <span className="mt-2 inline-flex items-center gap-1 rounded-md bg-[#F0F8FF] px-2 py-1 text-[10px] font-medium text-[#0B3154]">
                        {medicine.prescriptionRequired ? "Prescription required" : "No prescription required"}
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
                        disabled={loading[medicine._id] || medicine.stockQuantity <= 0}
                        className="flex h-9 min-w-0 items-center justify-center gap-1 rounded-lg bg-[#08A875] px-2 text-xs font-semibold text-white disabled:opacity-60"
                      >
                        <ShoppingCart size={14} />
                        {loading[medicine._id] ? "Adding..." : "Add to Cart"}
                      </button>

                      <button
                        type="button"
                        className="flex h-9 items-center justify-center gap-1 whitespace-nowrap rounded-lg border border-[#E5EDF3] px-2 text-xs font-semibold text-[#0B3154]"
                      >
                        <Eye size={14} />
                        View
                      </button>
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

export default FeatureMedicines;
