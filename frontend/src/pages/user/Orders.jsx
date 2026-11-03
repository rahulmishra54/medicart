
import { useEffect, useState } from "react";
import {
  Search,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  Clock3,
  ChevronRight,
  ShoppingBag,
  CalendarDays,
  ReceiptText,
} from "lucide-react";

import Navbar from "../../component/user/Navbar.jsx";
import Footer from "../../component/user/Footer.jsx";
import api from "../../api/api.js";

const filters = [
  "All Orders",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const statusStyles = {
  Processing: {
    icon: Clock3,
    badge: "bg-amber-50 text-amber-700",
  },
  Shipped: {
    icon: Truck,
    badge: "bg-blue-50 text-blue-700",
  },
  Delivered: {
    icon: CheckCircle2,
    badge: "bg-emerald-50 text-emerald-700",
  },
  Cancelled: {
    icon: XCircle,
    badge: "bg-red-50 text-red-600",
  },
};

const normalizeStatus = (status) => {
  const value = String(status || "Processing").toLowerCase();

  if (value === "delivered") return "Delivered";

  if (value === "shipped" || value === "dispatched") {
    return "Shipped";
  }

  if (value === "cancelled" || value === "canceled") {
    return "Cancelled";
  }

  return "Processing";
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All Orders");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setErrorMessage("");

        const response = await api.get("/orders/");

        setOrders(response.data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);

        setErrorMessage(
          error.response?.data?.message ||
            "Unable to load your orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesFilter =
      activeFilter === "All Orders" ||
      normalizeStatus(order.status) === activeFilter;

    const searchText = search.toLowerCase().trim();

    const matchesSearch =
      String(order._id || "").toLowerCase().includes(searchText) ||
      (order.pharmacy?.name || "").toLowerCase().includes(searchText) ||
      order.orderItems?.some((item) =>
        (item.medicine?.name || "").toLowerCase().includes(searchText)
      );

    return matchesFilter && matchesSearch;
  });

  // Order summary
  const summary = [
    {
      label: "Total Orders",
      value: orders.length,
      Icon: ShoppingBag,
      color: "bg-[#DDF7F0] text-[#08A875]",
    },
    {
      label: "Processing",
      value: orders.filter(
        (order) => normalizeStatus(order.status) === "Processing"
      ).length,
      Icon: Clock3,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "Shipped",
      value: orders.filter(
        (order) => normalizeStatus(order.status) === "Shipped"
      ).length,
      Icon: Truck,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Delivered",
      value: orders.filter(
        (order) => normalizeStatus(order.status) === "Delivered"
      ).length,
      Icon: CheckCircle2,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  // Razorpay payment
  async function proceedToPayment(order) {
    const orderId = String(order?._id || "");

    if (!orderId) {
      console.error("Order ID missing");
      return;
    }

    if (
      order.prescriptionStatus !== "approved" &&
      order.prescriptionStatus !== "not_required"
    ) {
      console.error("Prescription is not approved");
      return;
    }

    try {
      // Create Razorpay order
      const response = await api.post(
        "/payment/create-payment",
        { orderId }
      );

      const razorpayOrder =
        response.data.order ||
        response.data.razorpayOrder ||
        response.data;

      if (
        !razorpayOrder?.id ||
        !razorpayOrder?.amount ||
        !razorpayOrder?.currency
      ) {
        throw new Error("Invalid Razorpay order response");
      }

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!razorpayKey) {
        throw new Error("Razorpay Key ID is missing");
      }

      // Razorpay checkout options
      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "MediCart",
        description: "Medicine Order Payment",
        order_id: razorpayOrder.id,

        handler: async function (paymentResponse) {
          try {
            const verifyResponse = await api.post(
              "/payment/verify-payment",
              {
                orderId,
                razorpay_payment_id:
                  paymentResponse.razorpay_payment_id,
                razorpay_order_id:
                  paymentResponse.razorpay_order_id,
                razorpay_signature:
                  paymentResponse.razorpay_signature,
              }
            );

            console.log("Payment verified:", verifyResponse.data);
          } catch (error) {
            console.error(
              "Payment verification error:",
              error.response?.data || error.message
            );
          }
        },

        modal: {
          ondismiss: function () {
            console.log("Payment window closed");
          },
        },

        theme: {
          color: "#08A875",
        },
      };

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", function (error) {
        console.error("Payment failed:", error);
      });

      razorpay.open();
    } catch (error) {
      console.error(
        "Payment error:",
        error.response?.data || error.message
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#F7FAFC] text-[#0B3154]">
      <Navbar />

      <main className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-10 lg:py-9">

        {/* Breadcrumb */}
        <div className="mb-5 flex items-center gap-2 text-sm">
          <span className="text-[#718096]">Home</span>
          <ChevronRight size={15} className="text-[#A0AEC0]" />
          <span className="font-semibold text-[#08A875]">
            My Orders
          </span>
        </div>

        {/* Heading and Search */}
        <section className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#DDF7F0] text-[#08A875]">
                <Package size={25} />
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                My Orders
              </h1>
            </div>

            <p className="text-sm text-[#718096] sm:text-base">
              Track your orders and manage your medicine purchases.
            </p>
          </div>

          <div className="flex w-full items-center gap-2 rounded-xl border border-[#E5EDF3] bg-white px-4 py-3 shadow-sm lg:max-w-sm">
            <Search size={19} className="shrink-0 text-[#718096]" />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by order ID or medicine..."
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-[#A0AEC0]"
            />
          </div>
        </section>

        {/* Summary Cards */}
        <section className="mb-7 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">
          {summary.map(({ label, value, Icon, color }) => (
            <div
              key={label}
              className="flex min-w-0 items-center gap-3 rounded-2xl border border-[#E5EDF3] bg-white p-4 shadow-sm sm:p-5"
            >
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
                <Icon size={20} />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-[#718096] sm:text-sm">
                  {label}
                </p>
                <p className="mt-1 text-xl font-extrabold">
                  {value}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Filters */}
        <section className="mb-5">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {filters.map((filter) => {
              const count =
                filter === "All Orders"
                  ? orders.length
                  : orders.filter(
                      (order) =>
                        normalizeStatus(order.status) === filter
                    ).length;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                    activeFilter === filter
                      ? "border-[#B9EEDD] bg-[#DDF7F0] text-[#07865F]"
                      : "border-[#E5EDF3] bg-white text-[#718096] hover:border-[#B9EEDD]"
                  }`}
                >
                  {filter}

                  <span className="rounded-md bg-white/80 px-1.5 py-0.5 text-xs">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Orders */}
        <section className="space-y-4">
          {loading ? (
            <div className="rounded-2xl border border-[#E5EDF3] bg-white px-5 py-16 text-center text-sm text-[#718096]">
              Loading your orders...
            </div>
          ) : errorMessage ? (
            <div className="rounded-2xl border border-red-100 bg-white px-5 py-12 text-center">
              <XCircle size={28} className="mx-auto mb-3 text-red-500" />

              <h2 className="font-bold">
                Unable to load orders
              </h2>

              <p className="mt-2 text-sm text-[#718096]">
                {errorMessage}
              </p>
            </div>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const status =
                statusStyles[normalizeStatus(order.status)] ||
                statusStyles.Processing;

              const StatusIcon = status.icon;

              return (
                <article
                  key={order._id}
                  className="overflow-hidden rounded-2xl border border-[#E5EDF3] bg-white shadow-sm transition hover:shadow-md"
                >
                  {/* Order Header */}
                  <div className="flex flex-col gap-4 border-b border-[#EDF2F7] p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <p className="break-all text-sm font-extrabold sm:text-base">
                        Order #{order._id}
                      </p>

                      <p className="mt-1 flex items-center gap-1.5 text-xs text-[#718096] sm:text-sm">
                        <CalendarDays size={14} />
                        Placed on{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-IN")}
                      </p>

                      {order.pharmacy?.name && (
                        <p className="mt-1 text-xs text-[#718096]">
                          Pharmacy: {order.pharmacy.name}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-start lg:gap-8">
                      <div>
                        <p className="font-extrabold">
                          ₹{Number(order.totalAmount || 0).toLocaleString("en-IN")}
                        </p>

                        <p className="mt-1 text-xs text-[#718096]">
                          {order.orderItems?.length || 0} items
                        </p>
                      </div>

                      <div className="min-w-0">
                        <span className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold sm:text-sm ${status.badge}`}>
                          <StatusIcon size={16} />
                          {normalizeStatus(order.status)}
                        </span>

                        <p className="mt-1 text-xs text-[#718096]">
                          {normalizeStatus(order.status) === "Delivered"
                            ? `Delivered on ${order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString("en-IN") : "—"}`
                            : normalizeStatus(order.status) === "Shipped"
                              ? `Expected delivery: ${order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString("en-IN") : "—"}`
                              : normalizeStatus(order.status) === "Processing"
                                ? "Your order is being prepared"
                                : "This order was cancelled"}
                        </p>
                      </div>

                      <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
                        {order.paymentStatus !== "paid" &&
                          normalizeStatus(order.status) !== "Cancelled" && (
                            <button
                              type="button"
                              onClick={() => proceedToPayment(order)}
                              className="inline-flex w-full items-center justify-center rounded-xl bg-[#08A875] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#078F65] sm:w-auto"
                            >
                              Pay Now
                            </button>
                          )}

                        <button
                          type="button"
                          onClick={() => setSelectedOrder(order)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#D6E2EC] px-4 py-2.5 text-sm font-semibold hover:border-[#08A875] hover:text-[#08A875] sm:w-auto"
                        >
                          View Details
                          <ChevronRight size={17} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid gap-4 p-4 sm:p-5 md:grid-cols-2 xl:grid-cols-3">
                    {order.orderItems?.map((item, index) => (
                      <div
                        key={item._id || index}
                        className="flex min-w-0 items-center gap-3"
                      >
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F3F8FA] text-[#08A875]">
                          <Package size={28} />
                        </div>

                        <div className="min-w-0">
                          <p className="break-words text-sm font-bold">
                            {item.medicine?.name || "Medicine"}
                          </p>

                          {item.medicine?.packSize && (
                            <p className="mt-1 text-xs text-[#718096]">
                              {item.medicine.packSize}
                            </p>
                          )}

                          <p className="mt-0.5 text-xs text-[#718096]">
                            Qty: {item.quantity}
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            ₹{Number(item.unitPrice || 0).toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })
          ) : (
            <div className="rounded-2xl border border-dashed border-[#D6E2EC] bg-white px-5 py-16 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DDF7F0] text-[#08A875]">
                <ReceiptText size={27} />
              </div>

              <h2 className="text-lg font-bold">
                No orders found
              </h2>

              <p className="mx-auto mt-2 max-w-sm text-sm text-[#718096]">
                {orders.length === 0
                  ? "Your orders will appear here after you place an order."
                  : "No orders match your current search or selected filter."}
              </p>

              {(search || activeFilter !== "All Orders") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setActiveFilter("All Orders");
                  }}
                  className="mt-5 rounded-xl bg-[#08A875] px-5 py-3 text-sm font-semibold text-white hover:bg-[#078F65]"
                >
                  Clear Filters
                </button>
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B3154]/50 p-4"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-details-title"
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="order-details-title"
                  className="text-xl font-extrabold"
                >
                  Order Details
                </h2>

                <p className="mt-1 break-all text-sm text-[#718096]">
                  #{selectedOrder._id}
                </p>
              </div>

              <button
                type="button"
                aria-label="Close order details"
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg px-3 py-1 text-xl text-[#718096] hover:bg-[#F3F8FA]"
              >
                ×
              </button>
            </div>

            <div className="mt-5 rounded-xl bg-[#F3FAF7] p-4">
              <p className="text-sm text-[#718096]">
                Order status
              </p>

              <p className="mt-1 font-bold">
                {normalizeStatus(selectedOrder.status)}
              </p>

              <p className="mt-2 text-sm text-[#718096]">
                Order date:{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString("en-IN")}
              </p>

              {selectedOrder.deliveryDate && (
                <p className="mt-1 text-sm text-[#718096]">
                  Delivery date:{" "}
                  {new Date(selectedOrder.deliveryDate).toLocaleDateString("en-IN")}
                </p>
              )}

              {selectedOrder.deliveryAddress && (
                <p className="mt-2 text-sm text-[#718096]">
                  Delivery address: {selectedOrder.deliveryAddress}
                </p>
              )}

              {selectedOrder.prescriptionStatus && (
                <p className="mt-2 text-sm text-[#718096]">
                  Prescription: {selectedOrder.prescriptionStatus}
                </p>
              )}
            </div>

            <h3 className="mt-6 font-bold">
              Items ordered
            </h3>

            <div className="mt-3 divide-y divide-[#E5EDF3]">
              {selectedOrder.orderItems?.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold">
                      {item.medicine?.name || "Medicine"}
                    </p>

                    <p className="mt-1 text-xs text-[#718096]">
                      Qty {item.quantity}
                    </p>
                  </div>

                  <p className="shrink-0 text-sm font-bold">
                    ₹{Number(item.totalPrice || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[#E5EDF3] pt-4">
              <span className="font-semibold">
                Order total
              </span>

              <span className="text-xl font-extrabold">
                ₹{Number(selectedOrder.totalAmount || 0).toLocaleString("en-IN")}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full rounded-xl bg-[#08A875] px-4 py-3 font-semibold text-white hover:bg-[#078F65]"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;