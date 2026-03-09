"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, Html } from "@react-three/drei"; // NOVO: Importamos o Html
import * as THREE from "three";
import { motion } from "framer-motion";

// === SUB-COMPONENTE CLEAN CODE ===
// Cuida da própria animação, do hover e da etiqueta HTML
function FloatingLink({ position, texture, url, label }: { position: [number, number, number], texture: THREE.Texture, url: string, label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Animação de escala ultra-suave na GPU usando Interpolação Linear (lerp)
  useFrame((state, delta) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.3 : 1; // Cresce 30% no hover
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={() => window.open(url, "_blank")}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = "url('/assets/icone.png') 16 16, pointer"; }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = "url('/assets/icone.png') 16 16, auto"; }}
    >
      <planeGeometry />
      <meshBasicMaterial map={texture} transparent={true} />
      
      {/* O PORTAL HTML: Só aparece quando passa o mouse */}
      {hovered && (
        <Html center position={[0, -0.8, 0]} zIndexRange={[100, 0]}>
          <div className="bg-black text-[#FF00FF] border-2 border-[#FF00FF] font-black uppercase px-3 py-1 text-sm tracking-widest transform -rotate-2 shadow-[4px_4px_0px_0px_#000] pointer-events-none whitespace-nowrap">
            {label}
          </div>
        </Html>
      )}
    </mesh>
  );
}

// === O AMBIENTE DA SALA ===
function RoomEnvironment({ triggerPrank }: { triggerPrank: () => void }) {
  const floorTex = useTexture("/assets/room/chao.png");
  const ceilingTex = useTexture("/assets/room/teto.png");
  const wallTex = useTexture("/assets/room/parede.png");
  const serverTex = useTexture("/assets/room/servidor.png");
  const btnTex = useTexture("/assets/room/botao.png");
  
  const linkedinTex = useTexture("/assets/room/linkedin.png");
  const githubTex = useTexture("/assets/room/github.png");
  const discordTex = useTexture("/assets/room/discord.png");

  floorTex.wrapS = floorTex.wrapT = THREE.RepeatWrapping;
  floorTex.repeat.set(4, 4);
  wallTex.wrapS = wallTex.wrapT = THREE.RepeatWrapping;
  wallTex.repeat.set(2, 2);

  const { camera } = useThree();
  const serverRef = useRef<THREE.Mesh>(null);
  const btnRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const targetX = (state.pointer.x * Math.PI) / 6;
    const targetY = (state.pointer.y * Math.PI) / 8;
    camera.rotation.y += 0.05 * (-targetX - camera.rotation.y);
    camera.rotation.x += 0.05 * (targetY - camera.rotation.x);

    const time = state.clock.elapsedTime;
    if (serverRef.current) {
      serverRef.current.position.y = -1.5 + Math.sin(time * 4) * 0.1;
    }
    if (btnRef.current) {
      const scale = 1.5 + Math.sin(time * 8) * 0.1;
      btnRef.current.scale.set(scale, scale, 1);
    }
  });

  const ROOM_SIZE = 10;

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 4, 0]} intensity={2} color="#FF00FF" distance={15} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -ROOM_SIZE / 2, 0]}>
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial map={floorTex} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM_SIZE / 2, 0]}>
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial map={ceilingTex} />
      </mesh>
      <mesh position={[0, 0, -ROOM_SIZE / 2]}>
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial map={wallTex} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-ROOM_SIZE / 2, 0, 0]}>
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial map={wallTex} />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[ROOM_SIZE / 2, 0, 0]}>
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial map={wallTex} />
      </mesh>

      <mesh ref={serverRef} position={[0, -1.5, -3.5]} scale={[3, 3, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={serverTex} transparent={true} />
      </mesh>

      {/* USO DO COMPONENTE CLEAN CODE (Passando as texturas, links e labels) */}
      <FloatingLink 
        position={[-2.5, 0, -3]} 
        texture={githubTex} 
        url="https://github.com/Vinisilva0010" 
        label="Meu GitHub" 
      />
      
      <FloatingLink 
        position={[2.5, 0, -3]} 
        texture={linkedinTex} 
        url="https://www.linkedin.com/in/vinicius-pontual-84b05b390" 
        label="Meu LinkedIn" 
      />
      
      <FloatingLink 
        position={[0, 1.5, -3.5]} 
        texture={discordTex} 
        url="https://discord.com" 
        label="Comunidade Discord" 
      />

      {/* BOTÃO DO JUMPSCARE (Continua com o evento separado pra explodir a tela) */}
      <mesh 
        ref={btnRef} position={[0, -1, -2]} 
        onClick={triggerPrank} 
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "url('/assets/icone.png') 16 16, pointer"; }} 
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = "url('/assets/icone.png') 16 16, auto"; }}
      >
        <planeGeometry />
        <meshBasicMaterial map={btnTex} transparent={true} />
      </mesh>
    </>
  );
}

// ... a exportação do NightmareRoom com o Frame Motion do Jumpscare continua igualzinha abaixo disso.



export default function NightmareRoom() {
  const [isPranked, setIsPranked] = useState(false);

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden border-t-8 border-[#FF00FF]">
      {/* O CANVAS 3D */}
     <Canvas camera={{ position: [0, 0, 2], fov: 75 }} gl={{ antialias: false, alpha: true }}>
        {/* Passamos null. Zero HTML dentro do mundo 3D. Performance máxima. */}
        <Suspense fallback={null}>
          <RoomEnvironment triggerPrank={() => setIsPranked(true)} />
        </Suspense>
      </Canvas>

      {/* A ARMADILHA: O Jumpscare do Framer Motion */}
      {isPranked && (
        <div className="absolute inset-0 z-[9999] flex items-center justify-center pointer-events-auto cursor-none">
          
          {/* Fundo piscando que nem um estrobo */}
          <motion.div
            animate={{ backgroundColor: ["#000000", "#FF0000", "#000000"] }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="absolute inset-0"
          />

          {/* A imagem bizarra do Nano Banana saltando na cara (certifique-se de que está com fundo transparente!) */}
          <motion.img
            src="/assets/room/jumpscare.png"
            alt="VOCÊ FOI PEGO"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: [-10, 10, -5, 5, 0] }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="relative z-10 w-full md:w-3/4 h-full object-contain drop-shadow-[10px_10px_0px_#FF00FF]"
          />

          {/* Texto Glitch Ameaçador */}
          <motion.h1
            className="absolute z-20 text-5xl md:text-8xl font-black text-white uppercase text-center mix-blend-difference"
            animate={{ opacity: [1, 0, 1, 0.5, 1], x: [-10, 10, -10] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          >
            Distrua os  <br/> Hackers 
          </motion.h1>
        </div>
      )}
    </div>
  );
}