import { useState } from "react";
import { Link } from "react-router-dom";
import PharmacistLayout from "./PharmacistLayout.jsx";

const orders = [
  { id: "MC-2048", customer: "Aarav Sharma", date: "05 Oct 2026, 10:42 AM", items: 3, total: "₹842", status: "Processing" },
  { id: "MC-2047", customer: "Meera Patel", date: "05 Oct 2026, 09:18 AM", items: 5, total: "₹1,260", status: "Ready to ship" },
  { id: "MC-2046", customer: "Kabir Singh", date: "04 Oct 2026, 04:36 PM", items: 2, total: "₹395", status: "Delivered" },
  { id: "MC-2045", customer: "Diya Verma", date: "04 Oct 2026, 01:05 PM", items: 4, total: "₹718", status: "Cancelled" },
];

const statusStyle = {
  Processing: "bg-amber-50 text-amber-700",
  "Ready to ship": "bg-blue-50 text-blue-700",
  Delivered: "bg-[#E5F6F0] text-[#117F5E]",
  Cancelled: "bg-red-50 text-red-700",
};

const Orders = () => {
  const [filter, setFilter] = useState("All orders");
  const visibleOrders = filter === "All orders" ? orders : orders.filter((order) => order.status === filter);

  return (
    <PharmacistLayout>
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-sm text-[#64748B]">Pharmacy operations</p><h1 className="mt-1 text-2xl font-bold text-[#17324D] sm:text-3xl">Orders</h1><p className="mt-1 text-sm text-[#718096]">Review and fulfill customer orders.</p></div>
          <label className="text-sm font-medium text-[#475569]">Status<select value={filter} onChange={(event) => setFilter(event.target.value)} className="ml-2 h-10 rounded-lg border border-[#DCE7EC] bg-white px-3 text-sm"><option>All orders</option><option>Processing</option><option>Ready to ship</option><option>Delivered</option><option>Cancelled</option></select></label>
        </header>
        <div className="overflow-x-auto rounded-xl border border-[#E2EDF1] bg-white">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#F8FBFC] text-xs uppercase text-[#718096]"><tr><th className="px-5 py-4 font-semibold">Order</th><th className="px-5 py-4 font-semibold">Customer</th><th className="px-5 py-4 font-semibold">Placed</th><th className="px-5 py-4 font-semibold">Items</th><th className="px-5 py-4 font-semibold">Total</th><th className="px-5 py-4 font-semibold">Status</th><th className="px-5 py-4" /></tr></thead>
            <tbody>{visibleOrders.map((order) => <tr key={order.id} className="border-t border-[#EEF3F5] text-[#475569]"><td className="px-5 py-4 font-semibold text-[#17324D]">{order.id}</td><td className="px-5 py-4">{order.customer}</td><td className="px-5 py-4">{order.date}</td><td className="px-5 py-4">{order.items}</td><td className="px-5 py-4 font-medium">{order.total}</td><td className="px-5 py-4"><span className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[order.status]}`}>{order.status}</span></td><td className="px-5 py-4"><Link to={`/pharmacist/orders/${order.id}`} className="font-semibold text-[#15966F] hover:underline">Details</Link></td></tr>)}</tbody>
          </table>
          {visibleOrders.length === 0 && <p className="p-8 text-center text-sm text-[#718096]">No orders match this status.</p>}
        </div>
      </div>
    </PharmacistLayout>
  );
};

export default Orders;