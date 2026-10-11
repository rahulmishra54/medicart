import {
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,
} from "lucide-react";

const InventoryStats = ({ stats = {} }) => {
  const statCards = [
    {
      title: "Total Products",
      value: stats.totalMedicines ?? 0,
      icon: Package,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "In Stock",
      value: stats.inStockMedicines ?? 0,
      icon: CheckCircle,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Low Stock",
      value: stats.lowStockMedicines ?? 0,
      icon: AlertTriangle,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Out of Stock",
      value: stats.outOfStockMedicines ?? 0,
      icon: XCircle,
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {statCards.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5"
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.iconBg}`}
            >
              <Icon size={21} className={item.iconColor} />
            </div>

            <div>
              <p className="text-xs text-slate-500 sm:text-sm">{item.title}</p>
              <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl">
                {item.value}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InventoryStats;