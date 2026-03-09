// src/lib/db.ts

export interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  imageSrc: string; // O nome da imagem que você gerar no Nano Banana
  codeSnippet: string;
  isSecret?: boolean;
}

export const posts: Post[] = [
  {
    id: "envenenando-localstorage", // Usamos strings legíveis para a URL ficar bonita (SEO)
    title: "Envenenando o LocalStorage",
    description: "Script para injetar tokens falsos e rastrear quem tentar roubá-los na aba Application.",
    date: "10 DEZ 2026",
    imageSrc: "/assets/floppy.png",
    codeSnippet: `// Injetando veneno no LocalStorage
function poisonTokens() {
  const fakeToken = "eyJh...HACKER_TRAP_ACTIVATED";
  Object.defineProperty(window, 'localStorage', {
    get: function() {
      console.warn("TENTATIVA DE LEITURA DETECTADA. GRAVANDO IP...");
      return {
        getItem: (key) => key === 'auth_token' ? fakeToken : null,
        setItem: () => { throw new Error("Acesso negado."); }
      };
    }
  });
}
poisonTokens();`
  },
  {
    id: "trava-devtools",
    title: "Trava de DevTools",
    description: "Como criar um loop de debugger infinito que congela a aba do invasor instantaneamente.",
    date: "11 DEZ 2026",
    imageSrc: "/assets/padlock.png", // Lembre de ter essas imagens na pasta public/assets
    codeSnippet: `// Loop da Morte para curiosos
setInterval(function() {
  const before = new Date().getTime();
  debugger; // O navegador pausa aqui se o F12 estiver aberto
  const after = new Date().getTime();
  if (after - before > 100) {
    document.body.innerHTML = "<h1 style='color:red;font-size:5rem;text-align:center;'>SAIA DAQUI.</h1>";
  }
}, 100);`
  }
,

{
    id: "zero-day-vip",
    title: "Zero-Day Exploit (VIP)",
    description: "PARABÉNS. Você quebrou a matrix. Script confidencial de evasão de sandbox.",
    date: "13 DEZ 2026",
    imageSrc: "/assets/vip.png", // A imagem dourada
    isSecret: true, // Isso esconde ele por padrão
    codeSnippet: `// ==========================================
// ACESSO VIP DETECTADO.
// CARREGANDO PAYLOAD NA MEMÓRIA...
// ==========================================

function bypassSandbox() {
    console.log("%c[+] Injecting shellcode into V8 engine...", "color: #FFD700");
    // Brincadeira visual para assustar quem ler o código
    setTimeout(() => {
        console.error("CRITICAL FAILURE: SIMULATION ONLY. NICE TRY, HACKER.");
    }, 2000);
}

bypassSandbox();`
  }
];