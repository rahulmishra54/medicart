import { Building2, FileText, MapPin, Phone } from "lucide-react";
import { useSelector } from "react-redux";
import PharmacistLayout from "./PharmacistLayout.jsx";

const PharmacyProfile = () => {
  const pharmacy = useSelector((state) => state.auth.user);

  return <PharmacistLayout>
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6 lg:p-8">
      <header><p className="text-sm text-[#64748B]">Account settings</p><h1 className="mt-1 text-2xl font-bold text-[#17324D] sm:text-3xl">Pharmacy profile</h1><p className="mt-1 text-sm text-[#718096]">Manage your store details and contact information.</p></header>
      <section className="overflow-hidden rounded-xl border border-[#E2EDF1] bg-white">
        <div className="flex items-center gap-3 border-b border-[#EEF3F5] px-5 py-4"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E5F6F0] text-[#15966F]"><Building2 size={20} /></span><div><h2 className="font-semibold text-[#17324D]">Store information</h2><p className="text-sm text-[#718096]">Business identity and licensing</p></div></div>
        <div className="grid gap-5 p-5 sm:grid-cols-2">
          <label className="text-sm font-medium text-[#17324D]">Pharmacy name<input value={pharmacy?.name || ""} readOnly className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none" /></label>
          <label className="text-sm font-medium text-[#17324D]">Email<input value={pharmacy?.email || ""} readOnly className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none" /></label>
          <label className="text-sm font-medium text-[#17324D]"><span className="inline-flex items-center gap-2"><Phone size={15} /> Phone number</span><input type="tel" value={pharmacy?.phone || ""} readOnly className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none" /></label>
          <label className="text-sm font-medium text-[#17324D]"><span className="inline-flex items-center gap-2"><FileText size={15} /> Drug license number</span><input value={pharmacy?.licenseNumber || ""} readOnly className="mt-2 h-11 w-full rounded-lg border border-[#DCE7EC] px-3 text-sm outline-none" /></label>
          <label className="text-sm font-medium text-[#17324D] sm:col-span-2"><span className="inline-flex items-center gap-2"><MapPin size={15} /> Store address</span><textarea rows="3" value={pharmacy?.address || ""} readOnly className="mt-2 w-full resize-y rounded-lg border border-[#DCE7EC] p-3 text-sm outline-none" /></label>
        </div>
      </section>
    </div>
  </PharmacistLayout>;
};

export default PharmacyProfile;