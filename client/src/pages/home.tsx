import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { MessageSquare, Send, User, ShieldCheck, Mail, MapPin, Phone, Github, Twitter, Instagram, Plus, Minus, ArrowRight, ExternalLink } from "lucide-react";

const WORK_ITEMS = [
  { id: 1, title: "CYBERPUNK 2077", category: "Gaming Thumbnail", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800" },
  { id: 2, title: "VALORANT CLUTCH", category: "Thumbnail Design", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800" },
  { id: 3, title: "MINECRAFT SURVIVAL", category: "GFX Concept", image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800" },
  { id: 4, title: "WARZONE SEASON 5", category: "High CTR Thumbnail", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" },
  { id: 5, title: "GTA V RP MOMENTS", category: "Social Media GFX", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800" },
  { id: 6, title: "APEX LEGENDS", category: "Motion GFX", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800" },
];

const FAQS = [
  { id: 1, question: "What kind of thumbnails do you create?", answer: "I specialize in high-CTR thumbnails for gaming, tech, and lifestyle creators. Every design is crafted to grab attention and drive clicks using advanced color grading and composition." },
  { id: 2, question: "How quickly can I expect delivery?", answer: "Standard delivery time is 24-48 hours per thumbnail. For larger packages or brand identity projects, we'll discuss a custom timeline that fits your needs." },
  { id: 3, question: "What niches are you specialized in?", answer: "While I'm heavily specialized in Gaming (FPS, RP, Survival), I also create premium visuals for Finance, Documentaries, and Corporate brands." },
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

function FAQItem({ faq }: { faq: typeof FAQS[0] }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className="text-2xl font-bold tracking-tight text-slate-900 font-plus-jakarta group-hover:translate-x-2 transition-transform duration-300">
          <span className="text-slate-300 mr-6">0{faq.id}</span>
          {faq.question}
        </span>
        <div className={`w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-slate-900 border-slate-900" : ""}`}>
          {isOpen ? <Minus className="text-white" size={18} /> : <Plus className="text-slate-400" size={18} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-slate-500 leading-relaxed max-w-2xl text-lg pl-16">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
    <div className="min-h-screen bg-white text-slate-900 font-plus-jakarta selection:bg-slate-900 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-10 bg-white/80 backdrop-blur-md border-b border-slate-100">
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
            <a className="bg-slate-900 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-slate-900/10">
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
              {/* Hero */}
              <section className="h-[70vh] flex flex-col items-center justify-center text-center px-12">
                <h1 className="text-[15vw] font-bold leading-[0.75] tracking-[-0.06em] uppercase font-bebas-neue text-slate-900">
                  Digital<br />Designer
                </h1>
                <p className="mt-12 text-[11px] text-slate-400 uppercase tracking-[0.6em] font-bold">
                  Premium Work Portfolio — Vol. 2
                </p>
              </section>

              {/* Work Section */}
              <section className="px-12 pb-40 max-w-[1600px] mx-auto">
                <div className="mb-20 flex flex-col md:flex-row items-baseline justify-between border-b border-slate-200 pb-12">
                  <h2 className="text-8xl font-bold tracking-tighter uppercase font-bebas-neue text-slate-900">GTX Work</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
                  {WORK_ITEMS.map((item) => (
                    <WorkCard key={item.id} item={item} />
                  ))}
                </div>
              </section>

              {/* Aryan Design Promo - Image Match */}
              <section className="px-12 py-40">
                <div className="max-w-7xl mx-auto bg-slate-950 rounded-[3rem] overflow-hidden flex flex-col md:flex-row items-center p-12 md:p-24 relative">
                  <div className="w-full md:w-1/2 mb-12 md:mb-0">
                    <img 
                      src="https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&q=80&w=800" 
                      alt="Designer" 
                      className="w-full h-[500px] object-cover rounded-3xl grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-20 space-y-8">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight uppercase font-plus-jakarta leading-none">
                      Let's Design <span className="text-slate-500 underline">Next-Level</span> Thumbnails.
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-medium">
                      I'm Pratik, a professional thumbnail designer who helps creators and brands stand out with high-impact, scroll-stopping thumbnails. From YouTube and Reels thumbnails to ads and corporate visuals.
                    </p>
                    <button className="bg-white text-slate-900 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl">
                      Let's Collaborate
                    </button>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="px-12 py-40 bg-slate-50">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-24">
                    <span className="bg-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] border border-slate-200 shadow-sm">FAQ</span>
                    <h2 className="text-7xl font-bold tracking-tighter uppercase font-bebas-neue text-slate-900 mt-8 leading-none">Frequently Asked Questions.</h2>
                    <p className="text-slate-500 mt-6 text-xl tracking-tight font-medium">Everything You Need To Know Before Working Together.</p>
                  </div>
                  <div className="space-y-2">
                    {FAQS.map((faq) => (
                      <FAQItem key={faq.id} faq={faq} />
                    ))}
                  </div>
                </div>
              </section>
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
                  <p className="text-2xl font-light text-slate-600 leading-relaxed font-plus-jakarta">
                    I am a professional GFX designer with <span className="text-slate-900 font-bold">3+ years of experience</span> specializing in high-CTR YouTube thumbnails and gaming brand identities.
                  </p>
                  <p className="text-slate-500 leading-relaxed">
                    My design philosophy centers on visual storytelling and clear hierarchy. I don't just make things look good; I make them work for your metrics.
                  </p>
                </div>
                <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200 shadow-xl space-y-8">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400">Expertise</h3>
                  <div className="space-y-4">
                    {["Thumbnail Design", "Brand Identity", "Motion Graphics", "3D Visualization", "Concept Art"].map((skill) => (
                      <div key={skill} className="flex justify-between items-center border-b border-slate-200 pb-2">
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
                    <p className="text-5xl font-bold tracking-tighter font-bebas-neue">hello@pratikgfx.com</p>
                    <p className="text-2xl font-bold tracking-tighter font-bebas-neue text-slate-400">+91 8159099504</p>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <h4 className="text-[10px] uppercase font-bold text-slate-400">Socials</h4>
                      <div className="flex flex-col gap-1 text-sm font-bold">
                        <a href="#" className="hover:text-slate-400 transition-colors flex items-center gap-2">Behance <ExternalLink size={12} /></a>
                        <a href="#" className="hover:text-slate-400 transition-colors flex items-center gap-2">Instagram <ExternalLink size={12} /></a>
                        <a href="#" className="hover:text-slate-400 transition-colors flex items-center gap-2">Twitter <ExternalLink size={12} /></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200 shadow-xl">
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Your Name</label>
                      <input type="text" className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all outline-none" placeholder="Aryan Sharma" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Reason for Contact</label>
                      <select className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all outline-none">
                        <option>YouTube Thumbnail Package</option>
                        <option>Brand Identity</option>
                        <option>Motion Graphics</option>
                        <option>Other Collaboration</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Message</label>
                      <textarea rows={4} className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-slate-900 transition-all outline-none" placeholder="Tell me about your project..." />
                    </div>
                    <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:scale-[1.02] transition-all shadow-lg shadow-slate-900/20">
                      Ready to Connect
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-white pt-32 pb-12 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 pb-20 border-b border-white/10">
            <div className="col-span-1 lg:col-span-2 space-y-8">
              <h2 className="text-4xl font-bold tracking-tighter uppercase font-bebas-neue">Pratik GFX</h2>
              <p className="text-slate-400 max-w-md text-lg leading-relaxed">
                I craft high-impact thumbnails designed to grab attention from the very first glance and drive clicks. I create thumbnails for IRL content, finance, documentaries, podcasts, cinematic visuals, fitness, travel, and short-form reels.
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-3 text-sm text-white font-medium">
                  <Mail size={16} className="text-slate-500" /> aryandznsworks@gmail.com
                </p>
                <p className="flex items-center gap-3 text-sm text-white font-medium">
                  <Phone size={16} className="text-slate-500" /> +91 8159099504
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="text-xs uppercase tracking-widest font-bold text-slate-500">Navigation</h3>
              <ul className="space-y-4">
                <li><button onClick={() => setActiveTab("home")} className="text-slate-300 hover:text-white transition-colors">Portfolio</button></li>
                <li><button onClick={() => setActiveTab("home")} className="text-slate-300 hover:text-white transition-colors">Home</button></li>
                <li><button onClick={() => setActiveTab("contact")} className="text-slate-300 hover:text-white transition-colors">Get Started</button></li>
              </ul>
            </div>
            <div className="space-y-8">
              <h3 className="text-xs uppercase tracking-widest font-bold text-slate-500">Socials</h3>
              <div className="flex gap-4">
                {[Twitter, Instagram, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">All Rights Reserved @2026 Pratik GFX</p>
            <div className="flex gap-8 items-center">
              <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-bold">Visualizing the future</p>
              <div className="h-10 w-[1px] bg-white/10" />
              <img src="https://framerusercontent.com/images/kndS9v3R8XqHw9X9X9X9X9X9X9.png" alt="Framer" className="h-6 opacity-30 grayscale brightness-200" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
