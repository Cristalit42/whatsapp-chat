import { formatTime } from '../lib/format';
import type { Message } from '../types';
import { StatusIcon } from './StatusIcon';

interface Props {
  message: Message;
  onRetry: (message: Message) => void;
}

export function MessageBubble({ message, onRetry }: Props) {
  const isOut = message.direction === 'out';

  return (
    <div className={`flex ${isOut ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`relative max-w-[85%] rounded-lg px-2.5 pb-1.5 pt-1.5 text-[14.2px] leading-[19px] text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] md:max-w-[65%] ${
          isOut ? 'rounded-tr-none bg-[#d9fdd3]' : 'rounded-tl-none bg-white'
        }`}
      >
        <span className="whitespace-pre-wrap break-words">{message.text}</span>

        <span className="inline-block w-[70px]" aria-hidden />

        <span className="absolute bottom-1 right-2 flex items-center gap-1 text-[11px] text-[#667781]">
          {formatTime(message.timestamp)}
          {isOut && <StatusIcon status={message.status} />}
        </span>

        {message.status === 'error' && (
          <button
            type="button"
            onClick={() => onRetry(message)}
            className="mt-1 block text-xs font-medium text-[#ea0038] hover:underline"
          >
            Не отправлено. Повторить
          </button>
        )}
      </div>
    </div>
  );
}
