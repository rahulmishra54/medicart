
import { Link } from "react-router-dom";
import PharmacistLayout from "./PharmacistLayout.jsx";
import { useState, useEffect } from "react";
import api from "../../api/api.js";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const fetchPrescriptions = async () => {
      try {
        const response = await api.get("/prescriptions/mine");
        if (!response.data.success || !Array.isArray(response.data.prescriptions)) {
          throw new Error(response.data.message || "Prescriptions are not available.");
        }
        if (isMounted) setPrescriptions(response.data.prescriptions);
      } catch (error) {
        if (isMounted) setError(error.response?.data?.message || error.message || "Unable to load prescriptions.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPrescriptions();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <PharmacistLayout>
      <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8">
        <header>
          <p className="text-sm text-[#64748B]">Pharmacy operations</p>
          <h1 className="mt-1 text-2xl font-bold text-[#17324D] sm:text-3xl">
            Prescriptions
          </h1>
          <p className="mt-1 text-sm text-[#718096]">
            Review prescription documents attached to customer orders.
          </p>
        </header>

        <div className="overflow-x-auto rounded-xl border border-[#E2EDF1] bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-[#F8FBFC] text-xs uppercase text-[#718096]">
              <tr>
                <th className="px-5 py-4 font-semibold">Prescription</th>
                <th className="px-5 py-4 font-semibold">Order</th>
                <th className="px-5 py-4 font-semibold">Customer</th>
                <th className="px-5 py-4 font-semibold">Received</th>
                <th className="px-5 py-4 font-semibold">Status</th>
                <th className="px-5 py-4" />
              </tr>
            </thead>

            <tbody>
              {prescriptions.map((order) => (
                <tr
                  key={order.prescription._id}
                  className="border-t border-[#EEF3F5] text-[#475569]"
                >
                  <td className="px-5 py-4 font-semibold text-[#17324D]">
                    {order.prescription._id}
                  </td>
                  <td className="px-5 py-4">
                    {order._id}
                  </td>
                  <td className="px-5 py-4">
                    {order.user?.name || "Customer"}
                  </td>
                  <td className="px-5 py-4">
                    {order.orderDate ? new Date(order.orderDate).toLocaleString("en-IN") : "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-[#E5F6F0] px-2.5 py-1 text-xs font-medium text-[#117F5E]">
                      {order.prescription.status || order.prescriptionStatus || "pending"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      to={`/pharmacist/prescriptions/${order.prescription._id}`}
                      className="font-semibold text-[#15966F] hover:underline"
                    >
                      Review
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <p className="p-8 text-center text-sm text-[#718096]">Loading prescriptions...</p>}
          {error && <p role="alert" className="p-8 text-center text-sm text-red-700">Unable to load prescriptions: {error}</p>}
          {!loading && !error && prescriptions.length === 0 && <p className="p-8 text-center text-sm text-[#718096]">No pending prescription reviews.</p>}
        </div>
      </div>
    </PharmacistLayout>
  );
};

export default Prescriptions;
