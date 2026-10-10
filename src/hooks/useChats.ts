import type { Chat, Message, MessageStatus } from '../types';
import { usePersistentState } from './usePersistentState';

const STATUS_RANK: Record<MessageStatus, number> = {
  sending: 0,
  error: 0,
  sent: 1,
  delivered: 2,
  read: 3,
};

export function useChats() {
  const [chats, setChats] = usePersistentState<Chat[]>('wa-chat:chats', []);
  const [messages, setMessages] = usePersistentState<Message[]>('wa-chat:messages', []);

  function touchChat(chatId: string, options: { name?: string; incrementUnread?: boolean } = {}) {
    const now = Date.now();

    setChats((prev) => {
      const exists = prev.some((chat) => chat.chatId === chatId);

      if (!exists) {
        return [...prev, { chatId, name: options.name, unread: options.incrementUnread ? 1 : 0, createdAt: now }];
      }

      return prev.map((chat) =>
        chat.chatId !== chatId
          ? chat
          : {
              ...chat,
              name: chat.name ?? options.name,
              unread: options.incrementUnread ? chat.unread + 1 : chat.unread,
            },
      );
    });
  }

  function markRead(chatId: string) {
    setChats((prev) => prev.map((chat) => (chat.chatId === chatId && chat.unread > 0 ? { ...chat, unread: 0 } : chat)));
  }

  function addMessage(message: Message) {
    setMessages((prev) => (prev.some((m) => m.id === message.id) ? prev : [...prev, message]));
  }

  function updateMessage(id: string, patch: Partial<Message>) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function applyStatus(id: string, status: MessageStatus) {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const current = m.status ?? 'sent';
        const shouldUpdate = status === 'error' || STATUS_RANK[status] > STATUS_RANK[current];
        return shouldUpdate ? { ...m, status } : m;
      }),
    );
  }

  function reset() {
    setChats([]);
    setMessages([]);
  }

  return { chats, messages, touchChat, markRead, addMessage, updateMessage, applyStatus, reset };
}
