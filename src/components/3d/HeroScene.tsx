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

  // A MATEMÁTICA RESPONSIVA DO WEBGL
  // Se a largura for menor que a altura, o usuário está com o celular em pé.
  const isMobile = viewport.width < viewport.height;

  // ESCALA: No celular a gente MULTIPLICA pra compensar a tela fina. No PC, mantemos o seu código.
  const charScale: [number, number, number] = isMobile
    ? [viewport.width * 1.2, viewport.width * 1.2, 1] 
    : [viewport.width / 1.8, viewport.width / 1.8, 1];

  // POSIÇÃO: No celular, eu empurrei ele um pouco mais pro centro pra ficar imponente.
  const charPos: [number, number, number] = isMobile
    ? [0, -1.8, 0] // No mobile fica mais centralizado embaixo
    : [viewport.width / 3.5, -1, 0]; // No PC fica onde você desenhou perfeitamente

  // FUNDO: O fundo também precisa crescer mais no mobile pra não mostrar as bordas
  const bgScale: [number, number, number] = isMobile
    ? [viewport.width * 5, viewport.height * 5, 1]
    : [viewport.width * 3, viewport.height * 3, 1];

  useFrame((state) => {
    if (characterRef.current) {
      const time = state.clock.getElapsedTime();
      
      // O PULO DO GATO: Somamos a posição Y base com o Seno, assim a flutuação não quebra o posicionamento do mobile
      characterRef.current.position.y = charPos[1] + Math.sin(time * 2) * 0.2;
      characterRef.current.rotation.z = Math.sin(time * 3) * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} />
      
      <mesh position={[0, 0, -5]} scale={bgScale}>
        <planeGeometry />
        <meshBasicMaterial map={background} transparent={true} opacity={1} depthWrite={false} />
      </mesh>
      
      <mesh ref={characterRef} position={charPos} scale={charScale}>
        <planeGeometry />
        <meshBasicMaterial map={character} transparent={true} opacity={1} />
      </mesh>
    </>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute top-0 left-0 w-full h-[100vh] z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true }}>
        <Suspense fallback={null}>
          <SurrealElements />
        </Suspense>
      </Canvas>
    </div>
  );
}