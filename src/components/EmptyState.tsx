import { ChatBubbleIcon } from './icons';

export function EmptyState() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 border-l border-[#d1d7db] bg-[#f0f2f5] px-8 text-center">
      <ChatBubbleIcon className="h-20 w-20 text-[#c5ccd0]" />
      <h2 className="text-3xl font-light text-[#41525d]">WhatsApp Chat</h2>
      <p className="max-w-md text-sm text-[#667781]">
        Выберите чат слева или создайте новый по номеру телефона. Сообщения отправляются и приходят через GREEN-API.
      </p>
    </div>
  );
}
