"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Sparkles, Trash2 } from "lucide-react";
import { api } from "../lib/api";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SUGGESTED_PROMPTS = [
  "Why is my credit score this high?",
  "How can I improve my score?",
  "What factors are hurting my score?",
  "What happens if my revenue increases by 20%?",
  "Explain my loan recommendation.",
  "Explain my cash-flow forecast.",
  "What does the fairness report mean?",
];

export default function Chatbot({
  context = {},
  title = "Vridhi Assistant",
}) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text) => {
      const msgText = text || input.trim();

      if (!msgText || loading) return;

      const userMsg = {
        role: "user",
        content: msgText,
      };

      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        const history = [...messages, userMsg]
          .slice(-10)
          .map((m) => ({
            role: m.role,
            content: m.content,
          }));

        const result = await api.chat(
          msgText,
          history,
          context
        );

        if (result.error && !result.data?.reply) {
          setError(result.error);

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: `I apologize, but I encountered an issue: ${result.error}`,
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                result.data?.reply ||
                "I could not generate a response.",
            },
          ]);
        }
      } catch {
        setError("Failed to connect to the AI assistant.");

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "I apologize, but I'm having trouble connecting right now. Please try again.",
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [input, loading, messages, context]
  );

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  const markdownComponents = {
    h1: ({ children }) => (
      <h1 className="text-base font-bold text-white mb-3">
        {children}
      </h1>
    ),

    h2: ({ children }) => (
      <h2 className="text-sm font-bold text-white mt-4 mb-2">
        {children}
      </h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-sm font-semibold text-white mt-3 mb-2">
        {children}
      </h3>
    ),

    p: ({ children }) => (
      <p className="mb-3 last:mb-0 leading-5">
        {children}
      </p>
    ),

    strong: ({ children }) => (
      <strong className="font-semibold text-white">
        {children}
      </strong>
    ),

    em: ({ children }) => (
      <em className="italic text-white/80">
        {children}
      </em>
    ),

    ul: ({ children }) => (
      <ul className="list-disc pl-5 mb-3 space-y-1">
        {children}
      </ul>
    ),

    ol: ({ children }) => (
      <ol className="list-decimal pl-5 mb-3 space-y-1">
        {children}
      </ol>
    ),

    li: ({ children }) => (
      <li className="leading-5 pl-1">
        {children}
      </li>
    ),

    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-cyan-300/40 pl-3 my-3 text-white/55 italic">
        {children}
      </blockquote>
    ),

    table: ({ children }) => (
      <div className="overflow-x-auto my-3 rounded-xl border border-white/10">
        <table className="w-full text-[10px] border-collapse">
          {children}
        </table>
      </div>
    ),

    thead: ({ children }) => (
      <thead className="bg-white/[.07] text-white">
        {children}
      </thead>
    ),

    tbody: ({ children }) => (
      <tbody className="bg-white/[.015]">
        {children}
      </tbody>
    ),

    tr: ({ children }) => (
      <tr className="border-b border-white/10 last:border-b-0">
        {children}
      </tr>
    ),

    th: ({ children }) => (
      <th className="text-left px-3 py-2.5 font-semibold text-white/90 border-r border-white/10 last:border-r-0 whitespace-nowrap">
        {children}
      </th>
    ),

    td: ({ children }) => (
      <td className="px-3 py-2.5 align-top text-white/65 border-r border-white/10 last:border-r-0 leading-4">
        {children}
      </td>
    ),

    hr: () => (
      <hr className="my-4 border-white/10" />
    ),

    a: ({ children, href }) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-300 hover:text-cyan-200 underline underline-offset-2"
      >
        {children}
      </a>
    ),

    code: ({ inline, children }) => {
      if (inline) {
        return (
          <code className="px-1.5 py-0.5 rounded-md bg-white/[.08] text-cyan-200 text-[10px]">
            {children}
          </code>
        );
      }

      return (
        <pre className="my-3 p-3 rounded-xl bg-black/40 border border-white/10 overflow-x-auto">
          <code className="text-[10px] text-cyan-100 leading-5">
            {children}
          </code>
        </pre>
      );
    },
  };

  return (
    <>
      {/* Floating chatbot button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-white text-black shadow-[0_15px_50px_rgba(0,0,0,.5)] hover:scale-105 transition-base flex items-center justify-center border border-white/20"
        aria-label="Open chatbot"
      >
        {open ? (
          <X className="w-6 h-6" />
        ) : (
          <Sparkles className="w-6 h-6" />
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[430px] h-[560px] max-h-[72vh] rounded-[22px] bg-[#101214]/95 backdrop-blur-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden">

          {/* Header */}
          <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between bg-white/[.025] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>

              <div>
                <div className="font-semibold text-sm text-white">
                  {title}
                </div>

                <div className="text-[10px] text-white/35">
                  Powered by Groq AI
                </div>
              </div>
            </div>

            <button
              onClick={clearChat}
              className="p-2 rounded-lg hover:bg-white/[.06] text-white/45 hover:text-white transition-colors"
              title="Clear chat"
              aria-label="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {/* Empty state */}
            {messages.length === 0 && (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[.04] flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-5 h-5 text-cyan-200" />
                </div>

                <p className="text-xs leading-5 text-white/45 mb-4">
                  Ask about credit scores, risk factors,
                  recommendations, forecasts, or fairness.
                </p>

                <div className="space-y-1.5">
                  {SUGGESTED_PROMPTS.slice(0, 4).map(
                    (prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="block w-full text-left text-[11px] text-white/65 border border-white/8 bg-white/[.025] hover:bg-white/[.06] rounded-xl px-3 py-2.5 transition-base"
                      >
                        {prompt}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Chat messages */}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[92%] rounded-2xl px-3.5 py-2.5 text-xs leading-5 ${
                    msg.role === "user"
                      ? "bg-white text-black rounded-br-md"
                      : "bg-white/[.07] text-white/75 border border-white/8 rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={markdownComponents}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/[.07] rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                  <span className="typing-dot w-1.5 h-1.5 bg-white/50 rounded-full" />
                  <span className="typing-dot w-1.5 h-1.5 bg-white/50 rounded-full" />
                  <span className="typing-dot w-1.5 h-1.5 bg-white/50 rounded-full" />
                </div>
              </div>
            )}

            {/* Error */}
            {error && !loading && (
              <div className="text-[11px] text-rose-300 bg-rose-400/10 border border-rose-400/15 rounded-xl px-3 py-2">
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3 flex gap-2 bg-black/20 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Ask about credit risk..."
              className="flex-1 text-xs rounded-xl px-3 py-2.5 focus:outline-none"
              disabled={loading}
            />

            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-white text-black rounded-xl px-3 py-2 hover:bg-white/90 disabled:opacity-30 transition-base"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}