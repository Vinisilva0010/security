"use client";

import { useState, useRef, useEffect } from "react";

// Tipagem do nosso histórico
interface TerminalLine {
  id: number;
  text: string;
  type: "input" | "output" | "error" | "system";
}

export default function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { id: 0, text: "Asilo OS v6.6.6 inicializado.", type: "system" },
    { id: 1, text: "Acesso restrito. Digite 'help' se não souber o que fazer.", type: "system" },
  ]);
  
  // Ref para dar scroll automático sempre que uma nova linha aparecer
  const endOfTerminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  // O "Cérebro" do nosso terminal falso
  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    
    // Adiciona o que o usuário digitou no histórico
    const newHistory = [...history, { id: Date.now(), text: `root@asilo:~$ ${cmd}`, type: "input" as const }];

    let response: TerminalLine;

    // Roteador de comandos Brutalista
    switch (cleanCmd) {
      case "help":
        response = { id: Date.now() + 1, text: "Comandos disponíveis: help, ls, clear, sudo", type: "output" };
        break;
      case "ls":
        response = { id: Date.now() + 1, text: "passwords.txt  config.env  .ssh  DONT_OPEN.exe", type: "output" };
        break;
      case "cat passwords.txt":
        response = { id: Date.now() + 1, text: "Acha mesmo que eu deixaria a senha aqui, júnior? Tente mais forte.", type: "error" };
        break;
      case "clear":
        setHistory([]);
        return; // Sai da função para não adicionar a resposta
      case "sudo rm -rf /":
      case "sudo":
        response = { id: Date.now() + 1, text: "[!!!] INICIANDO FORMATAÇÃO DO DISCO C:\\ ... [!!!]", type: "error" };
        // Bônus: muda a cor do fundo do terminal temporariamente
        document.getElementById("hacker-terminal")?.classList.add("bg-red-900");
        setTimeout(() => document.getElementById("hacker-terminal")?.classList.remove("bg-red-900"), 2000);
        break;
      case "":
        return; // Enter vazio não faz nada
      default:
        response = { id: Date.now() + 1, text: `bash: ${cleanCmd}: comando não encontrado. Tá digitando com o cotovelo?`, type: "error" };
    }

    setHistory([...newHistory, response]);
  };

  return (
    <div className="w-full max-w-4xl mx-auto my-16">
      <h3 className="text-[#FF00FF] font-black uppercase text-2xl mb-2 transform -rotate-1 drop-shadow-[2px_2px_0px_#000]">
        Terminal de Intrusão
      </h3>
      
      <div 
        id="hacker-terminal"
        className="relative w-full h-[400px] bg-black border-4 border-black shadow-[12px_12px_0px_0px_#FF00FF] p-4 font-mono text-sm md:text-base overflow-y-auto transition-colors duration-150 cursor-text"
        onClick={() => document.getElementById("terminal-input")?.focus()}
      >
        {/* Efeito de Scanline CRT via CSS inline rápido */}
        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(255,255,255,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] z-10" />

        <div className="relative z-20">
          {history.map((line) => (
            <div 
              key={line.id} 
              className={`mb-1 ${
                line.type === "error" ? "text-red-500 font-bold animate-pulse" : 
                line.type === "system" ? "text-yellow-400" : 
                "text-[#00FF41]"
              }`}
            >
              {line.text}
            </div>
          ))}

          {/* O input disfarçado de linha de comando */}
          <div className="flex items-center text-[#00FF41] mt-2">
            <span className="mr-2">root@asilo:~$</span>
            <input
              id="terminal-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommand(input);
                  setInput(""); // Limpa o input depois de mandar
                }
              }}
              className="flex-1 bg-transparent border-none outline-none text-[#00FF41] caret-[#FF00FF] w-full"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div ref={endOfTerminalRef} />
        </div>
      </div>
    </div>
  );
}