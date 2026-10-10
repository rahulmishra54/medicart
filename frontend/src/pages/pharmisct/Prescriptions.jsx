import { Link } from "react-router-dom";
import PharmacistLayout from "./PharmacistLayout.jsx";

const prescriptions = [
  { id: "PR-1024", order: "MC-2048", customer: "Aarav Sharma", received: "05 Oct 2026, 10:42 AM", status: "Pending" },
  { id: "PR-1023", order: "MC-2041", customer: "Meera Patel", received: "04 Oct 2026, 02:20 PM", status: "Approved" },
  { id: "PR-1022", order: "MC-2037", customer: "Kabir Singh", received: "03 Oct 2026, 11:06 AM", status: "Needs review" },
];

const Prescriptions = () => (
  <PharmacistLayout>
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header><p className="text-sm text-[#64748B]">Pharmacy operations</p><h1 className="mt-1 text-2xl font-bold text-[#17324D] sm:text-3xl">Prescriptions</h1><p className="mt-1 text-sm text-[#718096]">Review prescription documents attached to customer orders.</p></header>
      <div className="overflow-x-auto rounded-xl border border-[#E2EDF1] bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[#F8FBFC] text-xs uppercase text-[#718096]"><tr><th className="px-5 py-4 font-semibold">Prescription</th><th className="px-5 py-4 font-semibold">Order</th><th className="px-5 py-4 font-semibold">Customer</th><th className="px-5 py-4 font-semibold">Received</th><th className="px-5 py-4 font-semibold">Status</th><th className="px-5 py-4" /></tr></thead>
          <tbody>{prescriptions.map((prescription) => <tr key={prescription.id} className="border-t border-[#EEF3F5] text-[#475569]"><td className="px-5 py-4 font-semibold text-[#17324D]">{prescription.id}</td><td className="px-5 py-4">{prescription.order}</td><td className="px-5 py-4">{prescription.customer}</td><td className="px-5 py-4">{prescription.received}</td><td className="px-5 py-4"><span className="rounded-full bg-[#E5F6F0] px-2.5 py-1 text-xs font-medium text-[#117F5E]">{prescription.status}</span></td><td className="px-5 py-4"><Link to={`/pharmacist/prescriptions/${prescription.id}`} className="font-semibold text-[#15966F] hover:underline">Review</Link></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  </PharmacistLayout>
);

export default Prescriptions;