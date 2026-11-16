'use client';

import { useState, type FormEvent } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

type Message = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const conversation: Message[] = [...messages, { role: 'user', content: text }];
    setMessages(conversation);
    setInput('');
    setBusy(true);
    setError('');
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation }),
      });
      const result: unknown = await response.json();
      if (typeof result !== 'object' || result === null) {
        throw new Error(t('copy.chatError'));
      }
      if (!response.ok && 'reply' in result && typeof result.reply === 'string') {
        setMessages([...conversation, { role: 'assistant', content: result.reply }]);
        return;
      }
      if (!response.ok || !('content' in result) || typeof result.content !== 'string') {
        throw new Error(typeof result === 'object' && result !== null && 'error' in result && typeof result.error === 'string' ? result.error : t('copy.chatError'));
      }
      setMessages([...conversation, { role: 'assistant', content: result.content }]);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : t('copy.chatError'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && (
        <section className="mb-3 flex h-[min(520px,75vh)] w-[min(380px,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900" aria-label={t('copy.chatAssistant')}>
          <div className="flex items-center justify-between bg-primary px-4 py-3 text-white">
            <h2 className="font-bold">{t('copy.chatAssistant')}</h2>
            <button type="button" onClick={() => setOpen(false)} aria-label={t('copy.closeChat')} className="rounded px-2 py-1 hover:bg-white/20">×</button>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.length === 0 && <p className="text-sm text-gray-600 dark:text-gray-300">{t('copy.chatIntro')}</p>}
            {messages.map((message, index) => (
              <p key={`${index}-${message.role}`} className={`max-w-[90%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm ${message.role === 'user' ? 'ml-auto bg-primary text-white' : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'}`}>
                {message.content}
              </p>
            ))}
            {busy && <p className="text-sm text-gray-500">{t('copy.thinking')}</p>}
            {error && <p role="alert" className="text-sm text-red-700 dark:text-red-300">{error}</p>}
          </div>
          <form onSubmit={submit} className="flex gap-2 border-t border-gray-200 p-3 dark:border-gray-700">
            <label htmlFor="chat-message" className="sr-only">{t('forms.message')}</label>
            <input id="chat-message" value={input} onChange={(event) => setInput(event.target.value)} maxLength={4000} className="min-w-0 flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white" placeholder={t('copy.typeMessage')} />
            <button disabled={busy || !input.trim()} className="rounded-lg bg-primary px-3 py-2 font-semibold text-white disabled:opacity-50">{t('copy.send')}</button>
          </form>
        </section>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-2xl text-white shadow-lg hover:bg-primary-dark" aria-expanded={open} aria-label={open ? t('copy.closeChat') : t('copy.openChat')}>
        {open ? '×' : '💬'}
      </button>
    </div>
  );
}
