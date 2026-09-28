const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

/** 125000 → "₹1,25,000". Rounds to whole rupees. */
export function formatINR(amount: number): string {
  return inr.format(Math.round(amount))
}
