/**
 * Nomor WhatsApp resmi CariKost (1 pintu).
 * Semua tombol "Hubungi via WhatsApp" diarahkan ke nomor ini.
 * Format internasional tanpa "+" — 082121766537 → 6282121766537.
 */
export const CARIKOST_WA_NUMBER = "6282121766537";

/**
 * Build a wa.me deep-link with a pre-filled message.
 * Semua pesan terhubung ke nomor CariKost tunggal (CARIKOST_WA_NUMBER).
 *
 * @param kostName - Name of the kost listing (will be URL-encoded)
 */
export function buildWaUrl(kostName: string): string {
  const message = `Halo kak, saya tertarik dengan kost ${kostName} yang saya lihat di CariKost. Apakah masih ada kamar tersedia?`;
  return `https://wa.me/${CARIKOST_WA_NUMBER}?text=${encodeURIComponent(message)}`;
}
