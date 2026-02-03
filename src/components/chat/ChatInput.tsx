'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
    onSend: (message: string) => void;
    disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
    const [message, setMessage] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // Auto-resize textarea
    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    }, [message]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim() && !disabled) {
            onSend(message.trim());
            setMessage('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-3xl relative"
        >
            <div className="relative flex items-end gap-2 p-1.5 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 focus-within:border-[var(--neon-cyan)]/50 focus-within:shadow-[0_0_25px_-5px_var(--neon-cyan)]">

                <div className="pl-3 pb-3 text-[var(--neon-cyan)] opacity-50 animate-pulse">
                    <Sparkles className="h-5 w-5" />
                </div>

                <textarea
                    ref={textareaRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter command..."
                    disabled={disabled}
                    rows={1}
                    className={cn(
                        'flex-1 resize-none bg-transparent px-4 py-3 max-h-[200px]',
                        'text-sm text-white placeholder:text-white/30',
                        'focus:outline-none',
                        'disabled:cursor-not-allowed disabled:opacity-50',
                        'transition-colors scrollbar-none'
                    )}
                />

                <button
                    type="submit"
                    disabled={!message.trim() || disabled}
                    className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-full mb-0.5 mr-0.5',
                        'bg-[var(--neon-cyan)] text-zinc-900 transition-all duration-300',
                        'hover:bg-white hover:shadow-[0_0_15px_var(--neon-cyan)] hover:scale-105',
                        'disabled:bg-white/10 disabled:text-white/20 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none'
                    )}
                >
                    <Send className="h-4 w-4" />
                </button>
            </div>

            <div className="absolute -bottom-8 left-0 right-0 text-center">
                <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-light">
                    Secure Channel • End-to-End Encrypted
                </p>
            </div>
        </form>
    );
}
