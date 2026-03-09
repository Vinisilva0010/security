"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

function SurrealElements() {
  const background = useTexture("/assets/fundo.png");
  const character = useTexture("/assets/personagem.png");
  const { viewport } = useThree();
  const characterRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (characterRef.current) {
      const time = state.clock.getElapsedTime();
      characterRef.current.position.y = Math.sin(time * 2) * 0.2;
      characterRef.current.rotation.z = Math.sin(time * 3) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      
      {/* O fundo escalado em 3x para compensar a distância no eixo Z (-5) */}
      <mesh position={[0, 0, -5]} scale={[viewport.width * 3, viewport.height * 3, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={background} transparent={true} opacity={1} depthWrite={false} />
      </mesh>
      
      {/* Empurrei o personagem um pouco mais pra direita para não cobrir tanto o texto */}
      <mesh ref={characterRef} position={[viewport.width / 3.5, -1, 0]} scale={[viewport.width / 1.8, viewport.width / 1.8, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={character} transparent={true} opacity={1} />
      </mesh>
    </>
  );
}

export default function HeroScene() {
  return (
    // NOVO: Fixando a altura do contêiner do Canvas para ocupar apenas a Hero (100vh)
    <div className="absolute top-0 left-0 w-full h-[100vh] z-0 pointer-events-none">
      {/* NOVO: gl={{ alpha: true }} garante que o Canvas WebGL seja transparente */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <SurrealElements />
        </Suspense>
      </Canvas>
    </div>
  );
}