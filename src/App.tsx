import { useMemo, useState } from 'react';
import { sendMessage } from './api/greenApi';
import { ChatWindow } from './components/ChatWindow';
import { EmptyState } from './components/EmptyState';
import { LoginForm } from './components/LoginForm';
import { Sidebar } from './components/Sidebar';
import { useChats } from './hooks/useChats';
import { useIncoming } from './hooks/useIncoming';
import { usePersistentState } from './hooks/usePersistentState';
import { phoneToChatId } from './lib/chatId';
import type { ChatEvent } from './lib/notifications';
import type { ChatSummary, Credentials, Message } from './types';

function App() {
  const [credentials, setCredentials] = usePersistentState<Credentials | null>('wa-chat:credentials', null);
  const { chats, messages, touchChat, markRead, addMessage, updateMessage, applyStatus, reset } = useChats();
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  function handleEvent(event: ChatEvent) {
    if (event.type === 'status') {
      applyStatus(event.messageId, event.status);
      return;
    }

    const { message, chatName } = event;
    if (messages.some((m) => m.id === message.id)) return;

    addMessage(message);
    touchChat(message.chatId, {
      name: chatName,
      incrementUnread: message.direction === 'in' && message.chatId !== activeChatId,
    });
  }

  const { isOnline } = useIncoming(credentials, { onEvent: handleEvent });

  const chatSummaries = useMemo<ChatSummary[]>(() => {
    return chats
      .map((chat) => {
        const chatMessages = messages.filter((m) => m.chatId === chat.chatId);
        return { ...chat, lastMessage: chatMessages.at(-1) };
      })
      .sort((a, b) => (b.lastMessage?.timestamp ?? b.createdAt) - (a.lastMessage?.timestamp ?? a.createdAt));
  }, [chats, messages]);

  const activeChat = chatSummaries.find((chat) => chat.chatId === activeChatId) ?? null;

  // по timestamp не сортируем: у WhatsApp точность до секунды, быстрый ответ встаёт выше
  const activeMessages = useMemo(() => messages.filter((m) => m.chatId === activeChatId), [messages, activeChatId]);

  function handleLogout() {
    setCredentials(null);
    reset();
    setActiveChatId(null);
  }

  function handleSelectChat(chatId: string) {
    setActiveChatId(chatId);
    markRead(chatId);
  }

  function handleCreateChat(phone: string) {
    const chatId = phoneToChatId(phone);
    touchChat(chatId);
    handleSelectChat(chatId);
  }

  async function deliver(localId: string, chatId: string, text: string) {
    if (!credentials) return;
    try {
      const { idMessage } = await sendMessage(credentials, chatId, text);
      updateMessage(localId, { id: idMessage, status: 'sent' });
    } catch (error) {
      console.error('[sendMessage]', error);
      updateMessage(localId, { status: 'error' });
    }
  }

  function handleSend(text: string) {
    if (!activeChatId) return;

    const message: Message = {
      id: `local-${crypto.randomUUID()}`,
      chatId: activeChatId,
      text,
      direction: 'out',
      timestamp: Date.now(),
      status: 'sending',
    };

    addMessage(message);
    void deliver(message.id, message.chatId, message.text);
  }

  function handleRetry(message: Message) {
    updateMessage(message.id, { status: 'sending' });
    void deliver(message.id, message.chatId, message.text);
  }

  if (!credentials) {
    return <LoginForm onLogin={setCredentials} />;
  }

  return (
    <div className="relative h-dvh bg-[#d1d7db] lg:px-5 lg:py-5">
      <div className="absolute inset-x-0 top-0 hidden h-32 bg-[#00a884] lg:block" />

      <div className="relative mx-auto flex h-full max-w-[1600px] overflow-hidden bg-white shadow-lg">
        <aside
          className={`${activeChat ? 'hidden md:flex' : 'flex'} w-full md:w-[35%] md:min-w-[300px] md:max-w-[440px] lg:w-[30%]`}
        >
          <Sidebar
            idInstance={credentials.idInstance}
            chats={chatSummaries}
            activeChatId={activeChatId}
            onSelect={handleSelectChat}
            onCreate={handleCreateChat}
            onLogout={handleLogout}
          />
        </aside>

        <main className={`${activeChat ? 'flex' : 'hidden md:flex'} min-w-0 flex-1`}>
          {activeChat ? (
            <ChatWindow
              chat={activeChat}
              messages={activeMessages}
              isOnline={isOnline}
              onSend={handleSend}
              onRetry={handleRetry}
              onBack={() => setActiveChatId(null)}
            />
          ) : (
            <EmptyState />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
