import { useState, useMemo } from "react";
import { LayoutGrid, Map } from "lucide-react";
import { KOST_DATA, featuredSlots } from "../data/kostData";
import type { Kost } from "../data/kostData";
import FilterBar from "../components/FilterBar";
import type { FilterPillId } from "../components/FilterBar";
import FeaturedStrip from "../components/FeaturedStrip";
import KostCard from "../components/KostCard";
import Sidebar from "../components/Sidebar";
import type { SidebarFilters } from "../components/Sidebar";
import { DEFAULT_FILTERS } from "../components/Sidebar";
import { MAPS_EMBED_URL } from "../utils/helpers";

const DISTANCE_MAP: Record<string, [number, number]> = {
  lt500: [0, 0.5],
  "500to1k": [0.5, 1],
  "1to2k": [1, 2],
  gt2k: [2, Infinity],
};

interface HomePageProps {
  searchQuery: string;
  onKostClick: (kost: Kost) => void;
  onNavigate: (page: string) => void;
}

type ViewMode = "grid" | "map";

export default function HomePage({ searchQuery, onKostClick, onNavigate }: HomePageProps) {
  const [activePill, setActivePill] = useState<FilterPillId>("all");
  const [filters, setFilters] = useState<SidebarFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    let list = [...KOST_DATA];

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (k) =>
          k.name.toLowerCase().includes(q) ||
          k.area.toLowerCase().includes(q) ||
          k.type.toLowerCase().includes(q)
      );
    }

    // Filter pill
    if (activePill === "putra") list = list.filter((k) => k.type === "putra");
    else if (activePill === "putri") list = list.filter((k) => k.type === "putri");
    else if (activePill === "campur") list = list.filter((k) => k.type === "campur");
    else if (activePill === "premium") list = list.filter((k) => k.pricePerMonth >= 1200000);
    else if (activePill === "bulanan") list = list.filter((k) => k.monthlyPrice > 0);
    else if (activePill === "harian") list = list.filter((k) => k.monthlyPrice <= 500000);

    // Sidebar — tipe
    if (filters.types.length > 0) {
      list = list.filter((k) => filters.types.includes(k.type));
    }

    // Sidebar — max price
    list = list.filter((k) => k.pricePerMonth <= filters.maxPrice);

    // Sidebar — facilities
    if (filters.facilities.length > 0) {
      list = list.filter((k) => {
        const allFacs = [...k.facilities.kamar, ...k.facilities.bersama];
        return filters.facilities.every((f) => {
          if (f === "Kamar Mandi Dalam") return allFacs.includes("Kamar Mandi Dalam");
          if (f === "Dapur Bersama") return allFacs.some((a) => a.includes("Dapur"));
          if (f === "WiFi") return allFacs.some((a) => a.startsWith("WiFi"));
          if (f === "Water Heater") return allFacs.some((a) => a.includes("Water Heater"));
          return allFacs.includes(f);
        });
      });
    }

    // Sidebar — distance
    if (filters.distances.length > 0) {
      list = list.filter((k) =>
        filters.distances.some((d) => {
          const [lo, hi] = DISTANCE_MAP[d];
          return k.distanceKm >= lo && k.distanceKm < hi;
        })
      );
    }

    // Sidebar — available only
    if (filters.availableOnly) {
      list = list.filter((k) => k.isAvailable);
    }

    return list;
  }, [searchQuery, activePill, filters]);

  return (
    <div className="page-home">
      {/* Hero */}
      <section className="hero">
        <h1 className="hero__title">
          Temukan Kost Terbaik <span>dekat IPB</span>
        </h1>
        <p className="hero__sub">
          Ratusan kost pilihan mahasiswa — Dramaga, Babakan, Cilibende &amp; sekitarnya
        </p>
        {/* Hero search mirrors navbar search but visible */}
      </section>

      {/* Filter pills */}
      <FilterBar active={activePill} onChange={setActivePill} />

      {/* Featured Slots */}
      <FeaturedStrip
        slots={featuredSlots}
        onKostClick={onKostClick}
        onNavigate={onNavigate}
      />

      {/* Main content: sidebar + listing */}
      <div className="main-content">
        <Sidebar filters={filters} onChange={setFilters} />

        <div className="listing-area">
          <div className="listing-header">
            <p className="listing-count">
              <strong>{filtered.length}</strong> kost ditemukan
            </p>
            <div className="view-toggle" role="group" aria-label="Tampilan">
              <button
                className={`view-toggle__btn${viewMode === "grid" ? " view-toggle__btn--active" : ""}`}
                onClick={() => setViewMode("grid")}
                aria-pressed={viewMode === "grid"}
              >
                <LayoutGrid size={14} /> Grid
              </button>
              <button
                className={`view-toggle__btn${viewMode === "map" ? " view-toggle__btn--active" : ""}`}
                onClick={() => setViewMode("map")}
                aria-pressed={viewMode === "map"}
              >
                <Map size={14} /> Peta
              </button>
            </div>
          </div>

          {viewMode === "map" ? (
            <div className="map-view">
              <iframe
                src={MAPS_EMBED_URL}
                title="Peta area IPB University"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          ) : filtered.length === 0 ? (
            <div className="listing-grid">
              <div className="empty-state">
                <div className="empty-state__icon">🔍</div>
                <p className="empty-state__msg">
                  Kost tidak ditemukan. Coba ubah filter atau kata kunci pencarian.
                </p>
              </div>
            </div>
          ) : (
            <div className="listing-grid">
              {filtered.map((kost) => (
                <KostCard key={kost.id} kost={kost} onClick={onKostClick} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
