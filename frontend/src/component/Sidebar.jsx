import { NavLink } from "react-router-dom";

const navigation = [
  { label: "Dashboard", to: "/pharmacist" },
  { label: "Inventory", to: "/pharmacist/inventory" },
  { label: "Orders", to: "/pharmacist/orders" },
  { label: "Prescriptions", to: "/pharmacist/prescriptions" },
  { label: "Pharmacy Profile", to: "/pharmacist/profile" },
];

const Sidebar = () => {
  return (
    <aside className="border-b border-[#E2EDF1] bg-white lg:min-h-[calc(100vh-68px)] lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r">
      <nav
        aria-label="Pharmacist navigation"
        className="grid grid-cols-2 gap-1 p-3 sm:flex sm:flex-wrap lg:flex-col lg:gap-1.5 lg:p-4"
      >
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/pharmacist"}
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