const PILLS = [
  { id: "all", label: "🏠 Semua" },
  { id: "putra", label: "👦 Kost Putra" },
  { id: "putri", label: "👧 Kost Putri" },
  { id: "campur", label: "👫 Kost Campur" },
  { id: "premium", label: "⭐ Kost Premium" },
  { id: "bulanan", label: "📅 Kost Bulanan" },
  { id: "harian", label: "📆 Kost Harian" },
] as const;

export type FilterPillId = (typeof PILLS)[number]["id"];

interface FilterBarProps {
  active: FilterPillId;
  onChange: (id: FilterPillId) => void;
}

export default function FilterBar({ active, onChange }: FilterBarProps) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Filter kategori kost">
      {PILLS.map((pill) => (
        <button
          key={pill.id}
          role="tab"
          aria-selected={active === pill.id}
          className={`filter-bar__pill${active === pill.id ? " filter-bar__pill--active" : ""}`}
          onClick={() => onChange(pill.id)}
        >
          {pill.label}
        </button>
      ))}
    </div>
  );
}
