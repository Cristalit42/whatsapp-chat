import type { Message, MessageStatus, NotificationBody } from '../types';
import { isPersonalChat } from './chatId';

export type ChatEvent =
  | { type: 'message'; message: Message; chatName?: string }
  | { type: 'status'; messageId: string; status: MessageStatus };

export function extractText(body: NotificationBody): string | null {
  const data = body.messageData;
  if (!data) return null;

  switch (data.typeMessage) {
    case 'textMessage':
      return data.textMessageData?.textMessage ?? null;
    case 'extendedTextMessage':
    case 'quotedMessage':
      return data.extendedTextMessageData?.text ?? null;
    default:
      return null;
  }
}

const STATUS_MAP: Record<string, MessageStatus> = {
  sent: 'sent',
  delivered: 'delivered',
  read: 'read',
  failed: 'error',
  noAccount: 'error',
};

export function parseNotification(body: NotificationBody): ChatEvent | null {
  switch (body.typeWebhook) {
    case 'incomingMessageReceived':
    case 'outgoingMessageReceived': {
      const chatId = body.senderData?.chatId;
      const text = extractText(body);
      if (!chatId || !body.idMessage || text === null || !isPersonalChat(chatId)) return null;

      const isIncoming = body.typeWebhook === 'incomingMessageReceived';

      return {
        type: 'message',
        chatName: body.senderData?.chatName || (isIncoming ? body.senderData?.senderName : undefined),
        message: {
          id: body.idMessage,
          chatId,
          text,
          direction: isIncoming ? 'in' : 'out',
          timestamp: body.timestamp * 1000,
          status: isIncoming ? undefined : 'sent',
        },
      };
    }

    case 'outgoingMessageStatus': {
      const status = body.status ? STATUS_MAP[body.status] : undefined;
      if (!body.idMessage || !status) return null;
      return { type: 'status', messageId: body.idMessage, status };
    }

    // outgoingAPIMessageReceived уже добавлено в момент отправки
    default:
      return null;
  }
}
