import { useEffect, useState } from "react";
import {
  ArrowRight,
  Baby,
  Bandage,
  HeartPulse,
  Pill,
  ShieldPlus,
  Stethoscope,
  Tablets,
} from "lucide-react";
import { Link } from "react-router-dom";
import api from "../../api/api.js";

function Category({ categories: providedCategories, selectedCategory, onSelectCategory, showAll = false }) {
  const [categories, setCategories] = useState([]);
  const isInteractive = typeof onSelectCategory === "function";

  useEffect(() => {
    if (providedCategories !== undefined) return;

    api.get("/categories/").then((res) => {
      setCategories(Array.isArray(res.data.categories) ? res.data.categories : []);
    });
  }, [providedCategories]);

  const categoryList = (providedCategories ?? categories)
    .filter((category) => category.active !== false);

  const iconForCategory = (name) => {
    const normalizedName = name.toLowerCase();
    if (normalizedName.includes("vitamin") || normalizedName.includes("supplement")) return HeartPulse;
    if (normalizedName.includes("baby") || normalizedName.includes("mother")) return Baby;
    if (normalizedName.includes("first aid") || normalizedName.includes("wound")) return Bandage;
    if (normalizedName.includes("diabetes") || normalizedName.includes("care")) return ShieldPlus;
    if (normalizedName.includes("prescription") || normalizedName.includes("antibiotic")) return Tablets;
    if (normalizedName.includes("health") || normalizedName.includes("medical")) return Stethoscope;
    return Pill;
  };

  if (isInteractive) {
    return (
      <section className="bg-white px-4 pt-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-xl font-bold text-[#0B3154] sm:text-2xl">Browse by Category</h2>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
            <button
              type="button"
              aria-pressed={selectedCategory === "all"}
              onClick={() => onSelectCategory("all")}
              className={`flex min-h-20 min-w-36 shrink-0 items-center gap-3 rounded-xl border px-4 text-left transition ${
                selectedCategory === "all"
                  ? "border-[#08A875] bg-[#DDF7F0] text-[#07865F]"
                  : "border-[#E5EDF3] bg-white text-[#0B3154] hover:border-[#9DDCC8] hover:bg-[#F8FCFA]"
              }`}
            >
              <Pill size={22} aria-hidden="true" />
              <span className="text-sm font-semibold">All Medicines</span>
            </button>
            {categoryList.map((category) => {
              const Icon = iconForCategory(category.name || "");
              const isSelected = selectedCategory === category._id;

              return (
                <button
                  key={category._id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onSelectCategory(category._id)}
                  className={`flex min-h-20 min-w-36 shrink-0 items-center gap-3 rounded-xl border px-4 text-left transition ${
                    isSelected
                      ? "border-[#08A875] bg-[#DDF7F0] text-[#07865F]"
                      : "border-[#E5EDF3] bg-white text-[#0B3154] hover:border-[#9DDCC8] hover:bg-[#F8FCFA]"
                  }`}
                >
                  <Icon size={22} aria-hidden="true" />
                  <span className="text-sm font-semibold">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#f6f9fb] px-6 pt-10 pb-5 sm:pt-12 sm:pb-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#0B3154]">
              MedicineCategories
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Find what you need quickly
            </p>
          </div>

          <Link
            to="/categories"
            className="flex items-center gap-1 font-semibold text-[#08A875]"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {(showAll ? categoryList : categoryList.slice(0, 8))
            .map((category, index) => {
              const icons = [Pill, HeartPulse, Baby, Stethoscope];
              const Icon = icons[index % icons.length];

              return (
                <Link
                  key={category._id}
                  to={`/medicines?category=${category._id}`}
                  className="rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md"
                >
                  <Icon size={28} className="text-[#08A875]" />

                  <h3 className="mt-4 text-sm font-semibold text-[#0B3154]">
                    {category.name}
                  </h3>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default Category;