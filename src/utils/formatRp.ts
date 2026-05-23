/**
 * Format a number as Indonesian Rupiah.
 * e.g. 800000 → "Rp 800.000"
 */
export function formatRp(amount: number): string {
  return (
    "Rp " +
    amount.toLocaleString("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

/**
 * Format with "/bulan" suffix.
 * e.g. 800000 → "Rp 800.000/bulan"
 */
export function formatRpBulan(amount: number): string {
  return formatRp(amount) + "/bulan";
}
