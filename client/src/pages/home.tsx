import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "wouter";
import { MessageSquare, Send, User, ShieldCheck, Mail, MapPin, Phone, Github, Twitter, Instagram, Plus, Minus, ArrowRight, ExternalLink, Menu, X } from "lucide-react";

const WORK_ITEMS = [
  { id: 1, title: "", category: "Gaming Thumbnail", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/2n550158oQ4YkGmwg3GfRyFoMo.png" },
  { id: 2, title: "", category: "Gaming Thumbnail", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/8qpPbjoo5GigZgNwj4Dk5A7wk8.png" },
  { id: 3, title: "", category: "Podcast Thumbnail", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/JbocMDvY4arI4KuZWlDOkp95E9k.png" },
  { id: 4, title: "", category: "Sports Documentary Thumbnail", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/ZfSvmwffqsppEBJ959hYBpExfFE.png" },
  { id: 5, title: "", category: "Gaming Thumbnail", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/jSPBpto0U0lq3tQv7RdHOSgaRY.png" },
  { id: 6, title: "", category: "Financial Transformation", image: "https://raw.githubusercontent.com/Reflex-ind/clientweb/refs/heads/main/qWA8sEm4oPt6Z68NGUJts5xTic.png" },
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
      className="group relative aspect-video overflow-hidden rounded-xl md:rounded-2xl bg-white shadow-xl transition-all duration-700 border border-slate-200"
      data-testid={`card-work-${item.id}`}
    >
      <img
        src={item.image}
        alt={item.title}
        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100 flex flex-col justify-end p-4 md:p-8">
        <p className="text-[8px] md:text-[10px] font-bold text-white/70 uppercase tracking-[0.4em] mb-1 md:mb-3 font-plus-jakarta">{item.category}</p>
        <h3 className="text-xl md:text-4xl font-bold text-white tracking-tighter font-bebas-neue leading-none">{item.title}</h3>
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
        className="w-full py-6 md:py-8 flex items-center justify-between text-left group"
      >
        <span className="text-lg md:text-2xl font-bold tracking-tight text-slate-900 font-plus-jakarta group-hover:translate-x-2 transition-transform duration-300 flex items-center">
          <span className="text-slate-300 mr-4 md:mr-6 text-sm md:text-2xl font-bebas-neue">0{faq.id}</span>
          <span className="line-clamp-1">{faq.question}</span>
        </span>
        <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-slate-900 border-slate-900" : ""}`}>
          {isOpen ? <Minus className="text-white" size={14} /> : <Plus className="text-slate-400" size={14} />}
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
            <p className="pb-6 md:pb-8 text-slate-500 leading-relaxed max-w-2xl text-base md:text-lg pl-10 md:pl-16">
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1A1A1A] font-plus-jakarta selection:bg-slate-900 selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 md:py-10 bg-white/60 backdrop-blur-xl border-b border-slate-200/50">
        <div className="text-xl md:text-2xl font-bold tracking-tighter uppercase font-bebas-neue text-slate-900">
          PRATIK GFX
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-900" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.4em]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`transition-all relative py-2 ${activeTab === tab.id ? "text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900" />
              )}
            </button>
          ))}
          <Link href="/chat">
            <a className="bg-slate-900 text-white px-6 py-2 rounded-full flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-0.5 active:translate-y-0">
              <MessageSquare size={12} /> Chat
            </a>
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 text-2xl font-bold uppercase tracking-widest font-bebas-neue">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left py-4 border-b border-slate-100 ${activeTab === tab.id ? "text-slate-900" : "text-slate-400"}`}
                >
                  {tab.label}
                </button>
              ))}
              <Link href="/chat">
                <a className="flex items-center gap-4 py-4 text-slate-900 border-b border-slate-100">
                  Chat <MessageSquare size={20} />
                </a>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 md:pt-32">
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
              <section className="min-h-[60vh] md:h-[75vh] flex flex-col items-center justify-center text-center px-6 md:px-12 relative overflow-hidden py-20">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-50" />
                <h1 className="text-[18vw] md:text-[16vw] font-bold leading-[0.75] tracking-[-0.07em] uppercase font-bebas-neue text-slate-900 relative z-10 drop-shadow-sm">
                  Digital<br />Designer
                </h1>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 md:mt-12 flex items-center gap-3 md:gap-4 relative z-10"
                >
                  <span className="h-px w-8 md:w-12 bg-slate-300" />
                  <p className="text-[8px] md:text-[11px] text-slate-500 uppercase tracking-[0.4em] md:tracking-[0.6em] font-bold">
                    Elevating Digital Experiences
                  </p>
                  <span className="h-px w-8 md:w-12 bg-slate-300" />
                </motion.div>
              </section>

              {/* Work Section */}
              <section className="px-6 md:px-12 pb-20 md:pb-40 max-w-[1600px] mx-auto">
                <div className="mb-12 md:mb-24 flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-8 md:pb-12 gap-8">
                  <div className="space-y-4">
                    <span className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Featured Projects</span>
                    <h2 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase font-bebas-neue text-slate-900 leading-none">Selected<br />Work</h2>
                  </div>
                  <p className="text-slate-500 text-sm max-w-[300px] font-medium leading-relaxed italic">A collection of high-impact visuals crafted for creators.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 md:gap-y-24">
                  {WORK_ITEMS.map((item) => (
                    <WorkCard key={item.id} item={item} />
                  ))}
                </div>
              </section>

              {/* Aryan Design Promo */}
              <section className="px-6 md:px-12 py-20 md:py-40">
                <div className="max-w-7xl mx-auto bg-white rounded-[2rem] md:rounded-[4rem] overflow-hidden flex flex-col md:flex-row items-center p-8 md:p-20 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-slate-100 relative group">
                  <div className="w-full md:w-5/12 mb-10 md:mb-0 relative">
                    <div className="absolute inset-0 bg-slate-900/5 rounded-2xl md:rounded-3xl -rotate-2 group-hover:rotate-0 transition-transform duration-700" />
                    <img 
                      src="https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&q=80&w=800" 
                      alt="Designer" 
                      className="relative w-full h-[350px] md:h-[550px] object-cover rounded-2xl md:rounded-3xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
                    />
                  </div>
                  <div className="w-full md:w-7/12 md:pl-24 space-y-8 md:space-y-10">
                    <div className="space-y-3 md:space-y-4 text-center md:text-left">
                      <span className="text-slate-400 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em]">Collaboration</span>
                      <h2 className="text-4xl md:text-7xl font-bold text-slate-900 tracking-tight uppercase font-plus-jakarta leading-none">
                        Let's Design <br /><span className="text-slate-300">Next-Level</span> Visuals.
                      </h2>
                    </div>
                    <p className="text-slate-500 text-lg md:text-2xl leading-relaxed font-medium text-center md:text-left">
                      I help creators stand out with high-impact, scroll-stopping graphics.
                    </p>
                    <div className="flex justify-center md:justify-start">
                      <button className="bg-slate-900 text-white px-10 md:px-14 py-4 md:py-6 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-2xl shadow-slate-900/20 active:translate-y-0">
                        Start Your Project
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Section */}
              <section className="px-6 md:px-12 py-20 md:py-40 bg-white">
                <div className="max-w-4xl mx-auto">
                  <div className="text-center mb-16 md:mb-32">
                    <span className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.4em]">Assistance</span>
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase font-bebas-neue text-slate-900 mt-6 leading-none">Common Inquiries.</h2>
                  </div>
                  <div className="space-y-1">
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
              className="max-w-5xl mx-auto px-6 md:px-12 py-10 md:py-20"
            >
              <h2 className="text-6xl md:text-9xl font-bold uppercase font-bebas-neue text-slate-900 mb-8 md:mb-12">Who Am I</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                <div className="space-y-6 md:space-y-8">
                  <p className="text-xl md:text-2xl font-light text-slate-600 leading-relaxed font-plus-jakarta">
                    I am a professional GFX designer with <span className="text-slate-900 font-bold">3+ years of experience</span> specializing in high-CTR thumbnails.
                  </p>
                  <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                    My design philosophy centers on visual storytelling and clear hierarchy.
                  </p>
                </div>
                <div className="bg-slate-50 p-8 md:p-12 rounded-2xl md:rounded-3xl border border-slate-200 shadow-xl space-y-6 md:space-y-8">
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Expertise</h3>
                  <div className="space-y-4">
                    {["Thumbnail Design", "Brand Identity", "Motion Graphics", "3D Visualization"].map((skill) => (
                      <div key={skill} className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <span className="font-bold text-slate-900 text-sm md:text-base">{skill}</span>
                        <span className="text-[9px] text-slate-400">01</span>
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
              className="max-w-6xl mx-auto px-6 md:px-12 py-10 md:py-20"
            >
              <h2 className="text-6xl md:text-9xl font-bold uppercase font-bebas-neue text-slate-900 mb-8 md:mb-12">Contact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                <div className="space-y-10 md:space-y-12">
                  <div className="space-y-4 text-center md:text-left">
                    <h3 className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Drop a line</h3>
                    <p className="text-3xl md:text-5xl font-bold tracking-tighter font-bebas-neue">support@pratikgfx.com/</p>
                    <p className="text-xl md:text-2xl font-bold tracking-tighter font-bebas-neue text-slate-400">+91 99XXXXXX99</p>
                  </div>
                </div>
                <div className="bg-slate-50 p-8 md:p-12 rounded-2xl md:rounded-3xl border border-slate-200 shadow-xl">
                  <form className="space-y-4 md:space-y-6">
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Your Name</label>
                      <input type="text" className="w-full bg-white border border-slate-200 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-sm outline-none" placeholder="Name" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] uppercase font-bold text-slate-400 tracking-widest ml-1">Message</label>
                      <textarea rows={4} className="w-full bg-white border border-slate-200 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-sm outline-none" placeholder="Project details..." />
                    </div>
                    <button className="w-full bg-slate-900 text-white py-4 md:py-5 rounded-xl md:rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
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
      <footer className="bg-slate-950 text-white pt-20 md:pt-32 pb-10 md:pb-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 pb-16 md:pb-20 border-b border-white/10">
            <div className="col-span-1 lg:col-span-2 space-y-6 md:space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter uppercase font-bebas-neue">Pratik GFX</h2>
              <p className="text-slate-400 max-w-md text-base md:text-lg leading-relaxed">
                I craft high-impact thumbnails designed to grab attention.
              </p>
              <div className="space-y-2">
                <p className="flex items-center gap-3 text-sm text-white font-medium truncate">
                  <Mail size={16} className="text-slate-500 flex-shrink-0" /> support@pratikgfx.com
                </p>
                <p className="flex items-center gap-3 text-sm text-white font-medium">
                  <Phone size={16} className="text-slate-500 flex-shrink-0" /> +91 99XXXXXX99
                </p>
              </div>
            </div>
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Navigation</h3>
              <ul className="space-y-3 md:space-y-4">
                <li><button onClick={() => setActiveTab("home")} className="text-slate-300 hover:text-white transition-colors text-sm">Home</button></li>
                <li><button onClick={() => setActiveTab("about")} className="text-slate-300 hover:text-white transition-colors text-sm">About</button></li>
                <li><button onClick={() => setActiveTab("contact")} className="text-slate-300 hover:text-white transition-colors text-sm">Contact</button></li>
              </ul>
            </div>
            <div className="space-y-6 md:space-y-8">
              <h3 className="text-[10px] uppercase tracking-widest font-bold text-slate-500">Social Hub</h3>
              <div className="flex gap-3 md:gap-4">
                {[Twitter, Instagram, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-slate-900 transition-all duration-300">
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-10 md:pt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-center">
            <p className="text-slate-500 text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold">©2026 Pratik GFX — All Rights Reserved | Website Designed & Developed by: Nation Cheats
            </p>
            <div className="flex gap-4 md:gap-8 items-center">
              <p className="text-slate-500 text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold">Visualizing the future</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

