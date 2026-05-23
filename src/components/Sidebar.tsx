import { formatRp } from "../utils/formatRp";

const FACILITY_OPTIONS = [
  "AC",
  "WiFi",
  "Kamar Mandi Dalam",
  "Parkir Motor",
  "Dapur Bersama",
  "Laundry",
  "Water Heater",
] as const;

const DISTANCE_OPTIONS = [
  { label: "< 500 m", value: "lt500" },
  { label: "500 m – 1 km", value: "500to1k" },
  { label: "1 – 2 km", value: "1to2k" },
  { label: "> 2 km", value: "gt2k" },
] as const;

const TYPE_OPTIONS = [
  { label: "Putra", value: "putra" },
  { label: "Putri", value: "putri" },
  { label: "Campur", value: "campur" },
] as const;

export type DistanceFilter = (typeof DISTANCE_OPTIONS)[number]["value"];
export type TypeFilter = "putra" | "putri" | "campur";
export type FacilityFilter = (typeof FACILITY_OPTIONS)[number];

export interface SidebarFilters {
  types: TypeFilter[];
  facilities: FacilityFilter[];
  distances: DistanceFilter[];
  availableOnly: boolean;
  maxPrice: number;
}

export const DEFAULT_FILTERS: SidebarFilters = {
  types: [],
  facilities: [],
  distances: [],
  availableOnly: false,
  maxPrice: 3000000,
};

const MIN_PRICE = 300000;
const MAX_PRICE = 3000000;

interface SidebarProps {
  filters: SidebarFilters;
  onChange: (f: SidebarFilters) => void;
}

export default function Sidebar({ filters, onChange }: SidebarProps) {
  function toggleType(v: TypeFilter) {
    const next = filters.types.includes(v)
      ? filters.types.filter((t) => t !== v)
      : [...filters.types, v];
    onChange({ ...filters, types: next });
  }

  function toggleFacility(v: FacilityFilter) {
    const next = filters.facilities.includes(v)
      ? filters.facilities.filter((f) => f !== v)
      : [...filters.facilities, v];
    onChange({ ...filters, facilities: next });
  }

  function toggleDistance(v: DistanceFilter) {
    const next = filters.distances.includes(v)
      ? filters.distances.filter((d) => d !== v)
      : [...filters.distances, v];
    onChange({ ...filters, distances: next });
  }

  function resetAll() {
    onChange({ ...DEFAULT_FILTERS });
  }

  return (
    <aside className="sidebar" aria-label="Filter kost">
      <div className="sidebar__title">
        <span>Filter</span>
        <button className="sidebar__reset" onClick={resetAll}>
          Reset semua
        </button>
      </div>

      {/* Price */}
      <div className="sidebar__section">
        <p className="sidebar__section-label">Harga Maksimal</p>
        <p className="sidebar__price-display">
          {formatRp(MIN_PRICE)} – {formatRp(filters.maxPrice)}/bulan
        </p>
        <input
          type="range"
          className="sidebar__range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={50000}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          aria-label="Harga maksimal"
        />
      </div>

      {/* Tipe Kost */}
      <div className="sidebar__section">
        <p className="sidebar__section-label">Tipe Kost</p>
        {TYPE_OPTIONS.map((opt) => (
          <label key={opt.value} className="sidebar__checkbox-row">
            <input
              type="checkbox"
              checked={filters.types.includes(opt.value)}
              onChange={() => toggleType(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {/* Fasilitas */}
      <div className="sidebar__section">
        <p className="sidebar__section-label">Fasilitas</p>
        {FACILITY_OPTIONS.map((fac) => (
          <label key={fac} className="sidebar__checkbox-row">
            <input
              type="checkbox"
              checked={filters.facilities.includes(fac)}
              onChange={() => toggleFacility(fac)}
            />
            {fac}
          </label>
        ))}
      </div>

      {/* Jarak */}
      <div className="sidebar__section">
        <p className="sidebar__section-label">Jarak dari IPB</p>
        {DISTANCE_OPTIONS.map((opt) => (
          <label key={opt.value} className="sidebar__checkbox-row">
            <input
              type="checkbox"
              checked={filters.distances.includes(opt.value)}
              onChange={() => toggleDistance(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>

      {/* Ketersediaan */}
      <div className="sidebar__section">
        <p className="sidebar__section-label">Ketersediaan</p>
        <label className="sidebar__checkbox-row">
          <input
            type="checkbox"
            checked={filters.availableOnly}
            onChange={(e) => onChange({ ...filters, availableOnly: e.target.checked })}
          />
          Tersedia saja
        </label>
      </div>
    </aside>
  );
}
