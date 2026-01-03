import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";

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

  // Smooth spring for more engaging motion
  const rotateXRaw = useTransform(scrollYProgress, [0, 0.5, 1], [25, 0, -25]);
  const rotateX = useSpring(rotateXRaw, { stiffness: 100, damping: 30 });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        perspective: "1500px",
        rotateX,
        opacity,
        scale,
      }}
      className="group relative aspect-video overflow-hidden rounded-xl bg-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-700 border border-white/10"
      data-testid={`card-work-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[50%] group-hover:grayscale-0"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 flex flex-col justify-end p-8 transform translate-y-4 group-hover:translate-y-0">
        <p className="text-[10px] font-bold text-primary uppercase tracking-[0.4em] mb-3 font-plus-jakarta">
          {item.category}
        </p>
        <h3 className="text-4xl font-bold text-white tracking-tighter font-bebas-neue leading-none">
          {item.title}
        </h3>
      </div>
      
      {/* Decorative corners */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20 group-hover:border-white/50 transition-colors" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20 group-hover:border-white/50 transition-colors" />
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-10 mix-blend-difference">
        <div className="w-1/3 text-2xl font-bold tracking-tighter uppercase font-bebas-neue">
          GFX©STUDIO
        </div>
        <div className="w-1/3"></div>
        <div className="w-1/3 flex justify-end gap-12 text-[10px] font-bold uppercase tracking-[0.4em] font-plus-jakarta">
          <Link href="/"><a className="hover:text-primary transition-colors" data-testid="link-home">Home</a></Link>
          <Link href="/about"><a className="hover:text-primary transition-colors" data-testid="link-about">About</a></Link>
          <Link href="/contact"><a className="hover:text-primary transition-colors" data-testid="link-contact">Contact</a></Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="h-[90vh] flex flex-col items-center justify-center relative">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center relative z-10"
          >
            <h1 
              className="text-[18vw] font-bold leading-[0.75] tracking-[-0.06em] uppercase font-bebas-neue mix-blend-difference"
              data-testid="text-hero-heading"
            >
              Digital<br />Designer
            </h1>
            <div className="mt-12 flex items-center justify-center gap-6">
              <span className="h-[1px] w-12 bg-white/20" />
              <p className="text-[11px] text-white/40 uppercase tracking-[0.6em] font-medium font-plus-jakarta">
                Creative Director & GFX Artist
              </p>
              <span className="h-[1px] w-12 bg-white/20" />
            </div>
          </motion.div>
          
          {/* Background texture/grain */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </section>

        {/* Work Section */}
        <section className="px-12 pb-64">
          <div className="mb-40 flex flex-col md:flex-row items-baseline justify-between border-b border-white/5 pb-16">
            <h2 className="text-8xl md:text-9xl font-bold tracking-tighter uppercase font-bebas-neue leading-none" data-testid="text-section-title">
              GTX Work
            </h2>
            <div className="flex flex-col items-start md:items-end gap-1 mt-8 md:mt-0">
              <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white/20 font-plus-jakarta">Selected Projects</span>
              <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white/50 font-plus-jakarta">Built in Replit</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32 max-w-[1600px] mx-auto">
            {WORK_ITEMS.map((item) => (
              <WorkCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-24 px-12 flex flex-col md:flex-row justify-between items-center border-t border-white/5 bg-[#030303]">
        <div className="mb-8 md:mb-0">
          <p className="text-white/20 text-[9px] tracking-[0.4em] uppercase font-plus-jakarta italic">
            Visualizing the future of gaming
          </p>
        </div>
        <div className="flex gap-12 text-[9px] tracking-[0.5em] uppercase font-bold font-plus-jakarta">
          <a href="#" className="hover:text-white/40 transition-colors">Behance</a>
          <a href="#" className="hover:text-white/40 transition-colors">Dribbble</a>
          <a href="#" className="hover:text-white/40 transition-colors">Twitter</a>
        </div>
        <div className="mt-8 md:mt-0">
           <p className="text-white/10 text-[9px] tracking-[0.4em] uppercase font-plus-jakarta">
            © 2026 Digital Designer
          </p>
        </div>
      </footer>
    </div>
  );
}
