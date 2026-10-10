import type { ChatSummary } from '../types';
import { ChatList } from './ChatList';
import { LogoutIcon } from './icons';
import { NewChatForm } from './NewChatForm';

interface Props {
  idInstance: string;
  chats: ChatSummary[];
  activeChatId: string | null;
  onSelect: (chatId: string) => void;
  onCreate: (phone: string) => void;
  onLogout: () => void;
}

export function Sidebar({ idInstance, chats, activeChatId, onSelect, onCreate, onLogout }: Props) {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <header className="flex h-[60px] shrink-0 items-center justify-between bg-[#f0f2f5] px-4">
        <div className="flex flex-col">
          <span className="font-medium text-[#111b21]">Чаты</span>
          <span className="text-xs text-[#667781]">Инстанс {idInstance}</span>
        </div>
        <button
          type="button"
          onClick={onLogout}
          title="Выйти"
          aria-label="Выйти"
          className="rounded-full p-2 text-[#54656f] transition hover:bg-[#d9dbdf]"
        >
          <LogoutIcon className="h-5 w-5" />
        </button>
      </header>

      <NewChatForm onCreate={onCreate} />
      <ChatList chats={chats} activeChatId={activeChatId} onSelect={onSelect} />
    </div>
  );
}
