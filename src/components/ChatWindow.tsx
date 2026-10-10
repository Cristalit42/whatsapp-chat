import { useEffect, useRef } from 'react';
import { formatPhone } from '../lib/format';
import type { ChatSummary, Message } from '../types';
import { Avatar } from './Avatar';
import { BackIcon } from './icons';
import { MessageBubble } from './MessageBubble';
import { MessageInput } from './MessageInput';

interface Props {
  chat: ChatSummary;
  messages: Message[];
  isOnline: boolean;
  onSend: (text: string) => void;
  onRetry: (message: Message) => void;
  onBack: () => void;
}

export function ChatWindow({ chat, messages, isOnline, onSend, onRetry, onBack }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ block: 'end' });
  }, [messages.length, chat.chatId]);

  const phone = formatPhone(chat.chatId);

  return (
    <div className="flex h-full w-full flex-col">
      <header className="flex h-[60px] shrink-0 items-center gap-3 border-l border-[#d1d7db] bg-[#f0f2f5] px-3 md:px-4">
        <button
          type="button"
          onClick={onBack}
          aria-label="Назад к списку чатов"
          className="rounded-full p-1.5 text-[#54656f] transition hover:bg-[#d9dbdf] md:hidden"
        >
          <BackIcon className="h-6 w-6" />
        </button>
        <Avatar />
        <div className="flex min-w-0 flex-col">
          <span className="truncate text-[#111b21]">{chat.name ?? phone}</span>
          {chat.name && <span className="truncate text-xs text-[#667781]">{phone}</span>}
        </div>
      </header>

      {!isOnline && (
        <div className="shrink-0 bg-[#fff3c4] px-4 py-2 text-center text-sm text-[#54656f]">
          Нет связи с GREEN-API. Переподключаемся…
        </div>
      )}

      <div className="flex-1 overflow-y-auto bg-[#efeae2] px-3 py-4 md:px-[7%]">
        {messages.length === 0 ? (
          <p className="mx-auto mt-4 w-fit rounded-lg bg-[#ffeecd] px-3 py-1.5 text-center text-xs text-[#54656f] shadow-sm">
            Напишите первое сообщение — оно уйдёт на {phone} в WhatsApp
          </p>
        ) : (
          <div className="flex flex-col gap-1">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} onRetry={onRetry} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <MessageInput onSend={onSend} />
    </div>
  );
}
