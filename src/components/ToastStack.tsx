import React, { useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { toastMessages } from '../store/cartStore';
import gsap from 'gsap';

function Toast({ id, message, type }: { id: string; message: string; type: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.5)' }
    );
  }, []);

  const icons: Record<string, React.ReactNode> = {
    success: (
      <svg className="h-4 w-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" />
      </svg>
    ),
  };

  return (
    <div
      ref={ref}
      className="flex items-center gap-3 bg-white border border-neutral-100 shadow-xl px-4 py-3 min-w-[260px] max-w-xs"
    >
      {icons[type]}
      <p className="text-sm font-medium text-neutral-800 flex-1">{message}</p>
    </div>
  );
}

export default function ToastStack() {
  const toasts = useStore(toastMessages);
  return (
    <div
      aria-live="polite"
      aria-label="Notificaciones"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 items-center pointer-events-none"
    >
      {toasts.map(t => (
        <Toast key={t.id} {...t} />
      ))}
    </div>
  );
}
