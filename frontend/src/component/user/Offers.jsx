
import { useEffect, useState } from "react";
import { ArrowRight, Pill, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/api.js";

const formatPrice = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 2,
}).format(value);

function Offers() {
  const [offerState, setOfferState] = useState({ status: "loading", medicines: [] });

  useEffect(() => {
    let isActive = true;

    api.get("/medicines/catalog", { params: { discounted: true } })
      .then(({ data }) => {
        if (!Array.isArray(data.medicines)) throw new Error("Unexpected catalog response");
        if (isActive) setOfferState({ status: "success", medicines: data.medicines });
      })
      .catch(() => {
        if (isActive) setOfferState({ status: "error", medicines: [] });
      });

    return () => {
      isActive = false;
    };
  }, []);

  const highlightedMedicine = offerState.medicines.reduce((best, medicine) => {
    const price = Number(medicine.price);
    const mrp = Number(medicine.mrp);
    const discount = mrp > price && mrp > 0 ? (mrp - price) / mrp : 0;
    return discount > (best?.discount || 0) ? { ...medicine, discount } : best;
  }, null);

  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-7 rounded-2xl border border-emerald-100 bg-[#edf8f4] p-5 sm:p-8 md:grid-cols-[1fr_0.9fr] lg:gap-12 lg:p-10">
        <div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#087d59]"><Tag size={16} />Current catalog pricing</span>
          <h2 className="mt-3 max-w-xl text-3xl font-bold leading-tight text-[#0B3154] sm:text-4xl">Good finds, at the price listed.</h2>
          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600 sm:text-base">See medicines with a current price below their listed MRP. Savings shown here come directly from the catalog.</p>
          <Link to="/medicines?discounted=true" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#08A875] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#067f5a]">
            Browse discounted medicines <ArrowRight size={16} />
          </Link>
        </div>

        <div className="min-w-0 rounded-xl border border-white bg-white p-4 shadow-sm sm:p-5">
          {offerState.status === "loading" ? (
            <p role="status" className="py-8 text-center text-sm text-slate-500">Checking current catalog prices...</p>
          ) : offerState.status === "error" ? (
            <p role="status" className="py-8 text-center text-sm text-slate-500">Current offers are temporarily unavailable.</p>
          ) : highlightedMedicine ? (
            <div className="flex min-w-0 items-center gap-4">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-[#eff8f4] p-3 sm:h-28 sm:w-28">
                <Pill size={30} className="absolute text-emerald-700" />
                {highlightedMedicine.image && <img src={highlightedMedicine.image} alt={highlightedMedicine.name} onError={(event) => event.currentTarget.remove()} className="relative h-full w-full object-contain" />}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#08A875]">Catalog savings</p>
                <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-5 text-[#0B3154]">{highlightedMedicine.name}</h3>
                <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-xl font-bold text-[#0B3154]">{formatPrice(Number(highlightedMedicine.price))}</span>
                  <span className="text-sm text-slate-400 line-through">{formatPrice(Number(highlightedMedicine.mrp))}</span>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800">{Math.round(highlightedMedicine.discount * 100)}% less</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-5 text-center">
              <p className="text-sm font-semibold text-[#0B3154]">No discounted medicines are listed right now.</p>
              <p className="mt-1 text-sm text-slate-500">Browse the full catalog for current availability and pricing.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Offers;
