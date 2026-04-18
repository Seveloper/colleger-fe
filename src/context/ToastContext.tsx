import { createContext, useCallback, useContext, useRef, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { ApiMessage, ErrorLevel } from '../api/apiResponse';

// ── types ────────────────────────────────────────────────────────────────────

interface ToastItem {
  id: string;
  messages: ApiMessage[];
}

interface ToastContextValue {
  addToast: (messages: ApiMessage[]) => void;
}

// ── context ──────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}

// ── provider ─────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const counter = useRef(0);

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((messages: ApiMessage[]) => {
    const id = String(++counter.current);
    setToasts(prev => [...prev, { id, messages }]);
    setTimeout(() => remove(id), 6000);
  }, [remove]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={remove} />
    </ToastContext.Provider>
  );
}

// ── UI ───────────────────────────────────────────────────────────────────────

const LEVEL_ORDER: ErrorLevel[] = ['Fatal', 'Error', 'Warning', 'Info', 'Debug'];

const LEVEL_STYLE: Record<ErrorLevel, { bar: string; title: string; label: string }> = {
  Fatal:   { bar: 'bg-purple-600', title: 'text-purple-700', label: 'Fatal Error' },
  Error:   { bar: 'bg-red-500',    title: 'text-red-700',    label: 'Error' },
  Warning: { bar: 'bg-yellow-400', title: 'text-yellow-700', label: 'Warning' },
  Info:    { bar: 'bg-blue-500',   title: 'text-blue-700',   label: 'Info' },
  Debug:   { bar: 'bg-gray-400',   title: 'text-gray-600',   label: 'Debug' },
};

function topLevel(messages: ApiMessage[]): ErrorLevel {
  for (const l of LEVEL_ORDER) {
    if (messages.some(m => m.errorLevel === l)) return l;
  }
  return 'Info';
}

function Toast({ item, onDismiss }: { item: ToastItem; onDismiss: (id: string) => void }) {
  const level = topLevel(item.messages);
  const style = LEVEL_STYLE[level];

  return (
    <div className="flex w-80 overflow-hidden rounded-xl bg-white shadow-lg ring-1 ring-black/5">
      <div className={`w-1 shrink-0 ${style.bar}`} />
      <div className="flex flex-1 flex-col gap-1 px-4 py-3">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold uppercase tracking-wide ${style.title}`}>
            {style.label}
          </span>
          <button onClick={() => onDismiss(item.id)} className="text-gray-400 hover:text-gray-600 transition-colors">
            <XMarkIcon className="w-4 h-4" />
          </button>
        </div>
        {item.messages.map((m, i) => (
          <p key={i} className="text-sm text-gray-700 leading-snug">
            {m.description ?? 'An unexpected error occurred.'}
          </p>
        ))}
      </div>
    </div>
  );
}

function ToastContainer({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: string) => void }) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map(t => (
        <Toast key={t.id} item={t} onDismiss={onDismiss} />
      ))}
    </div>
  );
}
