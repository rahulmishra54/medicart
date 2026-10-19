
import { ArrowRight, Headphones, Heart, PackageCheck, ShieldCheck, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import {useEffect,useState} from "react"
import Footer from "../../component/user/Footer.jsx";
import heroImage from "../../assets/heroImage.png";
import Category from "../../component/user/Category.jsx";
import FeatureMedicines from "../../component/user/FeatureMedicines.jsx";
import Navbar from "../../component/user/Navbar.jsx";

import api from "../../api/api.js";
function Home() {
const [medicines, setMedicines] = useState([]);

useEffect(() => {
  const fetchMedicines = async () => {
    try {
      const response = await api.get("/medicines/all-medicines");

      console.log(response.data.medicines);
      setMedicines(response.data.medicines);
    } catch (error) {
      console.log(error);
    }
  };

  fetchMedicines();
}, []);




  return (
    <div className="min-h-screen w-full min-w-0 bg-white">
      <Navbar />

      <main className="w-full min-w-0">
        <section className="bg-[#edf8f4]">
          <div className="mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 items-center gap-5 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-6 lg:gap-8 lg:px-8 lg:py-14">
            <div className="relative z-10 min-w-0 max-w-xl py-2">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[#08A875]">
                <span className="h-2 w-2 rounded-full bg-[#08A875]" />
                Your neighborhood pharmacy, online
              </p>
              <h1 className="mt-4 text-3xl font-bold leading-[1.12] text-[#0B3154] sm:text-4xl md:text-3xl lg:text-4xl xl:text-5xl">
                Your Health, <span className="text-[#08A875]">Delivered with Care.</span>
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                Find medicines and everyday healthcare essentials in one simple place.
                Browse current product details, save favorites, and manage your cart.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/medicines" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#08A875] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#067f5a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B3154]">
                  Explore Medicines <ArrowRight size={17} />
                </Link>
                <Link to="/categories" className="inline-flex min-h-12 items-center justify-center rounded-lg border border-[#d3e6df] bg-white px-5 py-3 text-sm font-semibold text-[#0B3154] transition hover:border-[#08A875] hover:bg-[#f8fcfa]">
                  Browse Categories
                </Link>
              </div>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-xs font-medium text-slate-600 sm:text-sm">
                <span className="inline-flex items-center gap-2"><PackageCheck size={16} className="text-[#08A875]" />Live product availability</span>
                <span className="inline-flex items-center gap-2"><Heart size={16} className="text-[#08A875]" />Wishlist for favorites</span>
                <span className="inline-flex items-center gap-2"><Headphones size={16} className="text-[#08A875]" />Customer contact support</span>
              </div>
            </div>

            <div className="relative mx-auto aspect-1375/1118 w-full min-w-0 max-w-152">
              <img src={heroImage} alt="Healthcare professional with MediCart products" className="absolute inset-0 h-full w-full max-w-full object-contain" />
            </div>
          </div>
        </section>

        <Category />

        <FeatureMedicines  medicines = {medicines}/>

        <section className="border-y border-slate-100 bg-[#f6fafc] px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#08A875]">Made for everyday care</p>
              <h2 className="mt-2 text-2xl font-bold text-[#0B3154]">Why Choose MediCart?</h2>
            </div>
            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
              <div className="flex gap-3">
                <PackageCheck size={21} className="mt-0.5 shrink-0 text-[#08A875]" />
                <div><h3 className="text-sm font-semibold text-[#0B3154]">Current availability</h3><p className="mt-1 text-sm leading-6 text-slate-600">See stock status from active product listings.</p></div>
              </div>
              <div className="flex gap-3">
                <Heart size={21} className="mt-0.5 shrink-0 text-[#08A875]" />
                <div><h3 className="text-sm font-semibold text-[#0B3154]">Save your favorites</h3><p className="mt-1 text-sm leading-6 text-slate-600">Keep selected medicines in your wishlist for later.</p></div>
              </div>
              <div className="flex gap-3">
                <ShieldCheck size={21} className="mt-0.5 shrink-0 text-[#08A875]" />
                <div><h3 className="text-sm font-semibold text-[#0B3154]">Clear product pricing</h3><p className="mt-1 text-sm leading-6 text-slate-600">Compare listed prices and MRP when both are available.</p></div>
              </div>
              <div className="flex gap-3">
                <ShoppingCart size={21} className="mt-0.5 shrink-0 text-[#08A875]" />
                <div><h3 className="text-sm font-semibold text-[#0B3154]">Simple cart workflow</h3><p className="mt-1 text-sm leading-6 text-slate-600">Add in-stock medicines to your customer cart.</p></div>
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