
import StatsCard from "./StatsCard.jsx";

const CategoryStats = ({ stats, loading = false }) => {
  return (
    <section
      aria-label="Statistics"
      className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 xl:gap-4"
    >
      {stats.map(({ title, value, icon, color, bg }) => (
        <StatsCard
          key={title}
          label={title}
          value={value}
          icon={icon}
          color={color}
          bg={bg}
          loading={loading}
        />
      ))}
    </section>
  );
};

export default CategoryStats;
