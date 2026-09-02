import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import {
  Sparkles,
  X,
  Send,
  RotateCcw,
  User,
  MessageSquareCode,
  ArrowUpRight,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

const SUGGESTED_QUESTIONS = [
  'Tell me about yourself',
  'Show your projects',
  'What technologies do you know?',
  'Tell me about your journey',
  'Education & GTU info',
  'Contact information',
];

export const AryanAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = sessionStorage.getItem('aryan_ai_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load chat history:', e);
    }

    return [
      {
        id: 'welcome-msg',
        role: 'assistant',
        text: "👋 Hi! I'm **Aryan AI**, Aryan's portfolio assistant. Ask me anything about his software engineering projects, tech stack, education at GTU, military background, or how to reach him!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Save to sessionStorage
  useEffect(() => {
    try {
      sessionStorage.setItem('aryan_ai_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error('Failed to save chat history:', e);
    }
  }, [messages]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const queryText = (textToSend || input).trim();
    if (!queryText || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: queryText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Build history payload for backend
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome-msg')
        .map((m) => ({
          role: m.role,
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          history: historyPayload,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => null);
        const serverError = errData?.error || "Aryan AI is temporarily resting. Feel free to ask about his projects or contact him directly!";
        const aiMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          text: serverError,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, aiMsg]);
        return;
      }

      const data = await res.json();

      let assistantReply =
        data.reply ||
        data.error ||
        "I'm designed to answer questions about Aryan and his portfolio.";

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: assistantReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat API Network Error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: "I'm having trouble reaching the server right now. Please check your network connection or try again in a moment.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    const defaultMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'assistant',
      text: "Chat cleared! Ready to answer any new questions about Aryan's portfolio.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([defaultMsg]);
    sessionStorage.removeItem('aryan_ai_chat_history');
  };

  return (
    <>
      {/* Floating Action Button with Minimal, Premium Design */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <div className="relative group">
              {/* Professional Tooltip on Hover */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute bottom-full right-0 mb-3 px-3.5 py-1.5 rounded-xl bg-[#202124] text-[#FAFAF8] text-[11px] font-medium tracking-wide shadow-xl border border-emerald-500/30 whitespace-nowrap pointer-events-none hidden sm:flex items-center gap-1.5"
                  >
                    <span>Ask about my portfolio</span>
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Minimalist Floating Button */}
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setIsOpen(true)}
                className="relative flex items-center gap-2.5 bg-[#202124] dark:bg-[#121315] text-[#FAFAF8] px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl shadow-xl border border-emerald-500/40 hover:border-emerald-400 transition-all duration-300 cursor-pointer backdrop-blur-md group/btn ring-2 ring-emerald-500/20 hover:ring-emerald-500/40"
              >
                {/* Clean Assistant Icon Container */}
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 group-hover/btn:bg-emerald-500 group-hover/btn:text-white transition-colors duration-300">
                  <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 group-hover/btn:text-white transition-colors" />
                </div>

                {/* Button Label */}
                <div className="flex flex-col items-start text-left">
                  <span className="text-xs font-semibold font-display tracking-tight text-[#FAFAF8] flex items-center gap-1.5">
                    Aryan AI
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </span>
                  <span className="text-[10px] text-[#A0A2A5] font-normal leading-none hidden sm:inline">
                    Interactive Assistant
                  </span>
                </div>
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Chat Modal Overlay & Window */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex items-end sm:items-auto justify-center pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="pointer-events-auto w-full sm:w-[410px] h-[100dvh] sm:h-[600px] max-h-[100dvh] sm:max-h-[85vh] bg-[#FAFAF8] dark:bg-[#1C1D21] border border-[#202124]/10 dark:border-white/10 shadow-2xl sm:rounded-2xl flex flex-col overflow-hidden text-[#202124] dark:text-[#FAFAF8] transition-colors duration-300"
            >
              {/* Top Header */}
              <div className="bg-[#202124] dark:bg-[#121315] text-[#FAFAF8] px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between border-b border-[#383A3E] dark:border-white/10 relative shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FAFAF8]/10 border border-[#FAFAF8]/15 flex items-center justify-center text-[#FAFAF8] shadow-inner relative">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#202124]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold font-display tracking-tight text-[#FAFAF8]">
                        Aryan AI
                      </h3>
                      <span className="text-[9px] font-mono font-medium tracking-wider px-1.5 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                        ONLINE
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A0A2A5]">Personal Portfolio Assistant</p>
                  </div>
                </div>

                {/* Header Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleClearHistory}
                    title="Clear Chat History"
                    className="p-1.5 rounded-lg text-[#A0A2A5] hover:text-[#FAFAF8] hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Close Assistant"
                    className="p-1.5 rounded-lg text-[#A0A2A5] hover:text-[#FAFAF8] hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#F4F3F0]/70 dark:bg-[#121315]/80">
                {messages.map((msg) => {
                  const isAssistant = msg.role === 'assistant';

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                    >
                      {isAssistant && (
                        <div className="w-7 h-7 rounded-lg bg-[#202124] dark:bg-[#2C2E33] text-[#FAFAF8] flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        </div>
                      )}

                      <div
                        className={`max-w-[82%] sm:max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm shadow-xs ${
                          isAssistant
                            ? 'bg-[#FAFAF8] dark:bg-[#1C1D21] text-[#202124] dark:text-[#FAFAF8] border border-[#202124]/10 dark:border-white/10 rounded-tl-xs'
                            : 'bg-[#202124] dark:bg-[#2C2E33] text-[#FAFAF8] rounded-tr-xs'
                        }`}
                      >
                        {isAssistant ? (
                          <div className="markdown-body space-y-2 leading-relaxed text-[#202124] dark:text-[#FAFAF8]">
                            <Markdown>{msg.text}</Markdown>
                          </div>
                        ) : (
                          <p className="whitespace-pre-wrap leading-relaxed text-[#FAFAF8]">
                            {msg.text}
                          </p>
                        )}

                        <div
                          className={`mt-1.5 text-[10px] ${
                            isAssistant ? 'text-[#8B8D88] dark:text-[#A0A2A5] text-left' : 'text-[#A0A2A5] text-right'
                          }`}
                        >
                          {msg.timestamp}
                        </div>
                      </div>

                      {!isAssistant && (
                        <div className="w-7 h-7 rounded-lg bg-[#202124] dark:bg-[#2C2E33] text-[#FAFAF8] flex items-center justify-center shrink-0 text-xs shadow-2xs mt-0.5">
                          <User className="w-3.5 h-3.5 text-[#FAFAF8]" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Loading / Typing Indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 justify-start"
                  >
                    <div className="w-7 h-7 rounded-lg bg-[#202124] dark:bg-[#2C2E33] text-[#FAFAF8] flex items-center justify-center shrink-0 text-xs shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    </div>
                    <div className="bg-[#FAFAF8] dark:bg-[#1C1D21] border border-[#202124]/10 dark:border-white/10 rounded-2xl rounded-tl-xs px-3.5 py-2.5 shadow-2xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#202124] dark:bg-[#FAFAF8] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#202124] dark:bg-[#FAFAF8] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#202124] dark:bg-[#FAFAF8] animate-bounce" style={{ animationDelay: '300ms' }} />
                      <span className="text-xs text-[#6B6D70] dark:text-[#A0A2A5] ml-1.5 font-medium">Aryan AI thinking...</span>
                    </div>
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Suggested Questions (Pills) */}
              <div className="px-3.5 py-2 bg-[#FAFAF8] dark:bg-[#1C1D21] border-t border-[#202124]/10 dark:border-white/10 overflow-x-auto no-scrollbar flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-bold text-[#6B6D70] dark:text-[#A0A2A5] uppercase tracking-wider whitespace-nowrap flex items-center gap-1 mr-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-500" />
                  Ideas:
                </span>
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    disabled={loading}
                    className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-[#F4F3F0] dark:bg-[#2C2E33] hover:bg-[#202124] hover:text-[#FAFAF8] dark:hover:bg-[#FAFAF8] dark:hover:text-[#202124] text-[#202124] dark:text-[#FAFAF8] border border-[#202124]/10 dark:border-white/10 text-[11px] font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Input Form Footer */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="p-3 bg-[#FAFAF8] dark:bg-[#1C1D21] border-t border-[#202124]/10 dark:border-white/10 flex items-center gap-2 shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Aryan AI anything..."
                  disabled={loading}
                  className="flex-1 bg-[#F4F3F0] dark:bg-[#121315] border border-[#202124]/10 dark:border-white/10 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-[#202124] dark:text-[#FAFAF8] placeholder-[#8B8D88] dark:placeholder-[#6B6D70] focus:outline-none focus:border-[#202124] dark:focus:border-[#FAFAF8] transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] hover:bg-black dark:hover:bg-[#E9E8E4] disabled:opacity-40 disabled:hover:bg-[#202124] flex items-center justify-center shadow-xs transition-colors cursor-pointer shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

