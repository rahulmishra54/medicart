const filters = [
  { label: "All", count: 48 },
  { label: "In Stock", count: 39 },
  { label: "Low Stock", count: 6 },
  { label: "Out of Stock", count: 3 },
];

const InventoryFilters = ({ activeFilter, setActiveFilter }) => {
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