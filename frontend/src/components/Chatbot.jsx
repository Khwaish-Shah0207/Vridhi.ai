"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageSquare, X, Send, Sparkles, Trash2 } from "lucide-react";
import { api } from "../lib/api";

const SUGGESTED_PROMPTS = [
  "Why is my credit score this high?",
  "How can I improve my score?",
  "What factors are hurting my score?",
  "What happens if my revenue increases by 20%?",
  "Explain my loan recommendation.",
  "Explain my cash-flow forecast.",
  "What does the fairness report mean?",
];

export default function Chatbot({ context = {}, title = "Vridhi Assistant" }) {
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

      const userMsg = { role: "user", content: msgText };
      setMessages((prev) => [...prev, userMsg]);
      setInput("");
      setLoading(true);
      setError(null);

      try {
        const history = [...messages, userMsg]
          .slice(-10)
          .map((m) => ({ role: m.role, content: m.content }));

        const result = await api.chat(msgText, history, context);

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
          const reply = result.data?.reply || "I could not generate a response.";
          setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        }
      } catch (err) {
        setError("Failed to connect to the AI assistant.");
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I apologize, but I'm having trouble connecting right now. Please try again.",
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

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-base flex items-center justify-center"
        aria-label="Open chatbot"
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <div>
                <div className="font-semibold text-sm">{title}</div>
                <div className="text-xs text-blue-100">Powered by Groq AI</div>
              </div>
            </div>
            <button
              onClick={clearChat}
              className="p-1.5 rounded-lg hover:bg-white/10 transition-base"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Sparkles className="w-8 h-8 text-blue-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500 mb-4">
                  I'm Vridhi Assistant. Ask me about credit scores, risk factors, or loan recommendations.
                </p>
                <div className="space-y-1.5">
                  {SUGGESTED_PROMPTS.slice(0, 4).map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="block w-full text-left text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg px-3 py-2 transition-base"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-slate-100 text-slate-700 rounded-bl-md"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                  <span className="typing-dot w-2 h-2 bg-slate-400 rounded-full" />
                  <span className="typing-dot w-2 h-2 bg-slate-400 rounded-full" />
                  <span className="typing-dot w-2 h-2 bg-slate-400 rounded-full" />
                </div>
              </div>
            )}

            {error && !loading && (
              <div className="text-xs text-red-500 bg-red-50 rounded-lg px-3 py-2">
                {error}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-3 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask about credit risk..."
              className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              className="bg-blue-600 text-white rounded-lg px-3 py-2 hover:bg-blue-700 disabled:opacity-40 transition-base"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
