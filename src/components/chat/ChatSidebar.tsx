'use client';

import { Plus, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

interface Conversation {
    id: string;
    title: string;
    timestamp: Date;
}

interface ChatSidebarProps {
    conversations: Conversation[];
    currentConversationId: string | null;
    onNewChat: () => void;
    onSelectConversation: (id: string) => void;
}

export function ChatSidebar({
    conversations,
    currentConversationId,
    onNewChat,
    onSelectConversation,
}: ChatSidebarProps) {

    return (
        <aside className="glass-panel h-full w-full flex flex-col rounded-3xl overflow-hidden backdrop-blur-md">

            {/* Header */}
            <div className="p-6 border-b border-[var(--glass-border)]">
                <button
                    onClick={onNewChat}
                    className="w-full relative group overflow-hidden rounded-xl bg-[var(--neon-cyan)] px-4 py-3 text-sm font-semibold text-black transition-all hover:shadow-[0_0_20px_var(--neon-cyan)] hover:scale-[1.02]"
                >
                    <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
                    <div className="relative flex items-center justify-center gap-2">
                        <Plus className="h-4 w-4" />
                        Init New Session
                    </div>
                </button>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {conversations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-8 text-center opacity-50">
                        <MessageSquare className="h-8 w-8 text-white/50" />
                        <p className="text-sm text-white/50">
                            No logs found
                        </p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {conversations.map((conv) => (
                            <button
                                key={conv.id}
                                onClick={() => onSelectConversation(conv.id)}
                                className={cn(
                                    'w-full group relative rounded-xl px-4 py-3 text-left text-sm transition-all duration-300',
                                    currentConversationId === conv.id
                                        ? 'bg-white/10 text-white border border-[var(--neon-cyan)]/30 shadow-[0_0_15px_-5px_var(--neon-cyan)]'
                                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                                )}
                            >
                                <div className="truncate font-medium tracking-wide">
                                    {conv.title}
                                </div>
                                <div className="mt-1 flex items-center justify-between text-[10px] uppercase tracking-wider opacity-60">
                                    <span>{conv.timestamp.toLocaleDateString()}</span>
                                    {currentConversationId === conv.id && (
                                        <div className="h-1.5 w-1.5 rounded-full bg-[var(--neon-cyan)] animate-pulse" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-[var(--glass-border)]">
                <div className="text-[10px] text-center text-white/30 font-mono tracking-widest uppercase">
                    Aaru OS v2.0
                </div>
            </div>
        </aside>
    );
}
