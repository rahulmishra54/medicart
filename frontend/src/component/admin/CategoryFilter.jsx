import { Search } from "lucide-react";

const CategoryFilter = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
}) => (
  <section className="flex min-w-0 flex-col gap-3 rounded-xl border border-[#E2EDF1] bg-white p-3 sm:p-4 md:flex-row md:items-center md:justify-between">
    
    {/* Search */}
    <label className="relative block min-w-0 flex-1">
      <span className="sr-only">
        Search categories by name
      </span>

      <Search
        size={18}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
      />

      <input
        type="search"
        value={search}
        onChange={(event) =>
          onSearchChange(event.target.value)
        }
        placeholder="Search categories by name..."
        className="h-11 w-full min-w-0 rounded-lg border border-[#DCE7EC] bg-white pl-10 pr-3 text-sm text-[#17324D] outline-none placeholder:text-[#94A3B8] focus:border-[#15966F] focus:ring-2 focus:ring-[#15966F]/10"
      />
    </label>

    {/* Status */}
    <label className="flex min-w-0 flex-col gap-1.5 text-xs font-medium text-[#64748B] sm:flex-row sm:items-center sm:gap-3">
      
      <span>Status</span>

      <select
        value={status}
        onChange={(event) =>
          onStatusChange(event.target.value)
        }
        className="h-11 w-full min-w-0 rounded-lg border border-[#DCE7EC] bg-white px-3 text-sm text-[#17324D] outline-none focus:border-[#15966F] sm:w-44"
      >
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

    </label>
  </section>
);

export default CategoryFilter;