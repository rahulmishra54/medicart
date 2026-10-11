import { Layers3, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className="w-full shrink-0 overflow-x-hidden border-b border-[#E2EDF1] bg-white lg:min-h-[calc(100vh-68px)] lg:w-60 lg:border-b-0 lg:border-r">
      
      {/* Mobile Header */}
      <div className="flex items-center justify-between px-4 py-3 lg:hidden">
        <span className="text-sm font-semibold text-[#17324D]">
          Admin menu
        </span>

        <button
          type="button"
          aria-controls="admin-navigation"
          aria-expanded={menuOpen}
          aria-label={
            menuOpen
              ? "Close admin navigation"
              : "Open admin navigation"
          }
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2EDF1] text-[#17324D] hover:bg-[#F6FAFC]"
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden items-center gap-3 border-b border-[#EEF3F5] px-5 py-5 lg:flex">
        
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E5F6F0] text-[#15966F]">
          <Layers3 size={20} />
        </span>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#17324D]">
            MediCart Admin
          </p>

          <p className="text-xs text-[#718096]">
            Management
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav
        id="admin-navigation"
        aria-label="Admin navigation"
        className={`${
          menuOpen ? "grid" : "hidden"
        } gap-1 overflow-x-hidden p-3 lg:flex lg:flex-col lg:gap-1.5 lg:p-4`}
      >
        <NavLink
          to="/admin/categories"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-[#E5F6F0] text-[#117F5E]"
                : "text-[#64748B] hover:bg-[#F6FAFC] hover:text-[#17324D]"
            }`
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="/admin/medicines"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-[#E5F6F0] text-[#117F5E]"
                : "text-[#64748B] hover:bg-[#F6FAFC] hover:text-[#17324D]"
            }`
          }
        >
          Medicines
        </NavLink>
        <NavLink
          to="/admin/pharmacies"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-[#E5F6F0] text-[#117F5E]"
                : "text-[#64748B] hover:bg-[#F6FAFC] hover:text-[#17324D]"
            }`
          }
        >
          Pharmacies
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;