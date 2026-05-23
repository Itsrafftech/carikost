import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Kost } from "../data/kostData";
import { formatRpBulan } from "../utils/formatRp";
import { buildWaUrl } from "../utils/waUrl";
import { topFacs, facIcon, formatDistance, TYPE_LABEL } from "../utils/helpers";

interface KostCardProps {
  kost: Kost;
  onClick: (kost: Kost) => void;
}

export default function KostCard({ kost, onClick }: KostCardProps) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = kost.photos;
  const total = photos.length;

  function handlePrev(e: React.MouseEvent) {
    e.stopPropagation();
    setPhotoIndex((i) => (i === 0 ? total - 1 : i - 1));
  }

  function handleNext(e: React.MouseEvent) {
    e.stopPropagation();
    setPhotoIndex((i) => (i === total - 1 ? 0 : i + 1));
  }

  function handleWa(e: React.MouseEvent) {
    e.stopPropagation();
    window.open(buildWaUrl(kost.name), "_blank", "noopener");
  }

  const facTags = topFacs(kost, 3);

  return (
    <article className="card" onClick={() => onClick(kost)} aria-label={kost.name}>
      {/* ── Photo Slider ── */}
      <div className="card__slider">
        <div
          className="card__slider-track"
          style={{ transform: `translateX(-${photoIndex * 100}%)` }}
        >
          {photos.map((src, idx) => (
            <img
              key={idx}
              className="card__slider-img"
              src={src}
              alt={`${kost.name} foto ${idx + 1}`}
              loading="lazy"
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        {total > 1 && (
          <>
            <button
              className="card__slider-btn card__slider-btn--prev"
              onClick={handlePrev}
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              className="card__slider-btn card__slider-btn--next"
              onClick={handleNext}
              aria-label="Foto berikutnya"
            >
              <ChevronRight size={14} />
            </button>
          </>
        )}

        {/* Dot indicators */}
        {total > 1 && (
          <div className="card__slider-dots" aria-hidden="true">
            {photos.map((_, idx) => (
              <span
                key={idx}
                className={`card__slider-dot${idx === photoIndex ? " card__slider-dot--active" : ""}`}
              />
            ))}
          </div>
        )}

        {/* Availability badge */}
        <span
          className={`card__badge ${kost.isAvailable ? "card__badge--available" : "card__badge--full"}`}
        >
          {kost.isAvailable ? "Tersedia" : "Penuh"}
        </span>
      </div>

      {/* ── Card Body ── */}
      <div className="card__body">
        <div className="card__header">
          <h3 className="card__name">{kost.name}</h3>
          <span className="card__rating">
            <Star size={12} fill="#222" className="card__rating-star" />
            {kost.rating.toFixed(1)}
          </span>
        </div>

        <p className="card__area">{kost.area} · {TYPE_LABEL[kost.type]}</p>
        <p className="card__distance">{formatDistance(kost.distanceKm)}</p>

        {/* Facility tags */}
        <div className="card__facilities" aria-label="Fasilitas">
          {facTags.map((fac) => (
            <span key={fac} className="card__fac-tag">
              <span aria-hidden="true">{facIcon(fac)}</span>
              {fac}
            </span>
          ))}
        </div>

        <p className="card__price">
          {formatRpBulan(kost.pricePerMonth)}
        </p>

        {/* WhatsApp button */}
        <button className="card__wa-btn" onClick={handleWa} aria-label="Hubungi via WhatsApp">
          <span>💬</span> Hubungi via WhatsApp
        </button>
      </div>
    </article>
  );
}
