import { useState } from "react";
import { ArrowLeft, Star, MapPin, MessageCircle } from "lucide-react";
import type { Kost } from "../data/kostData";
import { formatRp, formatRpBulan } from "../utils/formatRp";
import { buildWaUrl } from "../utils/waUrl";
import { facIcon, MAPS_EMBED_URL, TYPE_LABEL } from "../utils/helpers";

const PRICING_OPTIONS = [
  { key: "monthly", label: "Bulanan", savings: "" },
  { key: "quarterly", label: "3 Bulan", savings: "Hemat ~3%" },
  { key: "yearly", label: "Tahunan", savings: "Hemat ~10%" },
] as const;

type PricingKey = (typeof PRICING_OPTIONS)[number]["key"];

interface DetailPageProps {
  kost: Kost;
  onBack: () => void;
}

export default function DetailPage({ kost, onBack }: DetailPageProps) {
  const [selectedPricing, setSelectedPricing] = useState<PricingKey>("monthly");

  const priceMap: Record<PricingKey, number> = {
    monthly: kost.monthlyPrice,
    quarterly: kost.quarterlyPrice,
    yearly: kost.yearlyPrice,
  };

  const waUrl = buildWaUrl(kost.name);

  const photos = kost.photos.slice(0, 5);
  // Pad to 5 if fewer
  while (photos.length < 5) photos.push(kost.photos[0]);

  return (
    <div className="detail-page">
      {/* Back button */}
      <button className="detail-back" onClick={onBack} aria-label="Kembali ke daftar kost">
        <ArrowLeft size={18} /> Kembali
      </button>

      {/* Title */}
      <h1 className="detail-title">{kost.name}</h1>
      <div className="detail-meta">
        <span className="detail-meta__rating">
          <Star size={14} fill="#222" /> {kost.rating.toFixed(1)}
        </span>
        <span>({kost.reviewCount} ulasan)</span>
        <span>·</span>
        <span className={`type-badge type-badge--${kost.type}`}>{TYPE_LABEL[kost.type]}</span>
        <span>·</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <MapPin size={13} /> {kost.area}
        </span>
      </div>

      {/* Gallery */}
      <div className="gallery" aria-label="Galeri foto kost">
        {photos.map((src, idx) => (
          <div
            key={idx}
            className="gallery__item"
            onClick={() => window.open(src, "_blank")}
            title="Klik untuk perbesar"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && window.open(src, "_blank")}
          >
            <img src={src} alt={`${kost.name} foto ${idx + 1}`} loading={idx === 0 ? "eager" : "lazy"} />
          </div>
        ))}
      </div>

      {/* Two-column layout */}
      <div className="detail-cols">
        {/* Left: details */}
        <div>
          {/* Address */}
          <div className="detail-section">
            <h2 className="detail-section__heading">📍 Alamat</h2>
            <p style={{ fontSize: ".9rem", color: "#555", lineHeight: 1.6 }}>{kost.address}</p>

            {/* Map embed */}
            <div className="detail-map" style={{ marginTop: 14 }}>
              <iframe
                src={MAPS_EMBED_URL}
                title="Peta lokasi IPB University area"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Distance */}
          <div className="detail-section">
            <h2 className="detail-section__heading">🚶 Jarak dari Gerbang IPB</h2>
            <div className="distance-row">
              <div className="distance-card">
                <span className="distance-card__icon">🚶</span>
                <div>
                  <p className="distance-card__label">Jalan kaki</p>
                  <p className="distance-card__value">{kost.walkingMinutes} menit</p>
                </div>
              </div>
              <div className="distance-card">
                <span className="distance-card__icon">🏍️</span>
                <div>
                  <p className="distance-card__label">Berkendara</p>
                  <p className="distance-card__value">{kost.drivingMinutes} menit</p>
                </div>
              </div>
              <div className="distance-card">
                <span className="distance-card__icon">📍</span>
                <div>
                  <p className="distance-card__label">Jarak</p>
                  <p className="distance-card__value">{kost.distanceKm.toFixed(1)} km</p>
                </div>
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div className="detail-section">
            <h2 className="detail-section__heading">✅ Fasilitas</h2>

            <div className="fac-group">
              <p className="fac-group__label">Fasilitas Kamar</p>
              <div className="fac-grid">
                {kost.facilities.kamar.map((f) => (
                  <span key={f} className="fac-chip">
                    <span aria-hidden="true">{facIcon(f)}</span> {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="fac-group">
              <p className="fac-group__label">Fasilitas Bersama</p>
              <div className="fac-grid">
                {kost.facilities.bersama.map((f) => (
                  <span key={f} className="fac-chip">
                    <span aria-hidden="true">{facIcon(f)}</span> {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="fac-group">
              <p className="fac-group__label">Peraturan</p>
              <div className="fac-grid">
                {kost.facilities.peraturan.map((f) => (
                  <span key={f} className="fac-chip">
                    <span aria-hidden="true">{facIcon(f)}</span> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="detail-section">
            <h2 className="detail-section__heading">💰 Pilihan Harga</h2>
            <div className="pricing-options">
              {PRICING_OPTIONS.map((opt) => (
                <div
                  key={opt.key}
                  className={`pricing-option${selectedPricing === opt.key ? " pricing-option--selected" : ""}`}
                  onClick={() => setSelectedPricing(opt.key)}
                  role="radio"
                  aria-checked={selectedPricing === opt.key}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedPricing(opt.key)}
                >
                  <span className="pricing-option__label">{opt.label}</span>
                  <div className="pricing-option__right">
                    <div className="pricing-option__price">{formatRp(priceMap[opt.key])}</div>
                    {opt.savings && (
                      <div className="pricing-option__save">{opt.savings}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="detail-section">
            <h2 className="detail-section__heading">🏠 Ketersediaan Kamar</h2>
            <div className="availability-row">
              <span className={`avail-dot${!kost.isAvailable ? " avail-dot--full" : ""}`} />
              {kost.isAvailable ? (
                <span>
                  <strong>{kost.availableRooms}</strong> kamar tersedia dari {kost.totalRooms} total kamar
                </span>
              ) : (
                <span>
                  Kamar sedang <strong>penuh</strong> — hubungi pemilik untuk waitlist
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Booking card */}
        <div>
          <div className="booking-card">
            <p className="booking-card__price">
              {formatRpBulan(kost.monthlyPrice)}
            </p>
            <div className="booking-card__rating">
              <Star size={13} fill="#555" color="#555" />
              <strong>{kost.rating.toFixed(1)}</strong>
              <span style={{ color: "#aaa" }}>({kost.reviewCount} ulasan)</span>
            </div>

            <button
              className="booking-card__wa-btn"
              onClick={() => window.open(waUrl, "_blank", "noopener")}
              aria-label="Hubungi pemilik via WhatsApp"
            >
              <MessageCircle size={18} /> Hubungi via WhatsApp
            </button>

            <div className="booking-card__owner">
              <div className="booking-card__avatar">
                {kost.ownerName.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="booking-card__owner-name">{kost.ownerName}</p>
                <p className="booking-card__owner-label">Pemilik Kost</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <button
        className="float-wa"
        onClick={() => window.open(waUrl, "_blank", "noopener")}
        aria-label="Chat WhatsApp sekarang"
      >
        <MessageCircle size={18} /> Chat Sekarang
      </button>
    </div>
  );
}
