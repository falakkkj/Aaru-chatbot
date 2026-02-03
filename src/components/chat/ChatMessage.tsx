'use client';

import { useState } from 'react';
import { Copy, Check, User, Bot, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedAvatar } from '@/components/chat/AnimatedAvatar';

interface ChatMessageProps {
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div
            className={cn(
                'group flex gap-6 px-4 py-4 transition-all duration-500 hover:bg-white/5 rounded-2xl animate-in fade-in slide-in-from-bottom-4',
                role === 'user' ? 'flex-row-reverse' : 'flex-row'
            )}
        >
            {/* Avatar */}
            <div
                className={cn(
                    'flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl backdrop-blur-md shadow-lg border border-white/10 overflow-hidden',
                    role === 'user'
                        ? 'bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] shadow-[0_0_15px_-5px_var(--neon-purple)] h-10 w-10'
                        : 'bg-transparent'
                )}
            >
                {role === 'user' ? (
                    <User className="h-5 w-5" />
                ) : (
                    <AnimatedAvatar state="idle" width={96} height={96} />
                )}
            </div>

            {/* Content */}
            <div className={cn(
                "flex-1 space-y-2 max-w-3xl",
                role === 'user' ? 'items-end flex flex-col' : ''
            )}>
                <div className="flex items-center gap-3 opacity-60">
                    <span className="text-xs font-bold tracking-wider text-white uppercase">
                        {role === 'user' ? 'Operator' : 'Aaru'}
                    </span>
                    <span className="text-[10px] font-mono text-white/50">
                        {formatTime(timestamp)}
                    </span>
                </div>

                <div className={cn(
                    "relative overflow-hidden rounded-2xl p-5 text-sm leading-relaxed shadow-xl backdrop-blur-xl border border-white/5",
                    role === 'user'
                        ? "bg-gradient-to-br from-[var(--neon-purple)]/10 to-transparent text-white/90 rounded-tr-none border-[var(--neon-purple)]/20"
                        : "bg-white/5 text-white/80 rounded-tl-none border-[var(--neon-cyan)]/10"
                )}>
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

                    <div className="prose prose-invert max-w-none relative z-10">
                        {content}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                        onClick={handleCopy}
                        className="flex items-center gap-1.5 rounded-md px-2 py-1 text-[10px] uppercase tracking-wider text-white/40 hover:text-[var(--neon-cyan)] hover:bg-white/5 transition-colors"
                    >
                        {copied ? (
                            <>
                                <Check className="h-3 w-3" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="h-3 w-3" />
                                Copy
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
