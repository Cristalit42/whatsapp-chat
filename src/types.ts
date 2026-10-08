export interface Credentials {
  apiUrl: string;
  idInstance: string;
  apiTokenInstance: string;
}

export interface SendMessageResponse {
  idMessage: string;
}

export interface Notification {
  receiptId: number;
  body: NotificationBody;
}

export interface NotificationBody {
  typeWebhook: string;            // 'incomingMessageReceived' | 'outgoingMessageStatus' | ...
  idMessage?: string;
  timestamp: number;
  senderData?: { chatId: string; senderName?: string };
  messageData?: {
    typeMessage: string;          // 'textMessage' | 'extendedTextMessage' | 'quotedMessage' | ...
    textMessageData?: { textMessage: string };
    extendedTextMessageData?: { text: string };
  };
}