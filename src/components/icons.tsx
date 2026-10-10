interface IconProps {
  className?: string;
}

export function SendIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 11" className={className} fill="currentColor" aria-hidden>
      <path d="M11.07.65 10.4.02a.5.5 0 0 0-.7.02L4.27 5.85 2.3 3.98a.5.5 0 0 0-.7.01l-.62.64a.5.5 0 0 0 .01.7l2.94 2.83a.5.5 0 0 0 .7-.02l6.45-6.8a.5.5 0 0 0-.01-.69Z" />
    </svg>
  );
}

export function DoubleCheckIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 11" className={className} fill="currentColor" aria-hidden>
      <path d="M11.07.65 10.4.02a.5.5 0 0 0-.7.02L4.27 5.85 2.3 3.98a.5.5 0 0 0-.7.01l-.62.64a.5.5 0 0 0 .01.7l2.94 2.83a.5.5 0 0 0 .7-.02l6.45-6.8a.5.5 0 0 0-.01-.69Z" />
      <path d="M15.07.65 14.4.02a.5.5 0 0 0-.7.02L8.27 5.85l-.53-.5-1.04 1.1 1.24 1.19a.5.5 0 0 0 .7-.02l6.45-6.8a.5.5 0 0 0-.02-.69Z" />
    </svg>
  );
}

export function ClockIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <circle cx="8" cy="8" r="6.25" />
      <path d="M8 4.5V8l2.5 1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ErrorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm-.75 3.5h1.5v5h-1.5v-5Zm0 6.25h1.5v1.5h-1.5v-1.5Z" />
    </svg>
  );
}

export function BackIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 4 10.59 5.41 16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" transform="rotate(180 12 12)" />
    </svg>
  );
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M10.09 15.59 11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59ZM19 3H5a2 2 0 0 0-2 2v4h2V5h14v14H5v-4H3v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z" />
    </svg>
  );
}

export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2.25c-3 0-9 1.5-9 4.5V21h18v-2.25c0-3-6-4.5-9-4.5Z" />
    </svg>
  );
}

export function ChatBubbleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.03 2 11c0 2.4 1.05 4.58 2.77 6.18L4 22l4.6-2.16c1.06.3 2.2.46 3.4.46 5.52 0 10-4.03 10-9S17.52 2 12 2Z" />
    </svg>
  );
}
