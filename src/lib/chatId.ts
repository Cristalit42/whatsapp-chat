export function normalizePhone(input: string): string {
  return input.replace(/\D/g, '');
}

export function isValidPhone(digits: string): boolean {
  return digits.length >= 10 && digits.length <= 15;
}

export function phoneToChatId(phone: string): string {
  return `${normalizePhone(phone)}@c.us`;
}

export function chatIdToPhone(chatId: string): string {
  return chatId.split('@')[0];
}

export function isPersonalChat(chatId: string): boolean {
  return chatId.endsWith('@c.us');
}
