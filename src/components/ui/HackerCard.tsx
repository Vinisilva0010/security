"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link"; // IMPORTAÇÃO OBRIGATÓRIA
import React from "react";

// Adicionamos o 'id' na interface
interface HackerCardProps {
  id: number | string;
  title: string;
  description: string;
  imageSrc: string;
  date: string;
}

export default function HackerCard({ id, title, description, imageSrc, date }: HackerCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
      className="relative w-full h-[400px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-6 flex flex-col justify-between cursor-[url('/assets/icone.png'),_auto] hover:bg-yellow-400 transition-colors duration-300"
    >
      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="absolute -top-10 -right-10 w-40 h-40 pointer-events-none"
      >
        <img src={imageSrc} alt={title} className="w-full h-full object-contain drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]" />
      </div>

      <div style={{ transform: "translateZ(30px)" }}>
        <span className="inline-block px-2 py-1 bg-[#FF00FF] text-white font-bold text-sm border-2 border-black mb-4">
          {date}
        </span>
        <h3 className="text-2xl font-black uppercase text-black leading-tight mb-2">
          {title}
        </h3>
        <p className="text-black font-medium border-l-4 border-[#FF00FF] pl-3">
          {description}
        </p>
      </div>

      <div style={{ transform: "translateZ(20px)" }}>
        {/* A MÁGICA DO ROTEAMENTO AQUI */}
        <Link 
          href={`/post/${id}`}
          className="block w-full text-center py-2 bg-black text-white font-bold uppercase border-2 border-black hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_0px_#FF00FF] transition-all cursor-[url('/assets/icone.png'),_pointer]"
        >
          Ver Código Fonte
        </Link>
      </div>
    </motion.div>
  );
}