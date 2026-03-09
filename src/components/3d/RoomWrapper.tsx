// src/components/3d/RoomWrapper.tsx
"use client";

import dynamic from "next/dynamic";

// Offloading brutal: o 3D só baixa e renderiza quando for necessário
const NightmareRoom = dynamic(() => import("./NightmareRoom"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-black flex items-center justify-center border-t-8 border-[#FF00FF]">
      <h2 className="text-[#FF00FF] font-mono text-2xl animate-pulse">Conectando ao servidor...</h2>
    </div>
  ),
});

export default function RoomWrapper() {
  return <NightmareRoom />;
}