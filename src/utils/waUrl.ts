/**
 * Build a wa.me deep-link with a pre-filled message.
 *
 * @param phone  - WhatsApp number in international format without "+" (e.g. "6281234567001")
 * @param kostName - Name of the kost listing (will be URL-encoded)
 */
export function buildWaUrl(phone: string, kostName: string): string {
  const message = `Halo kak, saya tertarik dengan kost ${kostName} yang saya lihat di CariKost. Apakah masih ada kamar tersedia?`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
