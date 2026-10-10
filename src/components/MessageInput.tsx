import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { SendIcon } from './icons';

interface Props {
  onSend: (text: string) => void;
}

export function MessageInput({ onSend }: Props) {
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0;

  function send() {
    if (!canSend) return;
    onSend(text.trim());
    setText('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex shrink-0 items-end gap-2 bg-[#f0f2f5] px-3 py-2.5 md:px-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={1}
        placeholder="Введите сообщение"
        className="field-sizing-content max-h-32 min-h-[42px] flex-1 resize-none rounded-lg bg-white px-3 py-2.5 text-[15px] text-[#111b21] outline-none placeholder:text-[#667781]"
      />
      <button
        type="submit"
        disabled={!canSend}
        aria-label="Отправить"
        className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full text-[#54656f] transition hover:bg-[#d9dbdf] disabled:opacity-40 disabled:hover:bg-transparent"
      >
        <SendIcon className="h-6 w-6" />
      </button>
    </form>
  );
}
