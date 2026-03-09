"use client";

import dynamic from "next/dynamic";

// Aqui o SSR: false é totalmente legalizado porque já estamos no Cliente
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-yellow-400 z-0" />, // Nosso fallback rápido
});

export default function SceneWrapper() {
  return <HeroScene />;
}