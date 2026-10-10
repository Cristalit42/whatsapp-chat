import type {
  Credentials,
  DeleteNotificationResponse,
  Notification,
  SendMessageResponse,
  StateInstanceResponse,
} from '../types';

const RECEIVE_TIMEOUT_SEC = 5;

export class GreenApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'GreenApiError';
    this.status = status;
  }
}

function buildUrl(credentials: Credentials, method: string, ...extra: (string | number)[]): string {
  const base = credentials.apiUrl.trim().replace(/\/+$/, '');
  const tail = extra.map((part) => `/${encodeURIComponent(String(part))}`).join('');

  return `${base}/waInstance${credentials.idInstance.trim()}/${method}/${credentials.apiTokenInstance.trim()}${tail}`;
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    const details = await response.text().catch(() => '');
    throw new GreenApiError(response.status, `GREEN-API ${response.status}: ${details || response.statusText}`);
  }

  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}

export function getStateInstance(credentials: Credentials, signal?: AbortSignal) {
  return request<StateInstanceResponse>(buildUrl(credentials, 'getStateInstance'), { signal });
}

export function sendMessage(credentials: Credentials, chatId: string, message: string, signal?: AbortSignal) {
  return request<SendMessageResponse>(buildUrl(credentials, 'sendMessage'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chatId, message }),
    signal,
  });
}

export function receiveNotification(credentials: Credentials, signal?: AbortSignal) {
  const url = `${buildUrl(credentials, 'receiveNotification')}?receiveTimeout=${RECEIVE_TIMEOUT_SEC}`;
  return request<Notification | null>(url, { signal });
}

export async function deleteNotification(credentials: Credentials, receiptId: number, signal?: AbortSignal) {
  await request<DeleteNotificationResponse>(buildUrl(credentials, 'deleteNotification', receiptId), {
    method: 'DELETE',
    signal,
  });
}
