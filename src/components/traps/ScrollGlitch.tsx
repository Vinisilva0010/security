"use client";

import { motion } from "framer-motion";

export default function ScrollGlitch({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, skewX: 10 }}
      animate={{ opacity: 1, y: 0, skewX: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
      whileInView={{ 
        x: [-5, 5, -5, 0], 
        transition: { duration: 0.2, repeat: 2 } 
      }}
      viewport={{ once: false, amount: 0.5 }}
      className="relative z-10 inline-block"
    >
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase text-black bg-[#FF00FF] border-4 border-black shadow-[8px_8px_0px_0px_#000] md:shadow-[12px_12px_0px_0px_#000] p-4 md:p-6 leading-none transform -rotate-2 hover:rotate-2 transition-transform duration-200 cursor-none">
        {children}
      </h1>
    </motion.div>
  );
}