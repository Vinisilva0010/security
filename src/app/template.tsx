"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* 1. A Cortina Derretida: Uma tela rosa choque que cobre tudo e "sobe" violentamente */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen bg-[#FF00FF] z-[9999] origin-top border-b-8 border-black pointer-events-none"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        // Uma curva bezier agressiva: arranca rápido e freia rasgando
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} 
      />

      {/* 2. O Conteúdo da Página: O HTML novo vai surgir de baixo pra cima, opaco */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </>
  );
}