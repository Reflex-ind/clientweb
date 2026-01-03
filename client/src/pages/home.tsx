import { SmoothScroll } from "@/components/ui/smooth-scroll";
import { CurvedCarousel } from "@/components/ui/curved-carousel";
import { motion } from "framer-motion";
import logo from "@assets/generated_images/minimalist_logo_for_pratik.png";
import { ArrowDown, MoveRight, Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { ReactNode } from "react";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="bg-background min-h-screen text-foreground selection:bg-black selection:text-white overflow-hidden">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-6 md:px-12 md:py-8 mix-blend-difference text-white pointer-events-none">
          <div className="w-12 pointer-events-auto cursor-pointer">
            <img src={logo} alt="Pratik Logo" className="invert brightness-0" />
          </div>
          <div className="flex gap-8 pointer-events-auto">
            {["Work", "About", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="hidden md:block text-sm uppercase tracking-widest hover:opacity-50 transition-opacity font-medium"
              >
                {item}
              </a>
            ))}
            <button className="text-sm uppercase tracking-widest border border-white/30 px-6 py-2 rounded-full hover:bg-white hover:text-black transition-all">
              Menu
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="relative h-screen flex flex-col justify-center px-6 md:px-12 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-7xl"
          >
            <h1 className="text-[14vw] md:text-[11vw] leading-[0.85] font-semibold tracking-tighter -ml-[0.5vw]">
              <span className="block overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  DIGITAL
                </motion.span>
              </span>
              <span className="block overflow-hidden text-muted-foreground/40">
                <motion.span 
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  DESIGNER
                </motion.span>
              </span>
            </h1>
          </motion.div>

          <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 flex justify-between items-end">
             <div className="max-w-xs md:max-w-md">
               <motion.p 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 1, delay: 0.8 }}
                 className="text-sm md:text-lg font-medium leading-relaxed"
               >
                 Pratik is a creative developer & designer crafting award-winning digital experiences for forward-thinking brands.
               </motion.p>
             </div>
             <motion.div
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1, delay: 1 }}
               className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center animate-bounce-slow"
             >
               <ArrowDown className="w-4 h-4" />
             </motion.div>
          </div>
        </header>

        {/* Curved Carousel Section */}
        <section id="work" className="bg-secondary/30 relative">
          <CurvedCarousel />
        </section>

        {/* About / Philosophy Section */}
        <section id="about" className="py-32 md:py-48 px-6 md:px-12 bg-white">
          <div className="max-w-5xl mx-auto">
             <p className="text-sm uppercase tracking-widest text-muted-foreground mb-8">Philosophy</p>
             <h3 className="text-3xl md:text-6xl font-normal leading-tight tracking-tight">
               We believe that <span className="text-muted-foreground/40">great design is invisible.</span> It serves the user without drawing attention to itself, creating seamless and intuitive interactions that feel like magic.
             </h3>
             <div className="mt-16 flex gap-4">
               <button className="group flex items-center gap-4 text-lg font-medium border-b border-black pb-1 hover:opacity-50 transition-opacity">
                 Read full story <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
               </button>
             </div>
          </div>
        </section>

        {/* Contact / Footer */}
        <footer id="contact" className="bg-primary text-primary-foreground py-32 md:py-40 px-6 md:px-12 rounded-t-[3rem] mt-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between">
            <div className="mb-16 md:mb-0">
               <h2 className="text-[12vw] leading-none font-bold tracking-tighter mb-8">Let's Talk</h2>
               <a href="mailto:hello@pratik.design" className="text-2xl md:text-4xl border-b border-white/20 pb-2 hover:border-white transition-colors">
                 hello@pratik.design
               </a>
            </div>
            
            <div className="flex flex-col justify-end gap-8">
               <div className="flex gap-4">
                 <SocialLink icon={<Twitter className="w-5 h-5" />} />
                 <SocialLink icon={<Instagram className="w-5 h-5" />} />
                 <SocialLink icon={<Linkedin className="w-5 h-5" />} />
                 <SocialLink icon={<Mail className="w-5 h-5" />} />
               </div>
               <p className="text-white/40 text-sm">
                 © 2024 Pratik. All rights reserved. <br />
                 Designed & Developed with ❤️
               </p>
            </div>
          </div>
        </footer>
      </div>
    </SmoothScroll>
  );
}

function SocialLink({ icon }: { icon: ReactNode }) {
  return (
    <a href="#" className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors">
      {icon}
    </a>
  );
}
