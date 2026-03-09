"use client";

import { useState, useEffect } from "react";

export function useCaosCode() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    // A palavra-chave secreta
    const secret = "caos";
    let inputBuffer = "";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Pega a tecla e joga pro minúsculo
      const key = e.key.toLowerCase();
      
      // Adiciona no nosso buffer
      inputBuffer += key;

      // Mantém o buffer só com o tamanho da palavra secreta para não gastar memória
      if (inputBuffer.length > secret.length) {
        inputBuffer = inputBuffer.slice(-secret.length);
      }

      // Se o buffer bater com a senha, DESTRAVA!
      if (inputBuffer === secret) {
        setUnlocked(true);
        // Toca um som de glitch de sistema (opcional, mas brutal)
        // const audio = new Audio('/assets/glitch.mp3'); audio.play();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return unlocked;
}