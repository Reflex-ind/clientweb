import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence
} from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import {
  MessageSquare,
  Mail,
  Phone,
  Github,
  Twitter,
  Instagram,
  Menu,
  X,
  Plus,
  Minus
} from "lucide-react";

/* -------------------------------- DATA -------------------------------- */

const WORK_ITEMS = [
  { id: 1, title: "", category: "Gaming Thumbnail", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/2n550158oQ4YkGmwg3GfRyFoMo.png" },
  { id: 2, title: "", category: "Gaming Thumbnail", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/8qpPbjoo5GigZgNwj4Dk5A7wk8.png" },
  { id: 3, title: "", category: "High CTR Thumbnail", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/JbocMDvY4arI4KuZWlDOkp95E9k.png" },
  { id: 4, title: "", category: "High CTR Thumbnail", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/ZfSvmwffqsppEBJ959hYBpExfFE.png" },
  { id: 5, title: "", category: "Gaming Thumbnail", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/jSPBpto0U0lq3tQv7RdHOSgaRY.png" },
  { id: 6, title: "", category: "Earning Thumbnail", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/qWA8sEm4oPt6Z68NGUJts5xTic.png" },
];

const FAQS = [
  { id: 1, question: "What kind of thumbnails do you create?", answer: "I specialize in high-CTR thumbnails for gaming, tech, and lifestyle creators. Every design is crafted to grab attention and drive clicks using advanced color grading and composition." },
  { id: 2, question: "How quickly can I expect delivery?", answer: "Standard delivery time is 24-48 hours per thumbnail. For larger packages or brand identity projects, we'll discuss a custom timeline that fits your needs." },
  { id: 3, question: "What niches are you specialized in?", answer: "While I'm heavily specialized in Gaming (FPS, RP, Survival), I also create premium visuals for Finance, Documentaries, and Corporate brands." },
];

/* ----------------------------- 3D TILT CARD ----------------------------- */

function TiltCard({ item }: any) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(y, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(x, { stiffness: 120, damping: 20 });

  function handleMove(e: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 12);
    y.set(-py * 12);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative aspect-video rounded-2xl bg-white border border-[#E6E8EB]
      shadow-[0_30px_80px_rgba(0,0,0,0.06)] overflow-hidden"
    >
      <img
        src={item.image}
        className="w-full h-full object-cover"
        style={{ transform: "translateZ(30px)" }}
      />

      <div
        className="absolute inset-0 flex items-end p-6 bg-gradient-to-t
        from-black/60 via-black/20 to-transparent"
        style={{ transform: "translateZ(40px)" }}
      >
        <span className="text-white text-xs tracking-[0.35em] uppercase font-bold">
          {item.category}
        </span>
      </div>
    </motion.div>
  );
}

/* ----------------------------- FAQ ITEM -------------------------------- */

function FAQItem({ f }: any) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#E6E8EB]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-6 flex justify-between items-center"
      >
        <h3 className="text-xl font-bold text-[#0E0F11]">{f.q}</h3>
        {open ? <Minus /> : <Plus />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pb-6 text-[#5A5F66]"
          >
            {f.a}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ----------------------------- MAIN PAGE -------------------------------- */

export default function Home() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="min-h-screen bg-[#F6F7F8] text-[#0E0F11] font-plus-jakarta">

      {/* NAV */}
      <nav className="fixed w-full top-0 z-50 bg-white border-b border-[#E6E8EB] px-8 py-6 flex justify-between">
        <span className="font-bebas-neue text-2xl tracking-widest">PRATIK GFX</span>
        <button className="md:hidden" onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
      </nav>

      {/* HERO */}
      <section className="pt-40 pb-32 text-center">
        <h1 className="text-[16vw] leading-[0.75] tracking-[-0.06em] uppercase font-bebas-neue">
          Digital<br />Designer
        </h1>
        <p className="mt-8 text-[#5A5F66] tracking-[0.4em] uppercase text-xs">
          Premium Visual Experiences
        </p>
      </section>

      {/* WORK */}
      <section className="max-w-[1400px] mx-auto px-8 pb-40">
        <h2 className="text-7xl font-bebas-neue mb-20">Selected Work</h2>
        <div className="grid md:grid-cols-2 gap-20">
          {WORK_ITEMS.map((i) => (
            <TiltCard key={i.id} item={i} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-32">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-6xl font-bebas-neue mb-20 text-center">
            Common Questions
          </h2>
          {FAQS.map((f) => (
            <FAQItem key={f.id} f={f} />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0E0F11] text-[#9AA0A6] py-20 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white font-bebas-neue text-3xl mb-4">Pratik GFX</h3>
            <p>High-CTR premium thumbnails.</p>
          </div>
          <div>
            <p className="flex gap-3"><Mail /> aryandznsworks@gmail.com</p>
            <p className="flex gap-3 mt-2"><Phone /> +91 8159099504</p>
          </div>
          <div className="flex gap-4">
            <Twitter />
            <Instagram />
            <Github />
          </div>
        </div>
      </footer>
    </div>
  );
}
