
import React from "react";
import {
  ArrowRight,
  ShieldCheck,
  Truck,
  Headset,
  BadgeCheck,
  Pill,
  HeartPulse,
  Activity,
  Sparkles,
} from "lucide-react";

import heroImage from "../../assets/heroImage.png";

const offers = [
  {
    id: 1,
    badge: "SAVE MORE",
    discount: "20% OFF",
    title: "Vitamins & Supplements",
    description: "Everyday wellness essentials",
    category: "vitamins",
    icon: Sparkles,
    background: "bg-gradient-to-br from-rose-50 to-orange-50",
    accent: "text-rose-700",
    button: "bg-rose-600 hover:bg-rose-700",
  },
  {
    id: 2,
    badge: "SELF CARE",
    discount: "30% OFF",
    title: "Personal Care",
    description: "Care for yourself every day",
    category: "personal-care",
    icon: HeartPulse,
    background: "bg-gradient-to-br from-emerald-50 to-teal-100",
    accent: "text-emerald-800",
    button: "bg-emerald-600 hover:bg-emerald-700",
  },
  {
    id: 3,
    badge: "HEALTH ESSENTIALS",
    discount: "25% OFF",
    title: "Diabetes Care",
    description: "Monitoring and daily essentials",
    category: "diabetes-care",
    icon: Activity,
    background: "bg-gradient-to-br from-sky-50 to-blue-100",
    accent: "text-blue-900",
    button: "bg-blue-700 hover:bg-blue-800",
  },
  {
    id: 4,
    badge: "DAILY ESSENTIALS",
    discount: "SPECIAL DEALS",
    title: "Pain Relief",
    description: "Explore eligible pain relief products",
    category: "pain-relief",
    icon: Pill,
    background: "bg-gradient-to-br from-amber-50 to-yellow-100",
    accent: "text-amber-900",
    button: "bg-emerald-600 hover:bg-emerald-700",
  },
];

const trustItems = [
  { icon: ShieldCheck, label: "Genuine Products" },
  { icon: Truck, label: "Reliable Delivery" },
  { icon: Headset, label: "Customer Support" },
];

export default function HeroSection() {
  return (
    <main className="w-full overflow-hidden bg-white">
      {/* ================= HERO SECTION ================= */}
      <section className="relative isolate overflow-hidden bg-[#eff9f6]">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="pointer-events-none absolute right-[15%] top-0 h-80 w-80 rounded-full bg-cyan-100/40 blur-3xl" />

        <div className="relative mx-auto grid min-h-[480px] w-full max-w-[1800px] grid-cols-1 lg:min-h-[440px] lg:grid-cols-2 xl:min-h-[470px]">
          {/* LEFT CONTENT */}
          <div className="relative z-20 flex min-w-0 flex-col justify-center px-5 py-10 sm:px-8 md:px-12 lg:px-10 lg:py-12 xl:px-16">
            <div className="mb-5 flex w-fit max-w-full items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-2">
              <BadgeCheck className="h-4 w-4 shrink-0 text-[#08a875]" />
              <span className="text-xs font-semibold text-[#087e5b] sm:text-sm">
                Your neighborhood pharmacy, online
              </span>
            </div>

            <h1 className="max-w-2xl text-[2.6rem] font-extrabold leading-[1.08] tracking-tight text-[#0b3154] sm:text-6xl lg:text-[3.25rem] xl:text-[3.8rem]">
              Your Health,
              <br />
              <span className="text-[#08a875]">Delivered</span>
              <br />
              <span className="text-[#08a875]">with Care.</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
              Find medicines and everyday healthcare essentials in one simple
              place. Browse product details and manage your cart with ease.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={"/medicines"}
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#08a875] px-6 py-3 font-semibold text-white shadow-md shadow-emerald-800/10 transition hover:bg-[#078b63]"
              >
                Explore Medicines
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#categories"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#d4e8e1] bg-white px-6 py-3 font-semibold text-[#0b3154] transition hover:border-[#08a875]"
              >
                Browse Categories
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
              {trustItems.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600"
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#08a875]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative min-h-[360px] overflow-hidden bg-[#eff9f6] sm:min-h-[440px] lg:min-h-0">
            <div className="pointer-events-none absolute right-[8%] top-[8%] h-56 w-56 rounded-full bg-[#b7f4e5]/70 sm:h-72 sm:w-72 xl:h-80 xl:w-80" />

            <div className="pointer-events-none absolute bottom-[10%] left-[12%] h-36 w-36 rounded-full bg-emerald-100/70 blur-2xl" />

            <img
              src={heroImage}
              alt="Healthcare professional and MediCart products"
              fetchPriority="high"
              className="absolute inset-0 z-10 h-full w-full object-contain object-center"
            />

            <div className="pointer-events-none absolute left-[5%] top-[13%] z-20 -rotate-6 sm:left-[8%]">
              <p
                className="text-center text-xl leading-tight text-[#0b3154] sm:text-2xl xl:text-3xl"
                style={{
                  fontFamily: "'Brush Script MT', 'Segoe Script', cursive",
                  fontStyle: "italic",
                }}
              >
                A Healthier
                <br />
                Tomorrow
                <br />
                Together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SPECIAL OFFERS / ADS ================= */}
      <section
        id="offers"
        className="bg-gradient-to-r from-[#f1faf7] via-white to-[#eaf8f3] px-4 py-7 sm:px-6 lg:px-8 lg:py-8"
      >
        <div className="mx-auto max-w-[1800px]">
          {/* Section heading */}
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-extrabold tracking-tight text-[#0b3154] sm:text-2xl lg:text-3xl">
                Special Offers for a Healthier You
              </h2>
              <p className="mt-1 text-sm text-slate-600 sm:text-base">
                Discover offers on your favorite healthcare products.
              </p>
            </div>

            
          </div>

          {/* Offer cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {offers.map((offer) => {
              const Icon = offer.icon;

              return (
                <article
                  key={offer.id}
                  className={`group relative flex min-h-[190px] flex-col overflow-hidden rounded-2xl border border-white/80 ${offer.background} p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg`}
                >
                  {/* Decorative icon artwork */}
                  <div className="pointer-events-none absolute -right-4 -top-4 flex h-32 w-32 items-center justify-center rounded-full bg-white/45 transition-transform duration-500 group-hover:scale-110">
                    <Icon className={`h-16 w-16 ${offer.accent} opacity-20`} />
                  </div>

                  <div className="relative z-10">
                    <span className={`text-[10px] font-bold uppercase tracking-wider ${offer.accent}`}>
                      {offer.badge}
                    </span>

                    <h3 className={`mt-2 text-2xl font-extrabold tracking-tight ${offer.accent}`}>
                      {offer.discount}
                    </h3>

                    <p className="mt-1 max-w-[220px] text-sm font-bold text-[#0b3154]">
                      {offer.title}
                    </p>

                    <p className="mt-1 max-w-[220px] text-xs leading-5 text-slate-600">
                      {offer.description}
                    </p>

                    
                  </div>

                  <div className="pointer-events-none absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/70 text-[#08a875] shadow-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                </article>
              );
            })}
          </div>

          
        </div>
      </section>
    </main>
  );
}
