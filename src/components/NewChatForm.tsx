import { useState, type FormEvent } from 'react';
import { isValidPhone, normalizePhone } from '../lib/chatId';

interface Props {
  onCreate: (phone: string) => void;
}

export function NewChatForm({ onCreate }: Props) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const digits = normalizePhone(phone);

    if (!isValidPhone(digits)) {
      setError('Введите номер с кодом страны, например 996501234567');
      return;
    }

    onCreate(digits);
    setPhone('');
    setError(null);
  }

  return (
    <form onSubmit={handleSubmit} className="border-b border-[#e9edef] bg-white px-3 py-2">
      <div className="flex gap-2">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Номер телефона получателя"
          className="min-w-0 flex-1 rounded-lg bg-[#f0f2f5] px-4 py-2 text-sm text-[#111b21] outline-none placeholder:text-[#667781]"
        />
        <button
          type="submit"
          className="shrink-0 rounded-lg bg-[#00a884] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#06cf9c]"
        >
          Новый чат
        </button>
      </div>
      {error && <p className="mt-1.5 px-1 text-xs text-[#ea0038]">{error}</p>}
    </form>
  );
}
