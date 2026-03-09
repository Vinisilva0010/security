"use client";

import { useState, useRef, useEffect } from "react";

interface CombatLog {
  id: number;
  text: string;
  type: "player" | "boss" | "system" | "damage";
}

export default function HackerCombat() {
  const [playerHP, setPlayerHP] = useState(100);
  const [bossHP, setBossHP] = useState(100);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState<"win" | "lose" | null>(null);
  
  const [logs, setLogs] = useState<CombatLog[]>([
    { id: 1, text: "SISTEMA ZANVEXIS: Intruso detectado na rede principal.", type: "system" },
    { id: 2, text: "Protocolo de Defesa Ativado. PREPARE-SE PARA O COMBATE.", type: "system" }
  ]);

  const endOfLogRef = useRef<HTMLDivElement>(null);

  // Auto-scroll do terminal
  useEffect(() => {
    endOfLogRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Função para adicionar linhas no terminal
  const addLog = (text: string, type: CombatLog["type"]) => {
    setLogs((prev) => [...prev, { id: Date.now() + Math.random(), text, type }]);
  };

  // Turno do Invasor (Você)
  const handleAttack = (attackName: string, damage: number, type: "attack" | "heal") => {
    if (!isPlayerTurn || gameOver) return;

    if (type === "attack") {
      const actualDamage = Math.floor(damage * (0.8 + Math.random() * 0.4)); // Dano varia 20%
      setBossHP((prev) => Math.max(0, prev - actualDamage));
      addLog(`> Você executou [${attackName}]. Causou ${actualDamage} de dano no Sistema.`, "player");
    } else {
      const heal = 25;
      setPlayerHP((prev) => Math.min(100, prev + heal));
      addLog(`> Você injetou [${attackName}]. Recuperou ${heal} de HP.`, "player");
    }

    setIsPlayerTurn(false);
  };

  // Turno do Sistema (A Máquina responde)
  useEffect(() => {
    if (bossHP === 0 && !gameOver) {
      setGameOver("win");
      addLog("VITÓRIA: Firewall destruído. Acesso concedido.", "system");
      return;
    }

    if (!isPlayerTurn && !gameOver) {
      const bossAttackTimer = setTimeout(() => {
        const attacks = ["DDoS Massivo", "Injeção de Malware", "Overclock Reverso"];
        const randomAttack = attacks[Math.floor(Math.random() * attacks.length)];
        const damage = Math.floor(15 + Math.random() * 15);
        
        setPlayerHP((prev) => Math.max(0, prev - damage));
        addLog(`! SISTEMA executou [${randomAttack}]. Sua conexão perdeu ${damage} de integridade.`, "boss");
        
        setIsPlayerTurn(true);
      }, 1500); // O boss demora 1.5s para pensar (cria suspense)

      return () => clearTimeout(bossAttackTimer);
    }
  }, [isPlayerTurn, bossHP, gameOver]);

  // Verifica se o jogador morreu
  useEffect(() => {
    if (playerHP === 0 && !gameOver) {
      setGameOver("lose");
      addLog("FALHA CRÍTICA: Seu IP foi rastreado. Conexão terminada.", "system");
    }
  }, [playerHP, gameOver]);

  // UI Brutalista
  return (
    <div className="w-full max-w-4xl mx-auto my-16 bg-black p-6 border-8 border-black shadow-[16px_16px_0px_0px_#FF00FF]">
      
      {/* CABEÇALHO DO COMBATE */}
      <div className="flex justify-between items-center mb-6 border-b-4 border-[#FF00FF] pb-4">
        <div className="w-1/2 pr-4">
          <h3 className="text-[#00FF41] font-black uppercase text-xl mb-1">Seu Terminal</h3>
          <div className="w-full h-6 bg-gray-900 border-2 border-[#00FF41]">
            <div className="h-full bg-[#00FF41] transition-all duration-500" style={{ width: `${playerHP}%` }}></div>
          </div>
          <p className="text-[#00FF41] text-right text-sm font-bold mt-1">{playerHP} / 100 HP</p>
        </div>

        <h1 className="text-[#FF00FF] text-4xl font-black">VS</h1>

        <div className="w-1/2 pl-4">
          <h3 className="text-red-500 font-black uppercase text-xl text-right mb-1">Sistema Asilo</h3>
          <div className="w-full h-6 bg-gray-900 border-2 border-red-500 flex justify-end">
            <div className="h-full bg-red-500 transition-all duration-500" style={{ width: `${bossHP}%` }}></div>
          </div>
          <p className="text-red-500 text-left text-sm font-bold mt-1">{bossHP} / 100 HP</p>
        </div>
      </div>

      {/* O TERMINAL DE LOGS (A Tela CRT) */}
      <div className="w-full h-[250px] bg-gray-900 border-4 border-gray-700 p-4 font-mono text-sm overflow-y-auto mb-6 relative">
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-10" />
        <div className="relative z-20 space-y-2">
          {logs.map((log) => (
            <div key={log.id} className={`${
              log.type === "system" ? "text-yellow-400 font-bold" :
              log.type === "player" ? "text-[#00FF41]" :
              "text-red-500"
            }`}>
              {log.text}
            </div>
          ))}
          <div ref={endOfLogRef} />
        </div>
      </div>

      {/* PAINEL DE CONTROLE (BOTÕES DE ATAQUE) */}
      {gameOver ? (
        <div className="text-center">
          <h2 className={`text-5xl font-black uppercase mb-4 ${gameOver === "win" ? "text-[#00FF41]" : "text-red-500"}`}>
            {gameOver === "win" ? "SISTEMA HACKEADO" : "VOCÊ FOI DELETADO"}
          </h2>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-white text-black font-black uppercase border-4 border-black hover:bg-[#FF00FF] transition-colors"
          >
            Reiniciar Conexão
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <button 
            disabled={!isPlayerTurn}
            onClick={() => handleAttack("SYN Flood", 20, "attack")}
            className="p-3 bg-black text-[#00FF41] border-2 border-[#00FF41] font-black uppercase hover:bg-[#00FF41] hover:text-black disabled:opacity-50 transition-colors"
          >
            1. Ataque SYN Flood
          </button>
          
          <button 
            disabled={!isPlayerTurn}
            onClick={() => handleAttack("Zero-Day Exploit", 40, "attack")}
            className="p-3 bg-black text-[#FF00FF] border-2 border-[#FF00FF] font-black uppercase hover:bg-[#FF00FF] hover:text-black disabled:opacity-50 transition-colors"
          >
            2. Zero-Day Exploit (Risco Alto)
          </button>
          
          <button 
            disabled={!isPlayerTurn}
            onClick={() => handleAttack("Patch de Segurança", 0, "heal")}
            className="p-3 bg-black text-yellow-400 border-2 border-yellow-400 font-black uppercase hover:bg-yellow-400 hover:text-black disabled:opacity-50 transition-colors"
          >
            3. Aplicar Patch (Curar HP)
          </button>
          
          <button 
            disabled={!isPlayerTurn}
            onClick={() => handleAttack("SQL Injection", 15, "attack")}
            className="p-3 bg-black text-white border-2 border-white font-black uppercase hover:bg-white hover:text-black disabled:opacity-50 transition-colors"
          >
            4. Injeção SQL Rápida
          </button>
        </div>
      )}
    </div>
  );
}