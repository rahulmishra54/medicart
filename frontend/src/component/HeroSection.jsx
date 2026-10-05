import React from "react";
import {
  BadgeCheck,
  ArrowRight,
  Users,
  Pill,
  Store,
  Headset,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";

// Update this path to wherever your doctor image lives
import heroImage from "../assets/heroImage.png";

const stats = [
  { icon: Users, value: "1M+", label: "Happy Customers" },
  { icon: Pill, value: "10K+", label: "Medicines & Products" },
  { icon: Store, value: "500+", label: "Partner Pharmacies" },
  { icon: Headset, value: "24/7", label: "Customer Support" },
];

const features = [
  { icon: ShieldCheck, lines: ["100% Genuine", "Medicines"] },
  { icon: Truck, lines: ["Home", "Delivery"] },
  { icon: CreditCard, lines: ["Safe & Secure", "Payments"] },
  { icon: Headset, lines: ["Expert", "Support"] },
];

export default function HeroSection() {
  return (
    <section className="w-full overflow-hidden bg-[#f2f9fc]">
      <div className="grid w-full grid-cols-1 items-stretch md:min-h-[520px] md:grid-cols-[52fr_48fr] lg:min-h-[560px]">
        {/* LEFT */}
        <div className="flex flex-col px-5 py-10 sm:px-8 md:py-10 lg:py-12 lg:pl-16 lg:pr-6 xl:pl-24">
          <div className="flex flex-1 flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emerald-100/70 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-emerald-200/60">
              <BadgeCheck className="h-3.5 w-3.5" />
              Trusted by 1M+ Customers
            </span>

            <h1 className="mt-5 text-5xl font-extrabold leading-[1.08] tracking-tight text-[#0b2545] lg:text-6xl">
              Your Health
              <br />
              Our <span className="text-green-600">Priority</span>
            </h1>

            <p className="mt-5 max-w-sm text-base leading-relaxed text-slate-600">
              Get genuine medicines, healthcare products and expert support —
              delivered to your doorstep.
            </p>

            <a
              href="#medicines"
              className="mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
            >
              Explore Medicines
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-5 lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon className="h-6 w-6 shrink-0 text-green-600" />
                <div>
                  <p className="text-base font-bold leading-none text-[#0b2545]">{value}</p>
                  <p className="mt-1 text-[11px] leading-tight text-slate-500">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex flex-col bg-[#e8f4f8] md:flex-row md:items-center">
          {/* visual area: shapes, handwritten text, doctor */}
          <div className="relative h-[340px] w-full sm:h-[420px] md:h-auto md:flex-1 md:self-stretch">
            <div className="absolute left-1/2 top-1/2 aspect-square h-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal-100/60" />
            <div className="absolute bottom-6 left-[8%] aspect-square h-[22%] rounded-full bg-emerald-200/40" />

            <img
              src={heroImage}
              alt="Smiling doctor with stethoscope"
              className="absolute bottom-0 right-0 z-10 h-full w-[85%] object-contain object-bottom lg:w-[78%]"
            />

            <p
              className="absolute left-4 top-6 z-20 -rotate-6 text-xl leading-tight text-[#0b2545] md:left-2 md:text-base lg:left-4 lg:text-2xl xl:text-3xl"
              style={{ fontFamily: "'Segoe Script','Brush Script MT','Comic Sans MS',cursive", fontStyle: "italic" }}
            >
              A Healthier
              <br />
              Tomorrow
              <br />
              Together
            </p>
          </div>

          {/* feature cards */}
          <div className="grid grid-cols-2 gap-3 px-4 pb-8 pt-2 sm:px-8 md:mr-4 md:w-44 md:shrink-0 md:grid-cols-1 md:p-0 lg:mr-8 lg:w-48">
            {features.map(({ icon: Icon, lines }) => (
              <div
                key={lines[0]}
                className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-md shadow-slate-200/70"
              >
                <Icon className="h-6 w-6 shrink-0 text-green-600" />
                <p className="text-xs font-semibold leading-tight text-[#0b2545]">
                  {lines[0]}
                  <br />
                  {lines[1]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}