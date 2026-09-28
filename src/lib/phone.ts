/** +918576000083 → "+91 85760 00083" */
export function formatIndianPhone(e164: string): string {
  const m = /^\+91(\d{5})(\d{5})$/.exec(e164)
  return m ? `+91 ${m[1]} ${m[2]}` : e164
}

export function telHref(e164: string): string {
  return `tel:${e164}`
}
