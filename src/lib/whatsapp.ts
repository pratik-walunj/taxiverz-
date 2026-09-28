/** WhatsApp click-to-chat link. The number is E.164 (+91…); wa.me wants digits only. */
export function whatsappHref(e164: string, message?: string): string {
  const digits = e164.replace(/\D/g, '')
  return message
    ? `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${digits}`
}
