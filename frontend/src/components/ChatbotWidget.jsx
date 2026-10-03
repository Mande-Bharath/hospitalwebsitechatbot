import { MessageCircle, Send, X } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const initialMessages = [
  {
    sender: 'bot',
    text: 'Hi! I am MediBot. I can help with general hospital information, appointments, and basic health questions. Please remember: for serious symptoms, consult a doctor immediately.',
  },
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage = { sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chat`, { message: trimmed });

      const botReply = response?.data?.reply || 'I am here to help. Please try again in a moment.';
      setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
    } catch (error) {
      const serverMessage =
        error?.response?.data?.message ||
        'Sorry, I could not reach the assistant right now. Please try again later.';

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: serverMessage,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open ? (
        <div className="w-[350px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-cyan-600 px-4 py-3 text-white">
            <div>
              <p className="font-semibold">MediBot</p>
              <p className="text-xs text-cyan-100">Healthcare assistant</p>
            </div>
            <button onClick={() => setOpen(false)} className="rounded-full p-1 hover:bg-cyan-500">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex h-[360px] flex-col gap-3 bg-slate-50 p-4">
            <div className="flex-1 space-y-3 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={`${msg.sender}-${index}`}
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-cyan-600 text-white'
                      : 'bg-white text-slate-700 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              ))}
              {loading && (
                <div className="max-w-[85%] rounded-2xl bg-white px-3 py-2 text-sm text-slate-500 shadow-sm">
                  MediBot is thinking...
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about appointments or symptoms..."
                className="flex-1 border-none bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-600 text-white disabled:cursor-not-allowed disabled:bg-cyan-300"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600 text-white shadow-xl shadow-cyan-200 transition hover:scale-105"
        >
          <MessageCircle className="h-7 w-7" />
        </button>
      )}
    </div>
  );
}
