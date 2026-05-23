import type { Kost } from "../data/kostData";
import { formatRpBulan } from "../utils/formatRp";

interface FeaturedStripProps {
  slots: (Kost | null)[];
  onKostClick: (kost: Kost) => void;
  onNavigate: (page: string) => void;
}

export default function FeaturedStrip({ slots, onKostClick, onNavigate }: FeaturedStripProps) {
  return (
    <section className="featured-strip" aria-label="Kost Unggulan">
      <h2 className="featured-strip__heading">⭐ Kost Unggulan</h2>
      <p className="featured-strip__sub">
        5 slot eksklusif — tampil di posisi teratas dan dilihat ribuan mahasiswa IPB setiap hari
      </p>

      <div className="featured-strip__grid">
        {slots.map((slot, idx) =>
          slot ? (
            <FilledSlot key={slot.id} kost={slot} onClick={() => onKostClick(slot)} />
          ) : (
            <EmptySlot key={`empty-${idx}`} onClick={() => onNavigate("daftarkan-kost")} />
          )
        )}
      </div>
    </section>
  );
}

/* ── Sub-components ────────────────────────────────────────────── */

interface FilledSlotProps {
  kost: Kost;
  onClick: () => void;
}

function FilledSlot({ kost, onClick }: FilledSlotProps) {
  return (
    <article
      className="featured-slot featured-slot--filled"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Kost unggulan: ${kost.name}`}
    >
      <span className="featured-slot__crown">★ Unggulan</span>
      <img
        className="featured-slot__img"
        src={kost.photos[0]}
        alt={kost.name}
        loading="lazy"
      />
      <div className="featured-slot__info">
        <div className="featured-slot__name">{kost.name}</div>
        <div className="featured-slot__area">{kost.area}</div>
        <div className="featured-slot__price">{formatRpBulan(kost.monthlyPrice)}</div>
      </div>
    </article>
  );
}

interface EmptySlotProps {
  onClick: () => void;
}

function EmptySlot({ onClick }: EmptySlotProps) {
  return (
    <button
      className="featured-slot featured-slot--empty"
      onClick={onClick}
      aria-label="Slot tersedia — pasang kost Anda"
    >
      <span className="featured-slot__empty-icon">➕</span>
      <span className="featured-slot__empty-label">
        Slot Tersedia
        <br />
        Pasang Kost Anda
      </span>
    </button>
  );
}
