import { Plus } from "lucide-react";
import AdminSidebar from "../../component/admin/AdminSidebar.jsx";
import CategoryFilter from "../../component/admin/CategoryFilter.jsx";
import CategoryStats from "../../component/admin/CategoryStats.jsx";
import CategoryTable from "../../component/admin/CategoryTable.jsx";
import PharmistNavBar from "../../component/PharmistNavBar.jsx";

import {useNavigate} from "react-router-dom";



const Category = () => {
  const navigate = useNavigate();
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
            <CategoryStats  />

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