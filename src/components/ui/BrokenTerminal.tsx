"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function BrokenTerminal({ codeSnippet }: { codeSnippet: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto border-8 border-black shadow-[12px_12px_0px_0px_#FF00FF] bg-black text-[#00FF41] p-1 relative scanlines font-mono"
    >
      {/* Barra superior do Terminal */}
      <div className="bg-[#FF00FF] border-b-4 border-black p-2 flex justify-between items-center">
        <div className="flex gap-2">
          <div className="w-4 h-4 bg-black"></div>
          <div className="w-4 h-4 border-2 border-black"></div>
          <div className="w-4 h-4 bg-white border-2 border-black"></div>
        </div>
        <span className="text-black font-black uppercase text-sm tracking-widest">
          root@asilo-kernel:~
        </span>
      </div>

      {/* Área do Código */}
      <div className="p-6 overflow-x-auto relative z-10">
        <pre className="text-sm md:text-base text-glitch-terminal leading-relaxed">
          <code>{codeSnippet}</code>
        </pre>
      </div>

      {/* Botão de Copiar Brutalista */}
      <button 
        onClick={handleCopy}
        className="absolute bottom-4 right-4 z-30 bg-black text-[#FF00FF] border-2 border-[#FF00FF] px-4 py-2 font-black uppercase hover:bg-[#FF00FF] hover:text-black transition-colors"
      >
        {copied ? "ROUBADO!" : "COPIAR CÓDIGO"}
      </button>
    </motion.div>
  );
}