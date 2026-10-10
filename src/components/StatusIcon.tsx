import type { MessageStatus } from '../types';
import { CheckIcon, ClockIcon, DoubleCheckIcon, ErrorIcon } from './icons';

export function StatusIcon({ status }: { status?: MessageStatus }) {
  switch (status) {
    case 'sending':
      return <ClockIcon className="h-3 w-3 text-[#667781]" />;
    case 'sent':
      return <CheckIcon className="h-[11px] w-4 text-[#667781]" />;
    case 'delivered':
      return <DoubleCheckIcon className="h-[11px] w-4 text-[#667781]" />;
    case 'read':
      return <DoubleCheckIcon className="h-[11px] w-4 text-[#53bdeb]" />;
    case 'error':
      return <ErrorIcon className="h-3.5 w-3.5 text-[#ea0038]" />;
    default:
      return null;
  }
}
