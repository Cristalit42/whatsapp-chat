export interface Credentials {
  apiUrl: string;
  idInstance: string;
  apiTokenInstance: string;
}

export interface StateInstanceResponse {
  stateInstance: string;
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface DeleteNotificationResponse {
  result: boolean;
  reason?: string;
}

export interface Notification {
  receiptId: number;
  body: NotificationBody;
}

export type WebhookType =
  | 'incomingMessageReceived'
  | 'outgoingMessageReceived'
  | 'outgoingAPIMessageReceived'
  | 'outgoingMessageStatus'
  | (string & {});

export interface NotificationBody {
  typeWebhook: WebhookType;
  timestamp: number;
  idMessage?: string;
  chatId?: string;
  status?: string;
  senderData?: {
    chatId: string;
    sender?: string;
    senderName?: string;
    chatName?: string;
  };
  messageData?: {
    typeMessage: string;
    textMessageData?: { textMessage: string };
    extendedTextMessageData?: { text: string };
  };
}

export type Direction = 'in' | 'out';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'error';

export interface Message {
  id: string;
  chatId: string;
  text: string;
  direction: Direction;
  timestamp: number;
  status?: MessageStatus;
}

export interface Chat {
  chatId: string;
  name?: string;
  unread: number;
  createdAt: number;
}

export interface ChatSummary extends Chat {
  lastMessage?: Message;
}
