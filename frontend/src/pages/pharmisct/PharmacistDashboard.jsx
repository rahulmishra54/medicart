import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import InventoryStats from "../../component/InventoryStats.jsx";
import PharmacistLayout from "./PharmacistLayout.jsx";
import api from "../../api/api.js";

const PharmacistDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsError, setStatsError] = useState("");
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      try {
        const [statsResult, ordersResult] = await Promise.allSettled([
          api.get("/inventory/stats"),
          api.get("/orders/"),
        ]);

        if (!isMounted) return;

        if (statsResult.status === "fulfilled" && statsResult.value.data.success && statsResult.value.data.data) {
          setStats(statsResult.value.data.data);
        } else {
          setStatsError(statsResult.status === "rejected"
            ? statsResult.reason.response?.data?.message || statsResult.reason.message
            : "Inventory statistics are not available.");
        }

        if (ordersResult.status === "fulfilled" && ordersResult.value.data.success && Array.isArray(ordersResult.value.data.orders)) {
          setOrders(ordersResult.value.data.orders.slice(0, 5));
        } else {
          setOrdersError(ordersResult.status === "rejected"
            ? ordersResult.reason.response?.data?.message || ordersResult.reason.message
            : "Recent orders are not available.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  const currency = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
  const date = new Intl.DateTimeFormat("en-IN", { dateStyle: "full" }).format(new Date());

  return (
    <PharmacistLayout>
    <div className="mx-auto max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#15966F]">{date}</p>
          <h1 className="mt-1 text-2xl font-bold text-[#17324D] sm:text-3xl">Good morning, {user?.name || "Pharmacy"}</h1>
          <p className="mt-1 text-sm text-[#64748B]">Here is the latest activity from your pharmacy.</p>
        </div>
        <Link to="/pharmacist/products/new" className="inline-flex h-10 items-center justify-center rounded-lg bg-[#15966F] px-4 text-sm font-semibold text-white hover:bg-[#117F5E]">
          Add medicine
        </Link>
      </header>

      {loading && <p className="text-sm text-slate-500">Loading dashboard data...</p>}
      {statsError && <p role="alert" className="text-sm text-red-700">Unable to load inventory statistics: {statsError}</p>}
      {stats && <InventoryStats stats={stats} />}

      <section className="overflow-hidden rounded-xl border border-[#E2EDF1] bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-[#EEF3F5] px-4 py-4 sm:px-5">
          <div>
            <h2 className="font-semibold text-[#17324D]">Recent orders</h2>
            <p className="mt-1 text-sm text-[#718096]">A snapshot of your latest customer orders</p>
          </div>
          <Link to="/pharmacist/orders" className="text-sm font-semibold text-[#15966F] hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead className="bg-[#F8FBFC] text-xs uppercase text-[#718096]">
              <tr><th className="px-5 py-3 font-semibold">Order</th><th className="px-5 py-3 font-semibold">Customer</th><th className="px-5 py-3 font-semibold">Date</th><th className="px-5 py-3 font-semibold">Total</th><th className="px-5 py-3 font-semibold">Status</th></tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-t border-[#EEF3F5] text-[#475569]">
                  <td className="px-5 py-4"><Link to={`/pharmacist/orders/${order._id}`} className="font-semibold text-[#17324D] hover:text-[#15966F]">{order._id}</Link></td>
                  <td className="px-5 py-4">{order.user?.name || "Customer"}</td>
                  <td className="px-5 py-4">{order.orderDate ? new Date(order.orderDate).toLocaleDateString("en-IN") : "—"}</td>
                  <td className="px-5 py-4 font-medium">{currency.format(order.totalAmount || 0)}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-[#E5F6F0] px-2.5 py-1 text-xs font-medium text-[#117F5E]">{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          {ordersError && <p role="alert" className="p-4 text-sm text-red-700">Unable to load recent orders: {ordersError}</p>}
          {!loading && !ordersError && orders.length === 0 && <p className="p-8 text-center text-sm text-[#718096]">No orders found.</p>}
        </div>
      </section>
    </div>
  </PharmacistLayout>
  );
};

export default PharmacistDashboard;