import { Search, Download } from "lucide-react";

const InventoryHeader = () => {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Inventory
        </h1>

        <p className="mt-1 text-sm text-slate-500 sm:text-base">
          Manage your medicine stock and availability
        </p>
      </div>

      <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
        
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search
            size={19}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search medicines..."
            className="h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
          />
        </div>

        {/* Export */}
        <button className="flex h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 text-sm font-medium text-white transition hover:bg-emerald-700">
          <Download size={18} />
          <span>Export</span>
        </button>

      </div>
    </div>
  );
};

export default InventoryHeader;