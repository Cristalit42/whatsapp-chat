import { chatIdToPhone } from './chatId';

export function formatPhone(chatId: string): string {
  return `+${chatIdToPhone(chatId)}`;
}

export function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

export function formatListDate(timestamp: number): string {
  const date = new Date(timestamp);
  const isToday = date.toDateString() === new Date().toDateString();
  return isToday ? formatTime(timestamp) : date.toLocaleDateString('ru-RU');
}
