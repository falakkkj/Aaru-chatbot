'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { Bot, Sparkles } from 'lucide-react';
import { AnimatedAvatar } from '@/components/chat/AnimatedAvatar';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: Date;
  messages: Message[];
}

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConversation = conversations.find(c => c.id === currentConversationId);
  const messages = currentConversation?.messages || [];

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatbot_conversations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved, (key, value) => {
          if (key === 'timestamp') return new Date(value);
          return value;
        });
        setConversations(parsed);
        if (parsed.length > 0) {
          setCurrentConversationId(parsed[0].id);
        } else {
          handleNewChat();
        }
      } catch (e) {
        console.error('Failed to parse conversations', e);
        handleNewChat();
      }
    } else {
      handleNewChat();
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('chatbot_conversations', JSON.stringify(conversations));
    }
  }, [conversations, isLoaded]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleNewChat = () => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'New Session',
      timestamp: new Date(),
      messages: [],
    };
    setConversations(prev => [newConversation, ...prev]);
    setCurrentConversationId(newConversation.id);
  };

  const handleSendMessage = async (content: string) => {
    if (!currentConversationId) {
      // Should ideally not happen if handled correctly in init, but safe fallback
      handleNewChat();
      setTimeout(() => handleSendMessage(content), 100);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    setConversations(prev =>
      prev.map(conv =>
        conv.id === currentConversationId
          ? {
            ...conv,
            messages: [...conv.messages, userMessage],
            title: conv.messages.length === 0 ? content.slice(0, 30) + (content.length > 30 ? '...' : '') : conv.title,
          }
          : conv
      )
    );

    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response || "I am unable to process that request.",
        timestamp: new Date(),
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.id === currentConversationId
            ? { ...conv, messages: [...conv.messages, assistantMessage] }
            : conv
        )
      );
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Connection lost. Please ensure the neural core (server) is active.',
        timestamp: new Date(),
      };

      setConversations(prev =>
        prev.map(conv =>
          conv.id === currentConversationId
            ? { ...conv, messages: [...conv.messages, errorMessage] }
            : conv
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) return null; // Prevent hydration mismatch

  return (
    <div className="flex h-screen w-full overflow-hidden p-4 md:p-6 lg:p-8 gap-6">

      {/* Sidebar - Floating Glass */}
      <div className="hidden md:block w-72 shrink-0">
        <ChatSidebar
          conversations={conversations}
          currentConversationId={currentConversationId}
          onNewChat={handleNewChat}
          onSelectConversation={setCurrentConversationId}
        />
      </div>

      {/* Main Container - Floating Glass */}
      <div className="flex-1 flex flex-col glass-panel rounded-3xl overflow-hidden relative">

        {/* Holographic Header */}
        <div className="h-16 border-b border-[var(--glass-border)] flex items-center px-6 justify-between bg-white/5 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[var(--neon-cyan)] shadow-[0_0_10px_var(--neon-cyan)] animate-pulse" />
            <h2 className="text-lg font-medium tracking-wide text-white/90">
              <span className="text-[var(--neon-cyan)]">AARU</span>
            </h2>
          </div>
          <div className="text-xs text-white/40 font-mono">SYS.ONLINE</div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth">
          {messages.length === 0 && !isLoading ? (
            <div className="flex h-full flex-col items-center justify-center gap-6 opacity-70">
              <div className="relative">
                <div className="absolute inset-0 bg-[var(--neon-cyan)] blur-3xl opacity-20 rounded-full animate-pulse" />
                <div className="relative h-96 w-96 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[var(--neon-cyan)] blur-3xl opacity-20 rounded-full animate-pulse" />
                  <AnimatedAvatar state="idle" width={350} height={350} />
                </div>
              </div>

            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-6">
              {messages.map(message => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-black/20 backdrop-blur-lg border-t border-[var(--glass-border)]">
          <ChatInput onSend={handleSendMessage} disabled={isLoading} />
        </div>
      </div>
    </div>
  );
}
