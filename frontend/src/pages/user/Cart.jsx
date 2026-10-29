import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../component/user/Navbar.jsx";
import api from "../../api/api.js";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [isPrescriptionRequired, setIsPrescriptionRequired] = useState(false);
  const [prescriptionFiles, setPrescriptionFiles] = useState([]);
  const [prescriptionId, setPrescriptionId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isOrdering, setIsOrdering] = useState(false);
  const [error, setError] = useState("");

  async function fetchCartItems() {
    try {
      const response = await api.get("/cart/");
      if (!response.data.success || !Array.isArray(response.data.cartItems)) {
        throw new Error(response.data.message || "Cart data is not available.");
      }

      setCartItems(response.data.cartItems);
      setError("");

      const requiresPrescription = response.data.cartItems.some(
        (item) => item.medicine?.prescriptionRequired
      );
      setIsPrescriptionRequired(requiresPrescription);
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to load your cart.");
    } finally {
      setLoading(false);
    }
  }

  async function updateQuantity(id, quantity) {
    if (quantity < 1) return;

    try {
      const response = await api.patch(`/cart/items/${id}`, {
        quantity,
      });

      if (!response.data.success) throw new Error(response.data.message || "Unable to update item quantity.");
      setError("");
      await fetchCartItems();
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to update item quantity.");
    }
  }

  async function removeItem(id) {
    try {
      const response = await api.delete(`/cart/items/${id}`);
      if (!response.data.success) throw new Error(response.data.message || "Unable to remove item.");
      setError("");
      await fetchCartItems();
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to remove item.");
    }
  }

  const subtotal = cartItems.reduce((total, item) => {
    return (
      total +
      (Number(item.medicine?.price) || 0) *
      (Number(item.quantity) || 0)
    );
  }, 0);

  const proceedToOrder = async () => {
    try {
      setIsOrdering(true);
      setError("");
      if (!deliveryAddress.trim()) {
        setError("Please enter your delivery address.");
        return;
      }

      if (isPrescriptionRequired && !prescriptionId) {
        setError("Some items require a prescription. Upload it before placing your order.");
        return;
      }

      const response = await api.post("/orders/", {
        deliveryAddress: deliveryAddress.trim(),
        prescriptionId,
      });

      if (response.data.success) {
        setCartItems([]);
        navigate("/orders");
      } else {
        throw new Error(response.data.message || "Unable to place your order.");
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to place your order.");
    } finally {
      setIsOrdering(false);
    }
  };



  const uploadPrescription = async () => {
    try {
      setIsUploading(true);
      setError("");
      if (prescriptionFiles.length === 0) {
        setError("Select at least one prescription file to upload.");
        return;
      }

      const formData = new FormData();

      prescriptionFiles.forEach((file) => {
        formData.append("prescription", file);
      });

      const response = await api.post(
        "/prescriptions/",
        formData
      );

      if (response.data.success) {
        setPrescriptionId(response.data.prescription._id);
        setPrescriptionFiles([]);
      } else {
        throw new Error(response.data.message || "Unable to upload your prescription.");
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message || "Unable to upload your prescription.");
    } finally {
      setIsUploading(false);
    }
  };


  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F5F9FC] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Page Heading */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#0B3154] sm:text-4xl">
                Your Cart
              </h1>

              <p className="mt-2 text-sm text-[#718096] sm:text-base">
                Review your items and proceed to checkout.
              </p>
            </div>

            <span className="rounded-full bg-[#DDF7F0] px-4 py-2 text-sm font-semibold text-[#07865F]">
              {cartItems.length}{" "}
              {cartItems.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">

            {/* LEFT COLUMN */}
            <div className="min-w-0 space-y-5">

              {/* Shopping Cart */}
              <section className="overflow-hidden rounded-2xl border border-[#E5EDF3] bg-white shadow-sm">

                <div className="border-b border-[#E5EDF3] px-5 py-5 sm:px-6">
                  <h2 className="text-xl font-bold text-[#0B3154]">
                    Shopping Cart
                  </h2>

                  <p className="mt-1 text-sm text-[#718096]">
                    Your selected healthcare essentials
                  </p>
                </div>

                {loading ? (
                  <p className="p-8 text-center text-sm text-slate-500">Loading your cart...</p>
                ) : error && cartItems.length === 0 ? (
                  <div role="alert" className="p-8 text-center text-sm text-red-700">
                    Unable to load your cart: {error}
                    <button type="button" onClick={fetchCartItems} className="ml-2 font-semibold underline">Try again</button>
                  </div>
                ) : cartItems.length > 0 ? (
                  <div className="p-4 sm:p-6">

                    {cartItems.map((item) => (
                      <article
                        key={item._id}
                        className="mb-4 rounded-xl border border-[#E5EDF3] p-4 transition hover:border-[#B9E9D9] sm:p-5"
                      >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-[112px_minmax(0,1fr)]">

                          {/* Medicine Image */}
                          <div className="flex h-28 w-full items-center justify-center rounded-xl bg-[#F4FAF8] p-3 sm:w-28">
                            {item.medicine?.image && (
                              <img
                                src={item.medicine.image}
                                alt={item.medicine.name}
                                className="h-full w-full object-contain"
                              />
                            )}
                          </div>

                          {/* Medicine Details */}
                          <div className="min-w-0">

                            <div className="flex flex-wrap items-start justify-between gap-3">

                              <div className="min-w-0 flex-1">

                                {item.medicine?.category?.name && (
                                  <span className="inline-flex rounded-md bg-[#DDF7F0] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-[#07865F]">
                                    {item.medicine.category.name}
                                  </span>
                                )}

                                <h3 className="mt-2 break-words text-base font-bold leading-6 text-[#0B3154] sm:text-lg">
                                  {item.medicine?.name}
                                </h3>

                                {item.medicine?.description && (
                                  <p className="mt-1 text-sm leading-5 text-[#718096]">
                                    {item.medicine.description}
                                  </p>
                                )}
                              </div>

                              <p className="text-lg font-extrabold text-[#0B3154]">
                                ₹
                                {Number(
                                  item.medicine?.price || 0
                                ).toFixed(2)}
                              </p>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">

                              {item.medicine?.prescriptionRequired ? (
                                <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600">
                                  <span>▤</span>
                                  Prescription Required
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                                  <span>✓</span>
                                  No Prescription Required
                                </span>
                              )}

                              {/* Quantity */}
                              <div className="flex items-center overflow-hidden rounded-lg border border-[#E5EDF3]">

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item._id,
                                      item.quantity - 1
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                  className="px-3 py-2 text-lg text-[#08A875] transition hover:bg-[#DDF7F0] disabled:opacity-40"
                                >
                                  −
                                </button>

                                <span className="min-w-11 border-x border-[#E5EDF3] px-3 py-2 text-center text-sm font-bold text-[#0B3154]">
                                  {item.quantity}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(
                                      item._id,
                                      item.quantity + 1
                                    )
                                  }
                                  className="px-3 py-2 text-lg text-[#08A875] transition hover:bg-[#DDF7F0]"
                                >
                                  +
                                </button>

                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#F0F4F7] pt-3">

                              <p className="text-sm text-[#718096]">
                                Item total{" "}
                                <span className="font-bold text-[#0B3154]">
                                  ₹
                                  {(
                                    (Number(item.medicine?.price) || 0) *
                                    (Number(item.quantity) || 0)
                                  ).toFixed(2)}
                                </span>
                              </p>

                              <button
                                type="button"
                                onClick={() => removeItem(item._id)}
                                className="text-sm font-semibold text-rose-500 transition hover:text-rose-700"
                              >
                                Remove item
                              </button>

                            </div>
                          </div>
                        </div>
                      </article>
                    ))}

                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-[#08A875] hover:text-[#067D59]"
                    >
                      <span>←</span>
                      Continue Shopping
                    </button>

                  </div>
                ) : (
                  <div className="px-4 py-14 text-center sm:px-6">

                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#DDF7F0]">
                      <span className="text-3xl text-[#08A875]">
                        🛒
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-[#0B3154]">
                      Your cart is empty
                    </h3>

                    <p className="mt-2 text-sm text-[#718096]">
                      Add medicines to your cart to see them here.
                    </p>

                    <button
                      type="button"
                      onClick={() => window.history.back()}
                      className="mt-5 rounded-xl bg-[#08A875] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#07966A]"
                    >
                      Continue Shopping
                    </button>

                  </div>
                )}

              </section>

              {/* Prescription Upload */}
              {isPrescriptionRequired && (
                <section className="rounded-2xl border border-rose-200 bg-white p-4 shadow-sm sm:p-6">

                  {/* Header */}
                  <div className="flex flex-wrap items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EAF4FF] text-xl text-[#0B3154]">
                      ▤
                    </div>

                    <div className="min-w-0 flex-1">
                      <h2 className="text-lg font-bold text-[#0B3154]">
                        Upload Prescription
                      </h2>

                      <p className="mt-1 text-sm text-[#718096]">
                        Upload a clear prescription for the required medicine.
                      </p>
                    </div>

                    <span className="rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-600">
                      Required
                    </span>

                  </div>

                  {/* File Selector */}
                  <label className="mt-5 flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#C8D7E3] bg-[#FBFDFE] px-5 py-7 text-center transition hover:border-[#08A875] hover:bg-[#F4FBF8]">

                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                      multiple
                      className="sr-only"
                      onChange={(e) =>
                        setPrescriptionFiles(Array.from(e.target.files || []))


                      }

                    />

                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#DDF7F0] text-3xl text-[#08A875]">
                      ⇧
                    </span>

                    <span className="mt-4 text-sm font-bold text-[#0B3154]">
                      Choose a prescription file
                    </span>

                    <span className="mt-2 text-sm text-[#718096]">
                      Click here to browse files from your device
                    </span>

                    <span className="mt-3 text-xs text-[#718096]">
                      PDF, JPG or PNG
                    </span>

                    <span className="mt-5 inline-flex items-center gap-2 rounded-lg border border-[#08A875] px-5 py-2.5 text-sm font-semibold text-[#07865F]">
                      ▱ Choose File
                    </span>

                  </label>

                  {/* Selected File */}

                  {prescriptionFiles.length > 0 && (
                    <>
                      {prescriptionFiles.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="mt-4 flex items-center gap-3 rounded-xl border border-[#E5EDF3] bg-[#F8FBFD] p-4"
                        >
                          <div className="flex h-12 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-extrabold text-rose-500 shadow-sm">
                            FILE
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="break-all text-sm font-semibold text-[#0B3154]">
                              {file.name}
                            </p>

                            <p className="mt-1 text-xs text-[#718096]">
                              {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>

                          <span className="text-lg text-[#08A875]">
                            ✓
                          </span>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#08A875] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#07865F]"
                        onClick={uploadPrescription}
                        disabled={isUploading}
                      >
                        <span>⇧</span>
                        {isUploading ? "Uploading..." : "Upload Prescription"}
                      </button>
                    </>
                  )}

                  {/* Information */}
                  <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#F0FAF6] p-4">

                    <span className="text-xl text-[#08A875]">
                      ♢
                    </span>

                    <div>
                      <p className="text-sm font-bold text-[#0B3154]">
                        Your information matters
                      </p>

                      <p className="mt-1 text-xs leading-5 text-[#718096]">
                        Please upload a clear, readable prescription for
                        pharmacist verification.
                      </p>
                    </div>

                  </div>

                </section>
              )}

            </div>

            {/* RIGHT COLUMN */}
            <aside className="space-y-5 lg:sticky lg:top-6">

              {/* Order Summary */}
              <section className="rounded-2xl border border-[#E5EDF3] bg-white p-5 shadow-sm sm:p-6">

                <div className="flex items-center gap-3 border-b border-[#E5EDF3] pb-5">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EAF4FF] text-xl text-[#0B3154]">
                    ▤
                  </div>

                  <h2 className="text-xl font-bold text-[#0B3154]">
                    Order Summary
                  </h2>

                </div>

                <div className="mt-5 space-y-4">

                  <div className="flex items-center justify-between gap-3 text-sm text-[#718096]">
                    <span>Items</span>

                    <span className="font-semibold text-[#0B3154]">
                      {cartItems.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 text-sm text-[#718096]">
                    <span>Subtotal</span>

                    <span className="font-semibold text-[#0B3154]">
                      ₹{subtotal.toFixed(2)}
                    </span>
                  </div>

                </div>

                <div className="my-5 border-t border-dashed border-[#D8E3EB]" />

                <div className="flex items-center justify-between gap-3">

                  <span className="font-bold text-[#0B3154]">
                    Total Amount
                  </span>

                  <span className="text-2xl font-extrabold text-[#08A875]">
                    ₹{subtotal.toFixed(2)}
                  </span>

                </div>

                {/* Delivery Address */}
                <div className="mt-6 border-t border-[#E5EDF3] pt-5">

                  <label
                    htmlFor="deliveryAddress"
                    className="mb-2 block text-sm font-semibold text-[#0B3154]"
                  >
                    Delivery Address
                  </label>

                  <textarea
                    id="deliveryAddress"
                    name="deliveryAddress"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your complete delivery address..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-[#E5EDF3] bg-white px-4 py-3 text-sm text-[#0B3154] outline-none transition placeholder:text-[#718096] focus:border-[#08A875] focus:ring-2 focus:ring-[#08A875]/10"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      proceedToOrder();
                    }}
                    disabled={isOrdering || loading || cartItems.length === 0}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#08A875] px-5 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#07865F] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isOrdering ? "Placing order..." : "Proceed to Order"} <span>→</span>
                  </button>

                </div>

                <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-[#0B3154]">
                  <span className="text-[#08A875]">♢</span>
                  Secure Checkout
                </div>

                <p className="mt-2 text-center text-xs text-[#718096]">
                  Your health information deserves privacy.
                </p>
                {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
                {prescriptionId && <p role="status" className="mt-3 text-sm text-emerald-700">Prescription uploaded successfully.</p>}

              </section>

              {/* MediCart Benefits */}
              <section className="rounded-2xl border border-[#E5EDF3] bg-white p-5 shadow-sm sm:p-6">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DDF7F0] text-xl text-[#07865F]">
                    ♢
                  </div>

                  <h2 className="text-lg font-bold text-[#0B3154]">
                    Why Choose MediCart?
                  </h2>

                </div>

                <div className="mt-5 space-y-5">

                  <div className="flex items-start gap-3">

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FAF6] text-lg text-[#08A875]">
                      ✓
                    </span>

                    <div>
                      <p className="text-sm font-bold text-[#0B3154]">
                        Genuine Medicines
                      </p>

                      <p className="mt-1 text-xs text-[#718096]">
                        Quality-focused healthcare products
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FAF6] text-lg text-[#08A875]">
                      ♧
                    </span>

                    <div>
                      <p className="text-sm font-bold text-[#0B3154]">
                        Reliable Delivery
                      </p>

                      <p className="mt-1 text-xs text-[#718096]">
                        Healthcare essentials delivered to you
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FAF6] text-lg text-[#08A875]">
                      ♢
                    </span>

                    <div>
                      <p className="text-sm font-bold text-[#0B3154]">
                        Privacy First
                      </p>

                      <p className="mt-1 text-xs text-[#718096]">
                        Careful handling of prescription information
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0FAF6] text-lg text-[#08A875]">
                      ♡
                    </span>

                    <div>
                      <p className="text-sm font-bold text-[#0B3154]">
                        Pharmacist Support
                      </p>

                      <p className="mt-1 text-xs text-[#718096]">
                        Support for your medication needs
                      </p>
                    </div>

                  </div>

                </div>

              </section>

            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

export default Cart;