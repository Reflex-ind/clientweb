import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";

const WORK_ITEMS = [
  { id: 1, title: "Gaming Tournament", category: "Thumbnail", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Modern Vibe", category: "Branding", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Epic Battle", category: "GFX", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Tech Review", category: "Thumbnail", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Street Style", category: "Thumbnail", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Neon Nights", category: "Thumbnail", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
];

function WorkCard({ item }: { item: typeof WORK_ITEMS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{ perspective: "1200px", rotateX, opacity, scale }}
      className="group relative aspect-video overflow-hidden rounded-lg bg-white shadow-xl transition-all duration-500 ease-out border border-black/5"
      data-testid={`card-work-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
        <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-1">{item.category}</p>
        <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#1A1A1A] font-inter selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-md border-b border-black/5">
        <div className="w-1/3"></div>
        <div className="w-1/3 text-center text-sm font-bold uppercase tracking-[0.3em]">
          Digital Designer
        </div>
        <div className="w-1/3 flex justify-end gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
          {["home", "about", "contact"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`transition-all ${activeTab === tab ? "text-black" : "text-black/40 hover:text-black/60"}`}
              data-testid={`button-nav-${tab}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <main className="pt-32 pb-40 px-8">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <section className="max-w-[1400px] mx-auto">
                <div className="mb-20 flex items-baseline justify-between border-b border-black/10 pb-10">
                  <h2 className="text-6xl font-black tracking-tighter uppercase italic" data-testid="text-section-title">GTX Work</h2>
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-black/20">Selected Works 24-26</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {WORK_ITEMS.map((item) => (
                    <WorkCard key={item.id} item={item} />
                  ))}
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-3xl mx-auto py-20 text-center"
            >
              <h2 className="text-4xl font-bold mb-8 tracking-tight">Creative Vision</h2>
              <p className="text-2xl leading-relaxed text-black/80 font-medium italic">
                "I am a professional GFX designer with 3+ years of experience specializing in high-click-through-rate (CTR) YouTube thumbnails and gaming brand identities. My goal is to turn viewers into followers through visual storytelling."
              </p>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-xl mx-auto py-20 bg-white p-12 rounded-2xl shadow-2xl border border-black/5"
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tight">Let's Collaborate</h2>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-grey-50 border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors"
                    placeholder="Enter your name"
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Reason for Contact</label>
                  <select 
                    className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors"
                    data-testid="select-reason"
                  >
                    <option>YouTube Thumbnail Project</option>
                    <option>Brand Identity</option>
                    <option>Other Collaboration</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold mb-2">Message</label>
                  <textarea 
                    rows={4} 
                    className="w-full bg-transparent border-b border-black/10 py-3 focus:outline-none focus:border-black transition-colors resize-none"
                    placeholder="Tell me about your project"
                    data-testid="input-message"
                  ></textarea>
                </div>
                <button 
                  className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black/80 transition-all shadow-lg active:scale-95"
                  data-testid="button-submit"
                >
                  Send Inquiry
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 border-t border-black/5 text-center bg-white">
        <p className="text-black/30 text-[9px] tracking-[0.4em] uppercase font-bold">© Professional GFX Portfolio 2026</p>
      </footer>
    </div>
  );
}
