
import {
  CheckCircle2,
  FolderTree,
  Package,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import api from "../../api/api.js";
import { getCategoryStats } from "../../redux/category.js";

const CategoryStats = () => {
  const dispatch = useDispatch();

  
  const categoryStats = useSelector(
    (state) => state.category.categoryStats
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const response = await api.get("/admin/categories/stats");

      
        dispatch(getCategoryStats(response.data.stats));
      } catch (error) {
        console.error(
          "Failed to fetch category statistics:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryStats();
  }, [dispatch]);

  
  const {
    totalCategories = 0,
    activeCategories = 0,
    inactiveCategories = 0,
    totalProducts = 0,
  } = categoryStats || {};

  const stats = [
    {
      label: "Total Categories",
      value: totalCategories,
      icon: FolderTree,
      color: "text-[#237DA8]",
      bg: "bg-[#EDF7FC]",
    },
    {
      label: "Active Categories",
      value: activeCategories,
      icon: CheckCircle2,
      color: "text-[#15966F]",
      bg: "bg-[#E5F6F0]",
    },
    {
      label: "Inactive Categories",
      value: inactiveCategories,
      icon: XCircle,
      color: "text-[#D97706]",
      bg: "bg-amber-50",
    },
    {
      label: "Products Across Categories",
      value: totalProducts,
      icon: Package,
      color: "text-[#64748B]",
      bg: "bg-slate-100",
    },
  ];

  return (
    <section
      aria-label="Category statistics"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4"
    >
      {stats.map(({ label, value, icon: Icon, color, bg }) => (
        <article
          key={label}
          className="flex min-w-0 items-center gap-3 rounded-xl border border-[#E2EDF1] bg-white p-4 shadow-sm sm:p-5"
        >
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${color}`}
          >
            <Icon size={20} />
          </span>

          <div className="min-w-0">
            <p className="text-xs leading-5 text-[#718096] sm:text-sm">
              {label}
            </p>

            <p className="mt-1 text-xl font-bold text-[#17324D]">
              {loading ? "..." : value.toLocaleString()}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
};

export default CategoryStats;
