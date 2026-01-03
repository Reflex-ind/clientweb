import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import img1 from "@assets/generated_images/abstract_modern_architecture_white_and_grey.png";
import img2 from "@assets/generated_images/minimalist_digital_product_interface.png";
import img3 from "@assets/generated_images/abstract_fluid_3d_shapes_white.png";

const projects = [
  {
    id: 1,
    title: "Ethereal Architecture",
    category: "Photography",
    img: img1,
  },
  {
    id: 2,
    title: "Fintech Dashboard",
    category: "UI/UX Design",
    img: img2,
  },
  {
    id: 3,
    title: "Fluid Motion",
    category: "3D Art",
    img: img3,
  },
  {
    id: 4,
    title: "Urban Spaces",
    category: "Photography",
    img: img1,
  },
  {
    id: 5,
    title: "Neo Banking",
    category: "Product Design",
    img: img2,
  },
];

function Card({
  item,
  index,
  scrollYProgress,
}: {
  item: (typeof projects)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Calculate a transformation based on scroll position
  // We want items to move along a curve. 
  // Let's create a parallax effect where items move at different speeds and have a slight rotation.
  
  // Create a staggered effect based on index
  const y = useTransform(scrollYProgress, [0, 1], [0, -50 * index]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  
  // The "Curved" effect: 
  // We can translate X based on Y progress to simulate a curve (like a C shape)
  // or we can rotate them.
  // Let's try a subtle rotation and X-offset.
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -5 : 5, 0]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [index % 2 === 0 ? -100 : 100, 0, index % 2 === 0 ? -100 : 100]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        y,
        scale,
        opacity,
        // rotate, // Subtle rotation
        // x, // Subtle curve movement
      }}
      className="group relative w-full aspect-video md:aspect-[16/10] overflow-hidden rounded-xl md:rounded-3xl bg-gray-100 shadow-2xl"
    >
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 z-10" />
      <motion.img
        src={item.img}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      
      <div className="absolute bottom-0 left-0 p-6 md:p-10 z-20 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <p className="text-white/80 text-sm md:text-base font-medium tracking-widest uppercase mb-2">
          {item.category}
        </p>
        <h3 className="text-white text-2xl md:text-4xl font-light tracking-tight">
          {item.title}
        </h3>
      </div>
    </motion.div>
  );
}

export function CurvedCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // We want to create a stack of cards that reveals as we scroll
  // But the prompt asks for a "curved show" like a video thumbnail scroll.
  // A common award-winning pattern is a horizontal scroll that bends.
  
  // Let's implement a sticky horizontal scroll section with a vertical curve.
  
  return (
    <div className="w-full py-24 md:py-40">
       <div className="container mx-auto px-4 mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-7xl font-light tracking-tight text-primary max-w-4xl"
          >
            Selected Works
          </motion.h2>
       </div>

       {/* Vertical List with Parallax/Curve Effect */}
       <div ref={containerRef} className="container mx-auto px-4 flex flex-col items-center gap-12 md:gap-32 perspective-1000">
          {projects.map((project, i) => (
             <ParallaxCard key={project.id} project={project} index={i} total={projects.length} />
          ))}
       </div>
    </div>
  );
}

function ParallaxCard({ project, index, total }: { project: typeof projects[0], index: number, total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Create a curve effect: 
  // Items start rotated and pushed back, come to center flat, then rotate and push back again.
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]); // Parallax movement
  
  // Alternating X offset for "Snake" or "Curve" feel
  const xOffset = 50; 
  const x = useTransform(scrollYProgress, [0, 0.5, 1], [
    index % 2 === 0 ? -xOffset : xOffset, 
    0, 
    index % 2 === 0 ? -xOffset : xOffset
  ]);

  return (
    <motion.div
      ref={ref}
      style={{ 
        rotateX, 
        scale, 
        opacity,
        // x 
      }}
      className="sticky top-20 md:top-40 w-full max-w-5xl mx-auto will-change-transform"
    >
        <div className="relative aspect-video overflow-hidden rounded-2xl md:rounded-[2.5rem] shadow-2xl bg-gray-900 border border-white/10 group cursor-pointer">
           <motion.img 
             src={project.img} 
             alt={project.title}
             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
           />
           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 backdrop-blur-[2px]">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <span className="text-white text-sm tracking-widest uppercase">View</span>
              </div>
           </div>
        </div>
        <div className="flex justify-between items-end mt-6 px-2">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">0{index + 1} / {project.category}</p>
              <h3 className="text-3xl md:text-5xl font-medium tracking-tighter">{project.title}</h3>
            </div>
            <div className="hidden md:block">
              <span className="inline-block w-3 h-3 rounded-full bg-black/20" />
            </div>
        </div>
    </motion.div>
  )
}
