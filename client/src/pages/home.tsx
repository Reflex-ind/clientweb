import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Lenis from 'lenis';

const WORK_ITEMS = [
  { id: 1, title: "Gaming Tournament", category: "GFX", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Modern Vibe", category: "GFX", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Epic Battle", category: "GFX", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Tech Review", category: "GFX", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Street Style", category: "GFX", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Neon Nights", category: "GFX", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
];

function WorkCard({ item }: { item: typeof WORK_ITEMS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 60, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 60, damping: 20 });

  return (
    <motion.div
      ref={cardRef}
      style={{ perspective: "2000px", rotateX: springRotateX, opacity, scale: springScale }}
      className="group relative aspect-video overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-700 ease-out border border-black/[0.03]"
      data-testid={`card-work-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex flex-col justify-end p-8">
        <p className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em] mb-2">{item.category}</p>
        <h3 className="text-2xl font-black text-white tracking-tighter uppercase">{item.title}</h3>
      </div>
    </motion.div>
  );
}

function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'online' | 'offline' | 'dnd'>('online');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! Looking for some GFX work?", sender: 'admin' }
  ]);
  const [input, setInput] = useState('');

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    dnd: 'bg-red-500'
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { id: Date.now(), text: input, sender: 'user' }]);
    setInput('');
  };

  return (
    <div className="fixed bottom-10 right-10 z-[100]">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-16 h-16 bg-black rounded-full shadow-2xl flex items-center justify-center text-white"
      >
        <div className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-white ${statusColors[status]}`}></div>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-20 right-0 w-80 bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-black/5 overflow-hidden"
          >
            <div className="p-6 bg-black text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold">A</div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-black ${statusColors[status]}`}></div>
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-widest leading-none">Aryan Dzn</p>
                  <p className="text-[10px] opacity-50 uppercase font-bold tracking-widest">{status === 'online' ? 'Available' : status === 'dnd' ? 'Busy' : 'Away'}</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="opacity-50 hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <div className="h-80 overflow-y-auto p-6 space-y-4 bg-[#F8F9FA]">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm font-medium ${msg.sender === 'user' ? 'bg-black text-white rounded-tr-none' : 'bg-white text-black shadow-sm rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white border-t border-black/5 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium"
              />
              <button type="submit" className="p-2 bg-black text-white rounded-xl hover:scale-105 transition-transform">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] font-inter selection:bg-black selection:text-white overflow-x-hidden">
      <LiveChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-2xl border-b border-black/5">
        <div className="flex items-center gap-2">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-xs">GFX</motion.div>
          <span className="text-sm font-black uppercase tracking-[0.3em] hidden md:block">Aryan Dzn</span>
        </div>
        <div className="flex gap-8 text-[11px] font-black uppercase tracking-[0.3em]">
          <a href="#home" className="hover:opacity-50 transition-opacity">Home</a>
          <a href="#portfolio" className="hover:opacity-50 transition-opacity">Work</a>
          <a href="#about" className="hover:opacity-50 transition-opacity">Info</a>
          <button className="bg-black text-white px-6 py-2 rounded-full hover:scale-105 transition-all shadow-xl">Hire Me</button>
        </div>
      </nav>

      <main id="home">
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-center relative">
          <motion.div
            initial={{ opacity: 0, scale: 1.2, rotateX: 40 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: "1000px" }}
          >
            <h1 className="text-[14vw] md:text-[12vw] font-black leading-[0.75] tracking-[-0.08em] uppercase font-space-grotesk text-black">
              GFX<br />MASTER
            </h1>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <div className="h-[1px] w-12 bg-black/20"></div>
              <p className="text-sm text-black font-black uppercase tracking-[0.6em]">Ultra Professional</p>
              <div className="h-[1px] w-12 bg-black/20"></div>
            </motion.div>
          </motion.div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="px-8 py-40 bg-white rounded-[4rem] shadow-[0_-50px_100px_rgba(0,0,0,0.05)] relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between border-b border-black/5 pb-16">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-black/20 uppercase tracking-[0.5em] block">Vault 2026</span>
                <h2 className="text-7xl md:text-9xl font-black tracking-[-0.05em] uppercase font-space-grotesk">GFX WORK</h2>
              </div>
              <p className="max-w-xs text-sm text-black/40 font-bold uppercase tracking-widest leading-loose mt-8 md:mt-0">
                Crafting visual leverage for the world's elite creators.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {WORK_ITEMS.map((item) => (
                <WorkCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-60 px-8 relative overflow-hidden">
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, rotateX: 20 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 1 }}
              className="text-center space-y-16"
            >
              <span className="text-xs font-black text-black/20 uppercase tracking-[0.8em]">Identity</span>
              <h3 className="text-4xl md:text-7xl font-black leading-[1.1] tracking-tighter uppercase font-space-grotesk italic">
                I am a professional <span className="text-black/20">GFX designer</span> specializing in high-CTR storytelling.
              </h3>
              <div className="grid md:grid-cols-2 gap-12 text-left">
                <p className="text-xl text-black/60 font-medium leading-relaxed">
                  3+ years of battle-tested experience in the YouTube gaming niche. My goal is to turn cold viewers into loyal followers.
                </p>
                <p className="text-xl text-black/60 font-medium leading-relaxed">
                  Every asset is engineered for maximum psychological impact and click-through optimization.
                </p>
              </div>
            </motion.div>
          </div>
          {/* Background Text Decor */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-black/[0.02] uppercase pointer-events-none select-none -z-10 whitespace-nowrap">
            STORYTELLING
          </div>
        </section>
      </main>

      <footer className="py-20 px-8 flex flex-col items-center gap-12 bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white font-black text-lg">A</div>
          <span className="text-sm font-black uppercase tracking-[0.5em]">Aryan Dzn</span>
        </div>
        <div className="flex gap-12 text-[10px] tracking-[0.4em] uppercase font-black text-black/30">
          <a href="#" className="hover:text-black transition-colors">X / Twitter</a>
          <a href="#" className="hover:text-black transition-colors">Instagram</a>
          <a href="#" className="hover:text-black transition-colors">Discord</a>
        </div>
        <p className="text-[10px] font-black opacity-20 uppercase tracking-[0.3em]">© 2026 All Rights Reserved</p>
      </footer>
    </div>
  );
}
