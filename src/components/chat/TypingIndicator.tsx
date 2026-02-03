'use client';

import { Bot } from 'lucide-react';

export function TypingIndicator() {
    return (
        <div className="flex gap-4 px-4 py-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Avatar */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
                <Bot className="h-4 w-4 text-white" />
            </div>

            {/* Typing animation */}
            <div className="flex items-center gap-1 pt-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 dark:bg-zinc-600 [animation-delay:-0.3s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 dark:bg-zinc-600 [animation-delay:-0.15s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-zinc-400 dark:bg-zinc-600" />
            </div>
        </div>
    );
}
