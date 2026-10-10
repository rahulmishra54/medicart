import { Link, useParams } from "react-router-dom";
import PharmacistLayout from "./PharmacistLayout.jsx";

const EditMedicine = () => {
  const { medicineId } = useParams();

  return (
    <PharmacistLayout>
      <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm text-[#64748B]">Inventory / Medicine {medicineId}</p>
            <h1 className="mt-1 text-2xl font-bold text-[#17324D]">Edit medicine</h1>
          </div>
          <Link to="/pharmacist/inventory" className="text-sm font-semibold text-[#15966F] hover:underline">Back to inventory</Link>
        </div>
        <form onSubmit={(event) => event.preventDefault()} className="rounded-xl border border-[#E2EDF1] bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-[#17324D]">Medicine name<input defaultValue="Paracetamol 500 mg" className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" /></label>
            <label className="text-sm font-medium text-[#17324D]">Brand<input defaultValue="Crocin" className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" /></label>
            <label className="text-sm font-medium text-[#17324D]">Category<select defaultValue="Pain Relief" className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] bg-white px-3 text-sm outline-none focus:border-[#15966F]"><option>Pain Relief</option><option>Antibiotic</option><option>Supplements</option><option>Allergy Care</option></select></label>
            <label className="text-sm font-medium text-[#17324D]">Price (₹)<input type="number" min="0" defaultValue="32" className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" /></label>
            <label className="text-sm font-medium text-[#17324D]">Stock quantity<input type="number" min="0" defaultValue="48" className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" /></label>
            <label className="text-sm font-medium text-[#17324D]">Expiry date<input type="date" className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none focus:border-[#15966F]" /></label>
          </div>
          <label className="mt-5 block text-sm font-medium text-[#17324D]">Description<textarea rows="4" defaultValue="For temporary relief from pain and fever." className="mt-2 w-full resize-y rounded-lg border border-[#DCE7EC] p-3 text-sm outline-none focus:border-[#15966F]" /></label>
          <div className="mt-6 flex justify-end gap-3 border-t border-[#EEF3F5] pt-5">
            <Link to="/pharmacist/inventory" className="rounded-lg border border-[#DCE7EC] px-4 py-2.5 text-sm font-medium text-[#64748B]">Cancel</Link>
            <button type="submit" className="rounded-lg bg-[#15966F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#117F5E]">Save changes</button>
          </div>
        </form>
      </div>
    </PharmacistLayout>
  );
};

export default EditMedicine;