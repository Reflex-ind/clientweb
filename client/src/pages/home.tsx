import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Link } from "wouter";
import { MessageSquare, Send, User, ShieldCheck, Mail, MapPin, Phone, Github, Twitter, Instagram } from "lucide-react";

const WORK_ITEMS = [
  { id: 1, title: "CYBERPUNK 2077", category: "Gaming Thumbnail", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "VALORANT CLUTCH", category: "Thumbnail Design", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "MINECRAFT SURVIVAL", category: "GFX Concept", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "WARZONE SEASON 5", category: "High CTR Thumbnail", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "GTA V RP MOMENTS", category: "Social Media GFX", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "APEX LEGENDS", category: "Motion GFX", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
];

function WorkCard({ item }: { item: typeof WORK_ITEMS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const rotateXRaw = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 100, damping: 30 });
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{ perspective: "1500px", rotateX, opacity, scale }}
      className="group relative aspect-video overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-700 border border-slate-200"
      data-testid={`card-work-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 flex flex-col justify-end p-8">
        <p className="text-[10px] font-bold text-white/70 uppercase tracking-[0.4em] mb-3 font-plus-jakarta">{item.category}</p>
        <h3 className="text-4xl font-bold text-white tracking-tighter font-bebas-neue leading-none">{item.title}</h3>
      </div>
    </motion.div>
  );
}

function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi! How can I help you today?", sender: "admin", time: "10:00 AM" },
    { id: 2, text: "I'm interested in a custom thumbnail.", sender: "user", time: "10:02 AM" },
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
    <div className="flex flex-col h-[70vh] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
      <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
            {isAdmin ? <ShieldCheck className="text-slate-600" /> : <User className="text-slate-600" />}
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{isAdmin ? "Admin Support" : "Client Portal"}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Online
            </p>
          </div>
        </div>
        <button 
          onClick={() => setIsAdmin(!isAdmin)}
          className="text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full border border-slate-300 hover:bg-slate-100 transition-colors"
        >
          Switch to {isAdmin ? "Client" : "Admin"} View
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.sender === (isAdmin ? "admin" : "user") ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
              m.sender === (isAdmin ? "admin" : "user") 
                ? "bg-slate-900 text-white rounded-tr-none" 
                : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none"
            }`}>
              {m.text}
              <p className={`text-[10px] mt-1 ${m.sender === (isAdmin ? "admin" : "user") ? "text-white/40" : "text-slate-400"}`}>{m.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 bg-white border-t border-slate-200 flex gap-3">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          className="flex-1 bg-slate-100 border-none rounded-xl px-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all"
        />
        <button 
          onClick={sendMessage}
          className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-plus-jakarta selection:bg-slate-900 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-10 bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
        <div className="w-1/3 text-2xl font-bold tracking-tighter uppercase font-bebas-neue text-slate-900">
          GFX©STUDIO
        </div>
        <div className="w-1/3"></div>
        <div className="w-1/3 flex justify-end gap-8 text-[10px] font-bold uppercase tracking-[0.4em]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`transition-all ${activeTab === tab.id ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
              data-testid={`tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
          <Link href="/chat">
            <a className="bg-slate-900 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-all">
              <MessageSquare size={12} /> Chat
            </a>
          </Link>
        </div>
      </nav>

      <main className="pt-32">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <section className="h-[70vh] flex flex-col items-center justify-center text-center px-12">
                <h1 className="text-[15vw] font-bold leading-[0.75] tracking-[-0.06em] uppercase font-bebas-neue text-slate-900">
                  Digital<br />Designer
                </h1>
                <p className="mt-12 text-[11px] text-slate-400 uppercase tracking-[0.6em] font-medium">
                  Premium Work Portfolio — Vol. 2
                </p>
              </section>

              <section className="px-12 pb-40 max-w-[1600px] mx-auto">
                <div className="mb-20 flex flex-col md:flex-row items-baseline justify-between border-b border-slate-200 pb-12">
                  <h2 className="text-7xl font-bold tracking-tighter uppercase font-bebas-neue text-slate-900">GTX Work</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                  {WORK_ITEMS.map((item) => (
                    <WorkCard key={item.id} item={item} />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-5xl mx-auto px-12 py-20"
            >
              <h2 className="text-9xl font-bold uppercase font-bebas-neue text-slate-900 mb-12">Who Am I</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="space-y-8">
                  <p className="text-2xl font-light text-slate-600 leading-relaxed">
                    A multi-disciplinary designer specializing in gaming graphics, motion design, and digital identity for the next generation of content creators.
                  </p>
                  <p className="text-slate-500 leading-relaxed">
                    With over 5 years of experience in the GFX industry, I've worked with some of the biggest names in the streaming world, helping them elevate their visual presence and brand authority through high-impact thumbnails and custom overlays.
                  </p>
                </div>
                <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">Expertise</h3>
                  <div className="space-y-4">
                    {["Thumbnail Design", "Brand Identity", "Motion Graphics", "3D Visualization", "Concept Art"].map((skill) => (
                      <div key={skill} className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <span className="font-bold text-slate-900">{skill}</span>
                        <span className="text-[10px] text-slate-400">01</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto px-12 py-20"
            >
              <h2 className="text-9xl font-bold uppercase font-bebas-neue text-slate-900 mb-12">Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="space-y-12">
                  <div className="space-y-4">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">Drop a line</h3>
                    <p className="text-4xl font-bold tracking-tighter font-bebas-neue">hello@gfxstudio.replit</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase font-bold text-slate-400">Socials</h4>
                      <div className="flex flex-col gap-1 text-sm font-bold">
                        <a href="#" className="hover:text-slate-400 transition-colors">Behance</a>
                        <a href="#" className="hover:text-slate-400 transition-colors">Instagram</a>
                        <a href="#" className="hover:text-slate-400 transition-colors">Twitter</a>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase font-bold text-slate-400">Studio</h4>
                      <p className="text-sm font-bold">Remote Worldwide</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-12 rounded-3xl border border-slate-200 shadow-xl">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Your Name</label>
                      <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Email Address</label>
                      <input type="email" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900 transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-slate-400">Message</label>
                      <textarea rows={4} className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900 transition-all" />
                    </div>
                    <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:scale-[1.02] transition-transform">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-20 px-12 flex flex-col md:flex-row justify-between items-center border-t border-slate-200 bg-white">
        <p className="text-slate-400 text-[10px] tracking-[0.4em] uppercase font-bold italic">Visualizing the future of gaming</p>
        <div className="flex gap-12 text-[10px] tracking-[0.5em] uppercase font-bold mt-8 md:mt-0">
          <a href="#" className="hover:text-slate-400 transition-colors">Github</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Twitter</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Behance</a>
        </div>
        <p className="text-slate-300 text-[10px] tracking-[0.4em] uppercase mt-8 md:mt-0">© 2026 Digital Designer</p>
      </footer>
    </div>
  );
}
