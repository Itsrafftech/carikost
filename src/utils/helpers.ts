import type { Kost } from "../data/kostData";

// ── Constants ───────────────────────────────────────────────────

export const MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.6!2d106.7240!3d-6.5590!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c5c328daf153%3A0x27a42b9bc2c8d49c!2sIPB%20University!5e0!3m2!1sid!2sid!4v1700000000000";

export const TYPE_LABEL: Record<Kost["type"], string> = {
  putra: "Kost Putra",
  putri: "Kost Putri",
  campur: "Kost Campur",
};

/** Map facility keyword → emoji icon */
export const FACILITY_ICONS: Record<string, string> = {
  // kamar
  AC: "❄️",
  "Kipas Angin": "🌀",
  Kasur: "🛏️",
  "Kasur Spring Bed": "🛏️",
  "Kasur King Size": "🛏️",
  Lemari: "🚪",
  "Lemari 3 Pintu": "🚪",
  "Meja Belajar": "📖",
  "Kamar Mandi Dalam": "🚿",
  "Kamar Mandi Luar": "🚻",
  Jendela: "🪟",
  "Water Heater": "🔥",
  "Kulkas Mini": "🧊",
  Kulkas: "🧊",
  "Smart TV": "📺",
  // bersama
  WiFi: "📶",
  "WiFi Fiber": "📶",
  "WiFi Fiber 100Mbps": "📶",
  "Parkir Motor": "🏍️",
  "Parkir Mobil": "🚗",
  "Dapur Bersama": "🍳",
  "Dapur Lengkap": "🍳",
  "Dapur Bersama / Lengkap": "🍳",
  Laundry: "👕",
  Mushola: "🕌",
  CCTV: "📹",
  "Kolam Renang": "🏊",
  // peraturan
  "Khusus Putra": "👦",
  "Khusus Putri": "👧",
  "Putra & Putri": "👫",
  "Jam Malam 22.00": "🌙",
  "Jam Malam 22.30": "🌙",
  "Jam Malam 23.00": "🌙",
  "Bebas Jam Malam": "🕐",
  "Boleh Masak": "🍳",
  "Dilarang Masak": "🚫",
  "Tamu Diizinkan": "🤝",
  "Tamu Jam 08.00–20.00": "🤝",
  "Tamu Jam 08.00–21.00": "🤝",
  "Tamu Jam 08.00–22.00": "🤝",
  "Tamu Jam 08.00–19.00": "🤝",
  "Tamu Jam 08.00–18.00": "🤝",
};

/** Return icon for a facility string (fallback to ✅) */
export function facIcon(name: string): string {
  return FACILITY_ICONS[name] ?? "✅";
}

/** Return top N facilities from all groups for card preview */
export function topFacs(kost: Kost, n = 3): string[] {
  const all = [...kost.facilities.kamar, ...kost.facilities.bersama];
  const priority = ["WiFi", "WiFi Fiber", "WiFi Fiber 100Mbps", "AC", "Kamar Mandi Dalam", "Parkir Motor", "Laundry", "Water Heater"];
  const sorted = [
    ...priority.filter((f) => all.includes(f)),
    ...all.filter((f) => !priority.includes(f)),
  ];
  return sorted.slice(0, n);
}

/** Picsum photo URL helper */
export function imgUrl(seed: number, w = 600, h = 400): string {
  return `https://picsum.photos/seed/kost${seed}/${w}/${h}`;
}

/** Format distance for display */
export function formatDistance(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)} m dari Gerbang IPB`;
  return `${km.toFixed(1)} km dari Gerbang IPB`;
}
