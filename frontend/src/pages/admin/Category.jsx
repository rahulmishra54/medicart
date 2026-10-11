import { CheckCircle2, FolderTree, Package, Plus, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../component/admin/AdminSidebar.jsx";
import CategoryFilter from "../../component/admin/CategoryFilter.jsx";
import CategoryStats from "../../component/admin/CategoryStats.jsx";
import CategoryTable from "../../component/admin/CategoryTable.jsx";
import PharmistNavBar from "../../component/PharmistNavBar.jsx";
import { getCategoryStats } from "../../redux/category.js";
import api from "../../api/api.js";
import { useNavigate } from "react-router-dom";



const Category = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.category.categories);
  const categoryStats = useSelector((state) => state.category.categoryStats);

  useEffect(() => {
    const fetchCategoryStats = async () => {
      try {
        const response = await api.get("/admin/categories/stats");
        dispatch(getCategoryStats(response.data.stats));
      } catch (error) {
        console.error("Failed to fetch category statistics:", error);
      }
    };

    fetchCategoryStats();
  }, [dispatch]);

  const stats = [
    {
      title: "Total Categories",
      value: categories.length,
      icon: FolderTree,
      color: "text-[#237DA8]",
      bg: "bg-[#EDF7FC]",
    },
    {
      title: "Active Categories",
      value: categories.filter((category) => category.active).length,
      icon: CheckCircle2,
      color: "text-[#15966F]",
      bg: "bg-[#E5F6F0]",
    },
    {
      title: "Inactive Categories",
      value: categories.filter((category) => !category.active).length,
      icon: XCircle,
      color: "text-[#D97706]",
      bg: "bg-amber-50",
    },
    {
      title: "Products Across Categories",
      value: categoryStats?.productsAcrossCategories || 0,
      icon: Package,
      color: "text-[#64748B]",
      bg: "bg-slate-100",
    },
  ];

  return (
    <div className="w-full bg-[#F5FAFC]">

      <PharmistNavBar
        
      />

      <div className="lg:flex">

        <AdminSidebar />

        <main className="min-w-0 flex-1">

          <div className="mx-auto max-w-7xl space-y-5 p-4 sm:space-y-6 sm:p-6 lg:p-8">

            {/* Header */}
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

              <div>
                <p className="text-sm font-medium text-[#15966F]">
                  Catalog management
                </p>

                <h1 className="mt-1 text-2xl font-bold text-[#17324D] sm:text-3xl">
                  Category Management
                </h1>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-[#718096]">
                  Organize product categories and manage their availability.
                </p>
              </div>

              <button
                type="button"
                className="inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#15966F] px-4 text-sm font-semibold text-white transition hover:bg-[#117F5E] sm:w-auto"
              onClick={()=>{navigate("/admin/Category/create")}}
              >
                <Plus size={18} />
                Add Category
              </button>

            </header>

            {/* Stats */}
            <CategoryStats stats={stats} />

            {/* Filter UI */}
            <CategoryFilter />

            {/* Table */}
            <CategoryTable  />

          </div>

        </main>
      </div>
    </div>
  );
};

export default Category;