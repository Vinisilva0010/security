import dynamic from "next/dynamic";
import ScrollGlitch from "@/components/traps/ScrollGlitch";
import SceneWrapper from "@/components/3d/SceneWrapper"; // Importação estática da ponte
import BizarreGrid from "@/components/layout/BizarreGrid";
import RoomWrapper from "@/components/3d/RoomWrapper";
import HackerCombat from "@/components/traps/HackerCombat";
export default function Home() {
  return (
    <main className="relative min-h-[200vh] bg-yellow-400 overflow-hidden selection:bg-black selection:text-[#FF00FF] cursor-[url('/assets/icone.png'),_auto]">
      
      {/* Camada de UI - Brutalismo puro */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center pointer-events-auto">
        
        {/* NOVO: O Canvas agora está aqui dentro, isolado na Hero de 100vh */}
        <SceneWrapper />

        <ScrollGlitch>
            Anti-Hacker
        </ScrollGlitch>
        
        

       
      </section>

      {/* Espaço vazio para testar o scroll glitch do componente */}
      <section className="relative z-10 min-h-screen bg-[#FF00FF] border-t-8 border-black">
          {/* Textura de fundo estilo "ruído" Brutalista */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[20px_20px]"></div>
          
          <BizarreGrid />
      </section>
       <section className="relative z-10 min-h-[70vh] bg-yellow-400 border-t-8 border-black p-8 flex flex-col items-center justify-center">
         <h2 className="text-4xl md:text-6xl font-black uppercase text-black bg-white inline-block p-4 border-4 border-black shadow-[8px_8px_0px_0px_#FF00FF] mb-8 transform rotate-1">
            Prove seu valor
         </h2>
         <HackerCombat />
      </section>
      <section className="relative z-10">
        <RoomWrapper />
      </section>
    </main>
  );
}