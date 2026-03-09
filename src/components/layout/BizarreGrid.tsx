"use client";

import { useEffect, useRef, useState } from "react";
import HackerCard from "@/components/ui/HackerCard";
import { posts, Post } from "@/lib/db";
import { useCaosCode } from "@/hooks/useCaosCode";
import { motion, AnimatePresence } from "framer-motion";

export default function BizarreGrid() {
  const isVipUnlocked = useCaosCode();
  const visiblePosts = posts.filter((post) => isVipUnlocked || !post.isSecret);
  
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // O Motor do Auto-Play Corrigido
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      if (carouselRef.current && carouselRef.current.children.length > 0) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        
        // MATEMÁTICA CIRÚRGICA: Pega a largura exata de 1 card + o espaço (gap)
        const cardElement = carouselRef.current.children[0] as HTMLElement;
        const scrollAmount = cardElement.offsetWidth + 24; // 24px é o nosso gap-6 do Tailwind

        // Se chegou no final, reseta pro início
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          // Pula exatamente 1 card inteiro
          carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" }); 
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isHovered]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-24 relative z-10">
      <h2 className="text-4xl md:text-6xl font-black uppercase text-white bg-black inline-block p-4 border-4 border-[#FF00FF] shadow-[8px_8px_0px_0px_#000] mb-16 transform -rotate-1">
        Arsenal de Códigos
      </h2>
      
      <div 
        ref={carouselRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        // Adicionei pt-4 e pb-12 para os elementos 3D do card não cortarem as bordas
        className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pt-4 pb-12 px-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <AnimatePresence>
          {visiblePosts.map((post: Post) => (
            <motion.div
              key={post.id}
              layout
              initial={post.isSecret ? { opacity: 0, scale: 0.1, rotateY: 90 } : false}
              animate={post.isSecret ? { opacity: 1, scale: 1, rotateY: 0 } : false}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
              
             
              className={`flex-none w-[85vw] max-w-[350px] md:w-full md:max-w-none snap-center ${post.isSecret ? "drop-shadow-[0px_0px_30px_#FFD700]" : ""}`}
            >
              <HackerCard
               
                id={post.id}
                title={post.title}
                description={post.description}
                imageSrc={post.imageSrc}
                date={post.date}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}