export const WHATSAPP_MESSAGE =
  "Hi Ilham! I'd like to discuss a design project with you.";

export function buildWhatsAppLink(phone) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
}
