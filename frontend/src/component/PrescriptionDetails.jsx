import { useEffect, useState } from "react";
import { Check, ClipboardList, MessageSquare, UserRound, XCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import api from "../api/api.js";

const PrescriptionDetails = () => {
  const { prescriptionId } = useParams();
  const [prescription, setPrescription] = useState(null);
  const [order, setOrder] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchPrescription = async () => {
      try {
        const response = await api.get(`/prescriptions/${prescriptionId}`);
        if (!response.data.success || !response.data.prescription || !response.data.order) {
          throw new Error(response.data.message || "Prescription details are not available.");
        }
        if (isMounted) {
          setPrescription(response.data.prescription);
          setOrder(response.data.order);
        }
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.response?.data?.message || requestError.message || "Unable to load prescription.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPrescription();
    return () => {
      isMounted = false;
    };
  }, [prescriptionId]);

  const reviewPrescription = async (action) => {
    try {
      setSaving(true);
      setError("");
      setMessage("");
      const response = await api.patch(`/prescriptions/${prescriptionId}/${action}`, { remarks });
      if (!response.data.success || !response.data.prescription) {
        throw new Error(response.data.message || "Unable to update prescription review.");
      }
      setPrescription(response.data.prescription);
      setMessage(action === "approve" ? "Prescription approved." : "Prescription rejected.");
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Unable to update prescription review.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-6 text-sm text-slate-500">Loading prescription...</p>;
  if (error && !prescription) return <p role="alert" className="p-6 text-sm text-red-700">{error}</p>;

  const images = Array.isArray(prescription?.imageUrl)
    ? prescription.imageUrl
    : prescription?.imageUrl
      ? [prescription.imageUrl]
      : [];

  return (
    <div className="w-full max-w-[900px] rounded-xl border border-[#E2EDF1] bg-white p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-[#17324D]">Prescription details</h2>

      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
      {message && <p role="status" className="mt-4 text-sm text-emerald-700">{message}</p>}

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div><dt className="text-sm text-slate-500">Order ID</dt><dd className="mt-1 break-all font-semibold text-slate-900">{order?._id}</dd></div>
        <div><dt className="text-sm text-slate-500">Prescription ID</dt><dd className="mt-1 break-all font-semibold text-slate-900">{prescription?._id}</dd></div>
        <div><dt className="text-sm text-slate-500">Received</dt><dd className="mt-1 font-semibold text-slate-900">{order?.orderDate ? new Date(order.orderDate).toLocaleString("en-IN") : "—"}</dd></div>
        <div><dt className="text-sm text-slate-500">Review status</dt><dd className="mt-1 font-semibold capitalize text-slate-900">{prescription?.status || "pending"}</dd></div>
      </dl>

      <section className="mt-6 rounded-lg bg-[#F0FBF7] p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2"><UserRound size={20} /><h3 className="font-semibold text-slate-900">Customer information</h3></div>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div><dt className="text-sm text-slate-500">Name</dt><dd className="mt-1 text-sm text-slate-900">{order?.user?.name || "Customer"}</dd></div>
          <div><dt className="text-sm text-slate-500">Phone</dt><dd className="mt-1 text-sm text-slate-900">{order?.user?.phone || "—"}</dd></div>
          <div className="sm:col-span-2"><dt className="text-sm text-slate-500">Delivery address</dt><dd className="mt-1 text-sm text-slate-900">{order?.deliveryAddress || "—"}</dd></div>
        </dl>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center gap-2"><ClipboardList size={20} /><h3 className="font-semibold text-slate-900">Uploaded prescription</h3></div>
        {images.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {images.map((image, index) => <img key={`${image}-${index}`} src={image} alt={`Prescription document ${index + 1}`} className="max-h-[480px] w-full rounded-lg border border-slate-200 object-contain" />)}
          </div>
        ) : <p className="text-sm text-slate-500">No prescription image is attached.</p>}
      </section>

      <section className="mt-6">
        <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-900" htmlFor="prescription-remarks"><MessageSquare size={18} />Review remarks</label>
        <textarea id="prescription-remarks" value={remarks} onChange={(event) => setRemarks(event.target.value)} rows="3" maxLength="500" disabled={prescription?.status !== "pending" || saving} className="w-full resize-y rounded-lg border border-slate-300 p-3 text-sm outline-none focus:border-emerald-600 disabled:bg-slate-50" />
      </section>

      <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={() => reviewPrescription("reject")} disabled={saving || prescription?.status !== "pending"} className="flex items-center justify-center gap-2 rounded-lg border border-red-500 px-5 py-2.5 text-sm font-medium text-red-600 disabled:cursor-not-allowed disabled:opacity-50"><XCircle size={18} />Reject</button>
        <button type="button" onClick={() => reviewPrescription("approve")} disabled={saving || prescription?.status !== "pending"} className="flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"><Check size={18} />Approve</button>
      </div>
    </div>
  );
};

export default PrescriptionDetails;