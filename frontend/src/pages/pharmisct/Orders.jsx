
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PharmacistLayout from "./PharmacistLayout.jsx";
import api from "../../api/api.js";

const statusStyle = {
  Pending: "bg-amber-50 text-amber-700",
  Confirmed: "bg-blue-50 text-blue-700",
  Processing: "bg-amber-50 text-amber-700",
  Shipped: "bg-blue-50 text-blue-700",
  Delivered: "bg-[#E5F6F0] text-[#117F5E]",
  Cancelled: "bg-red-50 text-red-700",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    let isMounted = true;
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders/");
        if (!response.data.success || !Array.isArray(response.data.orders)) {
          throw new Error(response.data.message || "Orders are not available.");
        }
        if (isMounted) setOrders(response.data.orders);
      } catch (error) {
        if (isMounted) setError(error.response?.data?.message || error.message || "Unable to load orders.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOrders();
    return () => {
      isMounted = false;
    };
  }, []);

  const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
  const visibleOrders = statusFilter === "all"
    ? orders
    : orders.filter((order) => order.status === statusFilter);

  return (
    <PharmacistLayout>
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748B]">Pharmacy operations</p>
            <h1 className="mt-1 text-2xl font-bold text-[#17324D] sm:text-3xl">
              Orders
            </h1>
            <p className="mt-1 text-sm text-[#718096]">
              Review and fulfill customer orders.
            </p>
          </div>

          <label className="text-sm font-medium text-[#475569]">
            Status
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="ml-2 h-10 rounded-lg border border-[#DCE7EC] bg-white px-3 text-sm"
            >
              <option value="all">All orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </label>
        </header>

        <div className="overflow-x-auto rounded-xl border border-[#E2EDF1] bg-white">
          <table className="w-full min-w-190 text-left text-sm">
            <thead className="bg-[#F8FBFC] text-xs uppercase text-[#718096]">
              <tr>
                <th className="px-5 py-4 font-semibold">Order</th>
                <th className="px-5 py-4 font-semibold">Customer</th>
                <th className="px-5 py-4 font-semibold">Placed</th>
                <th className="px-5 py-4 font-semibold">Items</th>
                <th className="px-5 py-4 font-semibold">Total</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>

            <tbody>
              {visibleOrders.map((order) => (
                <tr
                  key={order._id}
                  className="border-t border-[#EEF3F5] text-[#475569]"
                >
                  <td className="px-5 py-4 font-semibold text-[#17324D]">{order._id}</td>
                  <td className="px-5 py-4">{order.user?.name || "Customer"}</td>
                  <td className="px-5 py-4">{order.orderDate ? new Date(order.orderDate).toLocaleString("en-IN") : "—"}</td>
                  <td className="px-5 py-4">{order.items?.length ?? "—"}</td>
                  <td className="px-5 py-4 font-medium">
                    {currency.format(order.totalAmount || 0)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyle[order.status?.[0]?.toUpperCase() + order.status?.slice(1)] || ""
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      to={`/pharmacist/orders/${order._id}`}
                      className="font-semibold text-[#15966F] hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {loading && <p className="p-8 text-center text-sm text-[#718096]">Loading orders...</p>}
          {error && <p role="alert" className="p-8 text-center text-sm text-red-700">Unable to load orders: {error}</p>}
          {!loading && !error && visibleOrders.length === 0 && (
            <p className="p-8 text-center text-sm text-[#718096]">
              {orders.length === 0 ? "No orders found." : "No orders match this status."}
            </p>
          )}
        </div>
      </div>
    </PharmacistLayout>
  );
};

export default Orders;
