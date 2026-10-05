import {
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: 48,
    icon: Package,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "In Stock",
    value: 39,
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Low Stock",
    value: 6,
    icon: AlertTriangle,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Out of Stock",
    value: 3,
    icon: XCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
];

const InventoryStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${stat.iconBg}`}
            >
              <Icon size={21} className={stat.iconColor} />
            </div>

            <div>
              <p className="text-xs text-slate-500 sm:text-sm">
                {stat.title}
              </p>

              <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                {stat.value}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InventoryStats;