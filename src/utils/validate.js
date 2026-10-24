import { normalizePhone } from './phone';

export function validateCheckout(c) {
  const e = {};
  if (c.name.trim().length < 2) e.name = 'Enter your full name.';
  if (!c.phone.trim()) e.phone = 'Enter a phone number.';
  else if (!normalizePhone(c.phone)) e.phone = 'Enter 10 digits, like 0712 345 678, or +254 712 345 678.';
  if (c.fulfilment === 'deliver' && c.area.trim().length < 3) e.area = 'Add your area and a landmark so the rider can find you.';
  if (c.note.length > 200) e.note = 'Keep the note under 200 characters.';
  return e;
}
