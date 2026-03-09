"use client";

import { useEffect } from "react";

export default function ConsoleHoneypot() {
  useEffect(() => {
    // Evita rodar no servidor durante o build
    if (typeof window === "undefined") return;

    // A arte ASCII macabra
    const skull = `
        .:::...
      .::::.::::.
     ::::::.::::::
    :::::::::::::::
    ':::::::::::::'
      ':::::::::'
        ':::::'
          ':'
    `;

    // Estilos Brutalistas aplicados direto no console do navegador
    const styleTitle = "color: #FF00FF; font-size: 50px; font-weight: 900; text-shadow: 4px 4px 0px #000; font-family: sans-serif;";
    const styleText = "color: #FFF; background: #000; font-size: 16px; padding: 10px; border: 2px solid #FF00FF; font-family: monospace;";
    const styleAscii = "color: #FF0000; font-size: 14px; font-weight: bold;";

    // O ataque em sequência
    setTimeout(() => {
      console.clear(); // Limpa qualquer lixo do Next.js antes de focar na nossa mensagem
      console.log("%cASILO ANTI-HACKER", styleTitle);
      console.log("%c" + skull, styleAscii);
      console.log(
        "%c⚠️ ALERTA DE VIOLAÇÃO: Cada clique seu aqui está sendo monitorado. Volte para a superfície antes que você quebre algo que não sabe consertar.",
        styleText
      );
      
      // Um pequeno log silencioso pra fingir que estamos capturando IPs (guerra psicológica pura)
      console.log("Trace route initialized...");
      console.log("Aguardando handshake de segurança...");
    }, 1000); // 1 segundo de atraso para garantir que limpe o console depois do carregamento
  }, []);

  // Esse componente é um "fantasma", não tem UI.
  return null;
}