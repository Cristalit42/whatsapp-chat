import { useState, type ChangeEvent, type FormEvent } from 'react';
import { GreenApiError, getStateInstance } from '../api/greenApi';
import type { Credentials } from '../types';
import { ChatBubbleIcon } from './icons';

interface Props {
  onLogin: (credentials: Credentials) => void;
}

const FIELDS: { name: keyof Credentials; label: string; placeholder: string; type?: string }[] = [
  { name: 'apiUrl', label: 'apiUrl', placeholder: 'https://7103.api.greenapi.com' },
  { name: 'idInstance', label: 'idInstance', placeholder: '7103000000' },
  { name: 'apiTokenInstance', label: 'apiTokenInstance', placeholder: 'Токен из личного кабинета', type: 'password' },
];

export function LoginForm({ onLogin }: Props) {
  const [form, setForm] = useState<Credentials>({ apiUrl: '', idInstance: '', apiTokenInstance: '' });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof Credentials) => (event: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const credentials: Credentials = {
      apiUrl: form.apiUrl.trim(),
      idInstance: form.idInstance.trim(),
      apiTokenInstance: form.apiTokenInstance.trim(),
    };

    if (!credentials.apiUrl || !credentials.idInstance || !credentials.apiTokenInstance) {
      setError('Заполните все поля');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { stateInstance } = await getStateInstance(credentials);

      if (stateInstance !== 'authorized') {
        setError(`Инстанс не авторизован (статус: ${stateInstance}). Отсканируйте QR-код в личном кабинете GREEN-API.`);
        return;
      }

      onLogin(credentials);
    } catch (err) {
      const isAuthError = err instanceof GreenApiError && (err.status === 401 || err.status === 403);
      setError(
        isAuthError
          ? 'Неверный idInstance или apiTokenInstance'
          : 'Не удалось подключиться к GREEN-API. Проверьте apiUrl и интернет-соединение.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh flex-col items-center bg-[#eae6df]">
      <div className="absolute inset-x-0 top-0 h-56 bg-[#00a884]" />

      <div className="relative mt-10 flex w-full max-w-md flex-col gap-6 px-4 md:mt-24">
        <div className="flex items-center gap-3 text-white">
          <ChatBubbleIcon className="h-8 w-8" />
          <span className="text-sm font-medium uppercase tracking-wide">WhatsApp Chat · GREEN-API</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-lg bg-white p-6 shadow-lg md:p-8">
          <div>
            <h1 className="text-2xl font-light text-[#41525d]">Вход</h1>
            <p className="mt-2 text-sm text-[#667781]">
              Введите данные инстанса из{' '}
              <a href="https://console.green-api.com" target="_blank" rel="noopener noreferrer" className="text-[#008069] hover:underline">
                личного кабинета GREEN-API
              </a>
              . Они хранятся только в этом браузере.
            </p>
          </div>

          {FIELDS.map((field) => (
            <label key={field.name} className="flex flex-col gap-1.5">
              <span className="text-sm text-[#41525d]">{field.label}</span>
              <input
                type={field.type ?? 'text'}
                value={form[field.name]}
                onChange={handleChange(field.name)}
                placeholder={field.placeholder}
                autoComplete="off"
                className="rounded-md border border-[#d1d7db] px-3 py-2 text-[#111b21] outline-none transition focus:border-[#00a884]"
              />
            </label>
          ))}

          {error && <p className="rounded-md bg-[#fde8ec] px-3 py-2 text-sm text-[#ea0038]">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="rounded-full bg-[#008069] px-6 py-2.5 font-medium text-white transition hover:bg-[#017561] disabled:opacity-60"
          >
            {isLoading ? 'Проверяем…' : 'Войти'}
          </button>
        </form>
      </div>
    </div>
  );
}
