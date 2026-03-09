"use client";

import { useEffect, useRef } from "react";

export default function SlimeTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajusta o canvas para sempre cobrir a tela inteira do usuário
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    // Nosso banco de dados temporário de "gotas" de slime
    const particles: { x: number; y: number; age: number; size: number; drift: number }[] = [];

    const onMouseMove = (e: MouseEvent) => {
      // Injeta entre 1 e 3 gotas por movimento para parecer caótico
      const drops = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < drops; i++) {
        particles.push({ 
          x: e.clientX + (Math.random() * 20 - 10), // Espalha um pouco do centro
          y: e.clientY + (Math.random() * 20 - 10), 
          age: 0, 
          size: Math.random() * 12 + 5, // Tamanhos variados para as bolhas
          drift: Math.random() * 2 - 1 // Vento/deslize lateral aleatório
        });
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    let animationFrameId: number;

    const render = () => {
      // Limpa a tela a cada frame (60x por segundo)
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.age += 1;
        
        // FÍSICA DO CAOS: 
        p.y += 1.5; // Gravidade puxando o slime pra baixo
        p.x += p.drift; // Deslizando pros lados
        
        const life = 1 - p.age / 40; // A gota "vive" por 40 frames
        
        if (life > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * life, 0, Math.PI * 2);
          // Verde radioativo (#00FF41) pingando da mão
          ctx.fillStyle = `rgba(0, 255, 65, ${life})`; 
          ctx.fill();
        }
      }

      // Garbage Collector: Remove as gotas velhas da memória para não travar o PC
      while (particles.length > 0 && particles[0].age >= 40) {
        particles.shift();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      // Limpeza brutalista para evitar Memory Leaks se o componente desmontar
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // z-[9998] garante que fica em cima de tudo (menos do Jumpscare)
      // pointer-events-none garante que o Canvas não bloqueie os seus cliques nos botões
      className="fixed inset-0 z-[9998] pointer-events-none"
    />
  );
}