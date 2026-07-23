// Dummy contact details — replace with real values later.
export const WHATSAPP_PHONE = "94771234567"; // digits only, country code first
export const WHATSAPP_MESSAGE =
  "Hi Ilham! I'd like to discuss a design project with you.";

export function getWhatsAppLink() {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}
