import { motion } from "framer-motion";
import { MessageSquare, Send, User, ShieldCheck, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to GFX Studio! How can we assist with your design project?", sender: "admin", time: "10:00 AM" },
    { id: 2, text: "I'd like to get a quote for 5 YouTube thumbnails.", sender: "user", time: "10:02 AM" },
  ]);
  const [input, setInput] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, { 
      id: Date.now(), 
      text: input, 
      sender: isAdmin ? "admin" : "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 md:p-12 font-plus-jakarta">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl h-[85vh] flex flex-col bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Chat Header */}
        <div className="bg-slate-900 text-white p-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <a className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                <ArrowLeft size={18} />
              </a>
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                <User className="text-slate-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Admin Support</h3>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Online
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-10 space-y-6 bg-slate-50/50">
          {messages.map((m) => (
            <div key={m.id} className={`flex ${m.sender === (isAdmin ? "admin" : "user") ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[70%] space-y-2`}>
                <div className={`p-5 rounded-3xl text-sm leading-relaxed ${
                  m.sender === (isAdmin ? "admin" : "user") 
                    ? "bg-slate-900 text-white rounded-tr-none shadow-lg shadow-slate-900/10" 
                    : "bg-white text-slate-700 shadow-sm border border-slate-200 rounded-tl-none"
                }`}>
                  {m.text}
                </div>
                <p className={`text-[10px] font-bold uppercase tracking-widest ${m.sender === (isAdmin ? "admin" : "user") ? "text-right text-slate-400" : "text-left text-slate-400"}`}>
                  {m.time} • {m.sender.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-8 bg-white border-t border-slate-200 flex gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Discuss your next big project..."
            className="flex-1 bg-slate-100 border-none rounded-2xl px-6 text-sm focus:ring-2 focus:ring-slate-900 transition-all placeholder:text-slate-400"
          />
          <button 
            onClick={sendMessage}
            className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-900/20"
          >
            <Send size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
