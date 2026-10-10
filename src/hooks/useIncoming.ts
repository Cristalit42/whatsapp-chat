import { useEffect, useRef, useState } from 'react';
import { deleteNotification, receiveNotification } from '../api/greenApi';
import { parseNotification, type ChatEvent } from '../lib/notifications';
import type { Credentials } from '../types';

const RETRY_DELAY_MS = 3000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Handlers {
  onEvent: (event: ChatEvent) => void;
}

export function useIncoming(credentials: Credentials | null, handlers: Handlers) {
  const [isOnline, setIsOnline] = useState(true);

  // чтобы не перезапускать цикл на каждый рендер
  const handlersRef = useRef(handlers);
  useEffect(() => {
    handlersRef.current = handlers;
  });

  useEffect(() => {
    if (!credentials) return;

    // в StrictMode эффект монтируется дважды, без флага будет два цикла
    let active = true;
    const controller = new AbortController();

    async function loop(creds: Credentials) {
      while (active) {
        try {
          const notification = await receiveNotification(creds, controller.signal);
          if (!active) break;
          setIsOnline(true);

          if (!notification) continue;

          try {
            const event = parseNotification(notification.body);
            if (event) handlersRef.current.onEvent(event);
          } finally {
            // удаляем даже ненужные уведомления, иначе очередь встанет
            await deleteNotification(creds, notification.receiptId, controller.signal);
          }
        } catch (error) {
          if (!active) break;
          console.error('[useIncoming]', error);
          setIsOnline(false);
          await sleep(RETRY_DELAY_MS);
        }
      }
    }

    void loop(credentials);

    return () => {
      active = false;
      controller.abort();
    };
  }, [credentials]);

  return { isOnline };
}
