import { formatListDate, formatPhone } from '../lib/format';
import type { ChatSummary } from '../types';
import { Avatar } from './Avatar';
import { StatusIcon } from './StatusIcon';

interface Props {
  chats: ChatSummary[];
  activeChatId: string | null;
  onSelect: (chatId: string) => void;
}

export function ChatList({ chats, activeChatId, onSelect }: Props) {
  if (chats.length === 0) {
    return (
      <p className="px-6 py-10 text-center text-sm text-[#667781]">
        Чатов пока нет. Введите номер получателя выше, чтобы начать переписку.
      </p>
    );
  }

  return (
    <ul className="flex-1 overflow-y-auto bg-white">
      {chats.map((chat) => {
        const isActive = chat.chatId === activeChatId;
        const last = chat.lastMessage;

        return (
          <li key={chat.chatId}>
            <button
              type="button"
              onClick={() => onSelect(chat.chatId)}
              className={`flex w-full items-center gap-3 px-3 text-left transition ${isActive ? 'bg-[#f0f2f5]' : 'hover:bg-[#f5f6f6]'}`}
            >
              <Avatar size="lg" />

              <div className="flex min-w-0 flex-1 flex-col gap-0.5 border-b border-[#e9edef] py-3">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[#111b21]">{chat.name ?? formatPhone(chat.chatId)}</span>
                  {last && (
                    <span className={`shrink-0 text-xs ${chat.unread > 0 ? 'text-[#1fa855]' : 'text-[#667781]'}`}>
                      {formatListDate(last.timestamp)}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <span className="flex min-w-0 items-center gap-1 text-sm text-[#667781]">
                    {last?.direction === 'out' && <StatusIcon status={last.status} />}
                    <span className="truncate">{last ? last.text : 'Нет сообщений'}</span>
                  </span>
                  {chat.unread > 0 && (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#25d366] px-1.5 text-xs font-medium text-white">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
