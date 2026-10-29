import { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Dashboard", to: "/pharmacist" },
  { label: "Inventory", to: "/pharmacist/inventory" },
  { label: "Orders", to: "/pharmacist/orders" },
  { label: "Prescriptions", to: "/pharmacist/prescriptions" },
  { label: "Pharmacy Profile", to: "/pharmacist/profile" },
];

const Sidebar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <aside className="border-b border-[#E2EDF1] bg-white lg:min-h-[calc(100vh-68px)] lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r">
      <div className="flex items-center justify-between px-4 py-2 lg:hidden">
        <span className="text-sm font-semibold text-[#17324D]">Pharmacy menu</span>
        <button
          type="button"
          aria-controls="pharmacist-navigation"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close pharmacy navigation" : "Open pharmacy navigation"}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2EDF1] text-[#17324D] hover:bg-[#F6FAFC]"
        >
          {menuOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      <nav
        id="pharmacist-navigation"
        aria-label="Pharmacist navigation"
        className={`${menuOpen ? "grid" : "hidden"} grid-cols-2 gap-1 p-3 lg:flex lg:flex-col lg:gap-1.5 lg:p-4`}
      >
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/pharmacist"}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2.5 text-center text-sm font-medium transition ${
                isActive
                  ? "bg-[#E5F6F0] text-[#117F5E]"
                  : "text-[#64748B] hover:bg-[#F6FAFC] hover:text-[#17324D]"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;