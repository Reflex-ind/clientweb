import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";

const WORK_ITEMS = [
  { id: 1, title: "Gaming Tournament", category: "Thumbnail", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "Modern Vibe", category: "Branding", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "Epic Battle", category: "GFX", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "Tech Review", category: "Concept", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "Street Style", category: "Social Media", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "Neon Nights", category: "Art", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
];

function WorkCard({ item }: { item: typeof WORK_ITEMS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // 3D Scroll Tilt animation
  // As it scrolls into view (0) to out of view (1)
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        perspective: "1200px",
        rotateX,
        opacity,
        scale,
      }}
      className="group relative aspect-video overflow-hidden rounded-lg bg-muted shadow-2xl transition-all duration-500 ease-out border border-white/5"
      data-testid={`card-work-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-8">
        <p className="text-xs font-semibold text-primary/90 uppercase tracking-[0.2em] mb-2">{item.category}</p>
        <h3 className="text-3xl font-bold text-white tracking-tight">{item.title}</h3>
      </div>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-inter selection:bg-white selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-8">
        <div className="w-1/3 text-xl font-bold tracking-tighter uppercase font-space-grotesk">
          Design©
        </div>
        <div className="w-1/3"></div>
        <div className="w-1/3 flex justify-end gap-10 text-[11px] font-bold uppercase tracking-[0.3em]">
          <Link href="/"><a className="hover:opacity-50 transition-opacity" data-testid="link-home">Home</a></Link>
          <Link href="/about"><a className="hover:opacity-50 transition-opacity" data-testid="link-about">About</a></Link>
          <Link href="/contact"><a className="hover:opacity-50 transition-opacity" data-testid="link-contact">Contact</a></Link>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="h-screen flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h1 
              className="text-[14vw] font-bold leading-[0.8] tracking-[-0.05em] uppercase font-space-grotesk"
              data-testid="text-hero-heading"
            >
              Digital<br />Designer
            </h1>
            <p className="mt-8 text-sm text-white/40 uppercase tracking-[0.5em] font-medium">Portfolio Vol. 1</p>
          </motion.div>
        </section>

        {/* Work Section */}
        <section className="px-12 pb-60">
          <div className="mb-32 flex items-baseline justify-between border-b border-white/10 pb-12">
            <h2 className="text-7xl font-bold tracking-tighter uppercase font-space-grotesk" data-testid="text-section-title">GTX Work</h2>
            <div className="flex flex-col items-end gap-2">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/30">Archives</span>
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">2024—2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24 max-w-[1400px] mx-auto">
            {WORK_ITEMS.map((item) => (
              <WorkCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-20 px-12 flex justify-between items-center border-t border-white/5 bg-black">
        <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">© Digital Designer GFX</p>
        <div className="flex gap-8 text-[10px] tracking-[0.3em] uppercase font-bold">
          <a href="#" className="hover:text-white/50 transition-colors">Twitter</a>
          <a href="#" className="hover:text-white/50 transition-colors">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
