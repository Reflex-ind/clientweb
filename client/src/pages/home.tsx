import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Lenis from 'lenis';

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

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springScale = useSpring(scale, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={cardRef}
      style={{ perspective: "1500px", rotateX: springRotateX, opacity, scale: springScale }}
      className="group relative aspect-video overflow-hidden rounded-xl bg-white shadow-2xl transition-all duration-500 ease-out border border-black/5"
      data-testid={`card-work-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
        <p className="text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-1">{item.category}</p>
        <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#F8F9FA] text-[#1A1A1A] font-inter selection:bg-black selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-xs">GFX</div>
          <span className="text-sm font-bold uppercase tracking-widest hidden md:block">Aryan Dzn</span>
        </div>
        <div className="flex gap-8 text-[11px] font-bold uppercase tracking-[0.2em]">
          <a href="#home" className="hover:text-black/50 transition-colors">Home</a>
          <a href="#portfolio" className="hover:text-black/50 transition-colors">Portfolio</a>
          <a href="#about" className="hover:text-black/50 transition-colors">About</a>
          <a href="#contact" className="hover:text-black/50 transition-colors">Contact</a>
          <button className="bg-black text-white px-4 py-1.5 rounded-full hover:bg-black/80 transition-all ml-4">Get Started</button>
        </div>
      </nav>

      <main id="home">
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[12vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase font-space-grotesk text-black mb-4">
              Digital<br />Designer
            </h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-sm md:text-lg text-black/40 uppercase tracking-[0.4em] font-medium"
            >
              Ultra-Smooth Visual Storytelling
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold opacity-30">Scroll to Explore</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-black/20 to-transparent"></div>
          </motion.div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="px-8 py-32 bg-white rounded-t-[3rem] shadow-2xl relative z-10">
          <div className="max-w-[1400px] mx-auto">
            <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-12 gap-6">
              <div>
                <span className="text-xs font-bold text-black/30 uppercase tracking-[0.4em] mb-4 block italic">Recent Work</span>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase font-space-grotesk" data-testid="text-section-title">GFX WORK</h2>
              </div>
              <p className="max-w-xs text-sm text-black/60 leading-relaxed font-medium">
                High-converting thumbnails and brand identities designed to transform viewers into loyal followers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {WORK_ITEMS.map((item) => (
                <WorkCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-40 px-8 bg-[#F8F9FA]">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-bold text-black/30 uppercase tracking-[0.4em] mb-8 block">The Designer</span>
            <motion.h3 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-black mb-12"
            >
              I am a professional <span className="text-black/30 italic">GFX designer</span> with 3+ years of experience specializing in high-CTR YouTube thumbnails.
            </motion.h3>
            <p className="text-lg md:text-xl text-black/60 leading-relaxed">
              My goal is to turn viewers into followers through visual storytelling. Every pixel is crafted with strategy, ensuring your content stands out in the most competitive niches.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-40 px-8 bg-white border-t border-black/5">
          <div className="max-w-xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Start a Project</h2>
              <p className="text-black/40 text-sm uppercase tracking-widest font-bold">Ready to scale your brand?</p>
            </div>
            
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 opacity-30 group-focus-within:opacity-100 transition-opacity">Full Name</label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-black transition-all text-lg font-medium"
                  placeholder="Your Name"
                  data-testid="input-name"
                />
              </div>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 opacity-30 group-focus-within:opacity-100 transition-opacity">Reason for Contact</label>
                <select 
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-black transition-all text-lg font-medium appearance-none"
                  data-testid="select-reason"
                >
                  <option>YouTube Thumbnail Project</option>
                  <option>Gaming Brand Identity</option>
                  <option>Other Collaboration</option>
                </select>
              </div>
              <div className="group">
                <label className="block text-[10px] uppercase tracking-widest font-bold mb-3 opacity-30 group-focus-within:opacity-100 transition-opacity">Message</label>
                <textarea 
                  rows={4} 
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-black transition-all text-lg font-medium resize-none"
                  placeholder="Tell me about your project..."
                  data-testid="input-message"
                ></textarea>
              </div>
              <button 
                className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-black/80 transition-all shadow-xl active:scale-95"
                data-testid="button-submit"
              >
                Send Inquiry
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="py-20 px-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8 bg-[#F8F9FA]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-black text-xs">GFX</div>
          <span className="text-xs font-bold uppercase tracking-widest">Aryan Dzn © 2026</span>
        </div>
        <div className="flex gap-10 text-[10px] tracking-[0.3em] uppercase font-bold text-black/40">
          <a href="#" className="hover:text-black transition-colors">Twitter</a>
          <a href="#" className="hover:text-black transition-colors">Instagram</a>
          <a href="#" className="hover:text-black transition-colors">Discord</a>
        </div>
      </footer>
    </div>
  );
}
