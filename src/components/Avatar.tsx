import { UserIcon } from './icons';

export function Avatar({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'h-12 w-12' : 'h-10 w-10';

  return (
    <div className={`${sizeClass} flex shrink-0 items-center justify-center rounded-full bg-[#dfe5e7] text-white`}>
      <UserIcon className="h-3/5 w-3/5" />
    </div>
  );
}
