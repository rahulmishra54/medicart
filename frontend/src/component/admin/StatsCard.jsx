const StatsCard = ({ label, value, icon: Icon, color, bg, loading = false }) => (
  <article className="flex min-w-0 items-center gap-3 rounded-xl border border-[#E2EDF1] bg-white p-4 shadow-sm sm:p-5">
    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg} ${color}`}>
      <Icon size={20} />
    </span>
    <div className="min-w-0">
      <p className="text-xs leading-5 text-[#718096] sm:text-sm">{label}</p>
      <p className="mt-1 text-xl font-bold text-[#17324D]">
        {loading ? "..." : Number(value || 0).toLocaleString()}
      </p>
    </div>
  </article>
);

export default StatsCard;