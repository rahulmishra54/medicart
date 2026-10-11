import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InventoryStats from "../../component/InventoryStats.jsx";
import PharmacistLayout from "./PharmacistLayout.jsx";
import api from "../../api/api.js";

const recentOrders = [
  { id: "MC-2048", customer: "Aarav Sharma", date: "05 Oct 2026", total: "₹842", status: "Processing" },
  { id: "MC-2047", customer: "Meera Patel", date: "05 Oct 2026", total: "₹1,260", status: "Ready to ship" },
  { id: "MC-2046", customer: "Kabir Singh", date: "04 Oct 2026", total: "₹395", status: "Delivered" },
];

const PharmacistDashboard = () => {
  const [stats, setStats] = useState({
    totalMedicines: 0,
    inStockMedicines: 0,
    lowStockMedicines: 0,
    outOfStockMedicines: 0,
  });

  useEffect(() => {
    const fetchInventoryStats = async () => {
      try {
        const response = await api.get("/inventory/stats");
        if (response.data.success && response.data.data) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Unable to load inventory statistics:", error);
      }
    };

    fetchInventoryStats();
  }, []);

  return (
    <PharmacistLayout>
    <div className="mx-auto max-w-7xl space-y-7 p-4 sm:p-6 lg:p-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#15966F]">Monday, 5 October 2026</p>
          <h1 className="mt-1 text-2xl font-bold text-[#17324D] sm:text-3xl">Good morning, Sharma Medical Store</h1>
          <p className="mt-1 text-sm text-[#64748B]">Here is the latest activity from your pharmacy.</p>
        </div>
        <Link to="/pharmacist/products/new" className="inline-flex h-10 items-center justify-center rounded-lg bg-[#15966F] px-4 text-sm font-semibold text-white hover:bg-[#117F5E]">
          Add medicine
        </Link>
      </header>

      <InventoryStats stats={stats} />

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
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-[#EEF3F5] text-[#475569]">
                  <td className="px-5 py-4"><Link to={`/pharmacist/orders/${order.id}`} className="font-semibold text-[#17324D] hover:text-[#15966F]">{order.id}</Link></td>
                  <td className="px-5 py-4">{order.customer}</td><td className="px-5 py-4">{order.date}</td><td className="px-5 py-4 font-medium">{order.total}</td>
                  <td className="px-5 py-4"><span className="rounded-full bg-[#E5F6F0] px-2.5 py-1 text-xs font-medium text-[#117F5E]">{order.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </PharmacistLayout>
  );
};

export default PharmacistDashboard;