
import { useEffect, useState } from "react";

import {
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
} from "lucide-react";

import Footer from "../../component/user/Footer.jsx";

import FeatureMedicines from "../../component/user/FeatureMedicines.jsx";
import Navbar from "../../component/user/Navbar.jsx";
import HeroSection from "../../component/user/HeroSection.jsx";

import api from "../../api/api.js";

function Home() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  const fetchMedicines = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/medicines/");
      setMedicines(response.data.medicines);
    } catch (error) {
      setError(
        error.response?.data?.message || "Unable to load medicines."
      );
    } finally {
      setLoading(false);
    }
  };

  fetchMedicines();
}, []);

  return (
    <div className="min-h-screen w-full min-w-0 bg-white">
      <Navbar />

      <main className="w-full min-w-0">
        {/* Hero section + Special Offers */}
        <HeroSection />

        

        {/* Featured medicines */}
        <FeatureMedicines
          medicines={medicines}
          isLoading={loading}
          error={error}
        />

        {/* Why choose MediCart */}
        <section className="border-y border-slate-100 bg-[#f6fafc] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#08A875]">
                Made for everyday care
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0B3154]">
                Why Choose MediCart?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-600">
                Convenient access to healthcare essentials with clear
                product information and a simple shopping experience.
              </p>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex gap-3">
                <PackageCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-[#08A875]"
                />

                <div>
                  <h3 className="text-sm font-semibold text-[#0B3154]">
                    Current Availability
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    See stock status from active product listings.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <ShieldCheck
                  size={22}
                  className="mt-0.5 shrink-0 text-[#08A875]"
                />

                <div>
                  <h3 className="text-sm font-semibold text-[#0B3154]">
                    Clear Product Pricing
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Compare listed prices and MRP when both are available.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <ShoppingCart
                  size={22}
                  className="mt-0.5 shrink-0 text-[#08A875]"
                />

                <div>
                  <h3 className="text-sm font-semibold text-[#0B3154]">
                    Simple Cart Workflow
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Add in-stock medicines to your customer cart.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;