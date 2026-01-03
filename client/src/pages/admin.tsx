import { motion } from "framer-motion";
import { ShieldCheck, ArrowLeft, Send, User, MessageSquare } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [selectedClient, setSelectedClient] = useState<number | null>(null);

  const clients = [
    { id: 1, name: "John Doe", lastMessage: "I need 5 thumbnails...", time: "2m ago" },
    { id: 2, name: "Sarah Smith", lastMessage: "When can we start?", time: "1h ago" },
    { id: 3, name: "Mike Ross", lastMessage: "The colors look great!", time: "3h ago" },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Try admin/admin123");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-plus-jakarta">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-200"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Admin Portal</h2>
            <p className="text-slate-500 text-sm mt-2 font-medium">Please sign in to manage client chats</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all outline-none"
                placeholder="Enter username"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-all shadow-lg shadow-slate-900/20">
              Access Dashboard
            </button>
          </form>
          <Link href="/">
            <a className="flex items-center justify-center mt-8 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest gap-2">
              <ArrowLeft size={14} /> Back to Site
            </a>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-plus-jakarta">
      {/* Sidebar - Client List */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
            <MessageSquare size={20} className="text-slate-400" /> Inbox
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {clients.map((client) => (
            <button
              key={client.id}
              onClick={() => setSelectedClient(client.id)}
              className={`w-full p-6 text-left border-b border-slate-50 transition-all hover:bg-slate-50 ${selectedClient === client.id ? "bg-slate-50 border-r-4 border-r-slate-900" : ""}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-slate-900">{client.name}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{client.time}</span>
              </div>
              <p className="text-xs text-slate-500 truncate font-medium">{client.lastMessage}</p>
            </button>
          ))}
        </div>
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest">Admin</p>
              <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Pratik Dzn</p>
            </div>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="text-[10px] uppercase font-bold text-white/40 hover:text-white transition-colors">Logout</button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {selectedClient ? (
          <>
            <div className="p-8 bg-white border-b border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                  <User className="text-slate-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{clients.find(c => c.id === selectedClient)?.name}</h3>
                  <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest">Active Discussion</p>
                </div>
              </div>
            </div>
            <div className="flex-1 p-10 overflow-y-auto space-y-6">
              <div className="flex justify-start">
                <div className="max-w-[70%] bg-white border border-slate-200 p-5 rounded-3xl rounded-tl-none text-sm text-slate-700 shadow-sm leading-relaxed">
                  I'm interested in a custom thumbnail.
                </div>
              </div>
              <div className="flex justify-end">
                <div className="max-w-[70%] bg-slate-900 text-white p-5 rounded-3xl rounded-tr-none text-sm shadow-lg shadow-slate-900/10 leading-relaxed">
                  Hi there! We can certainly help with that. What kind of style are you looking for?
                </div>
              </div>
            </div>
            <div className="p-8 bg-white border-t border-slate-200 flex gap-4">
              <input 
                type="text" 
                placeholder="Type your response..."
                className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all outline-none"
              />
              <button className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-slate-900/20">
                <Send size={20} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12">
            <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center shadow-xl border border-slate-100 mb-8">
              <MessageSquare size={40} className="text-slate-200" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Select a Client</h3>
            <p className="text-slate-400 text-sm mt-2 max-w-xs font-medium leading-relaxed">Choose a conversation from the sidebar to start replying to your clients.</p>
          </div>
        )}
      </div>
    </div>
  );
}
