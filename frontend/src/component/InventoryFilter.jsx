

const InventoryFilters = ({ activeFilter, setActiveFilter ,stats}) => {
  const filters = [
  { label: "All", count: stats.totalMedicines },
  { label: "In Stock", count: stats.inStockMedicines },
  { label: "Low Stock", count: stats.lowStockMedicines },
  { label: "Out of Stock", count: stats.outOfStockMedicines },
];
  return (
    <div className="flex gap-2 overflow-x-auto pb-1">
      {filters.map((filter) => {
        const active = activeFilter === filter.label;

        return (
          <button
            key={filter.label}
            onClick={() => setActiveFilter(filter.label)}
            className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-emerald-600 text-white"
                : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            {filter.label} ({filter.count})
          </button>
        );
      })}
    </div>
  );
};

export default InventoryFilters;