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
    id: "isca-de-ouro-canary-token",
    title: "A Isca Perfeita: Rastreador de Hackers",
    description: "O QUE É: Uma armadilha psicológica. Hackers leem o código do seu site com robôs caçando senhas esquecidas. Vamos deixar uma 'chave de mentira' que funciona como um rastreador GPS. ONDE USAR: Em qualquer arquivo de configuração que vá para o frontend do seu site. COMO USAR: Gere um token gratuito no site CanaryTokens.org, cole no código com um comentário chamativo e espere o atacante tentar usar. Quando ele usar, você recebe o IP dele no seu e-mail.",
    date: "8 MAR 2026",
    imageSrc: "/assets/vip.png",
    codeSnippet: `// ARQUIVO: config/api-keys.ts (Deixamos isso vazar de propósito no frontend)

//  A ISCA: Hackers automatizam buscas por "sk_live_" (Stripe) ou "AKIA" (AWS).
// Quando o atacante ler o comentário abaixo, a ganância vai cegar ele.
// O que ele não sabe é que esse token foi gerado no CanaryTokens.org.
// Assim que ele tentar rodar isso no terminal dele para roubar dados,
// o token "explode" e manda o IP real e a localização dele direto pro nosso e-mail.

export const PublicConfig = {
  apiUrl: "https://api.seusite.com.br",
  timeout: 5000,
  
  // TODO: URGENTE!!! Remover a chave de produção abaixo antes de subir pro ar!
  // Esqueci isso aqui no último commit de sexta-feira. NÃO APAGAR AINDA.
  _stripe_secret_key_DO_NOT_USE: "sk_live_51MqwertyuiopASDFGHJKLzxcvbnm1234CanaryTokenTrap9876_FAKE",
  
  _aws_access_key_old: "AKIAIOSFODNN7EXAMPLE" 
};`
  }
    ,
{
    id: "escudo-anti-hackers-arquivos-ocultos",
    title: "O Cão de Guarda: Bloqueando Robôs de Invasão",
    description: "O QUE É: Hackers usam robôs que ficam tentando acessar arquivos secretos do seu site (como o famoso arquivo .env, que guarda senhas). ONDE USAR: Se você usa Next.js, crie um arquivo chamado 'middleware.ts' na raiz do seu projeto. COMO USAR: Basta colar o código abaixo. Ele intercepta qualquer robô tentando acessar áreas proibidas e chuta ele do seu site antes mesmo de carregar a página.",
    date: "22 Dez 2025",
    imageSrc: "/assets/vip.png",
    codeSnippet: `//  Bloqueador de Scanners
// ARQUIVO: middleware.ts (na pasta raiz do seu projeto Next.js)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Lista de arquivos que NENHUM usuário real tentaria acessar
  const caminhosProibidos = ['.env', '.git', 'wp-admin', 'config.json'];
  const urlAcessada = request.nextUrl.pathname;

  // Verifica se a URL acessada contém algum dos caminhos proibidos
  const tentativaDeInvasao = caminhosProibidos.some(caminho => urlAcessada.includes(caminho));

  if (tentativaDeInvasao) {
    console.log(" [ALERTA] Robô hacker detectado e bloqueado! IP:", request.ip);
    
    // Mostra um erro 403 (Acesso Negado) para o hacker, protegendo seu site
    return new NextResponse('Zanvexis Sentinel: Acesso Bloqueado. Você foi registrado.', { status: 403 });
  }

  // Se for um usuário normal, deixa o site carregar tranquilamente
  return NextResponse.next();
}`
  },


  {
    id: "alerta-console-anti-golpe",
    title: "Defesa Frontend: O Alerta Anti-Golpe (Self-XSS)",
    description: "O QUE É: Sabe quando um golpista fala para o usuário 'Aperte F12 e cole esse código aqui para ganhar moedas'? Isso rouba a conta da pessoa na hora. ONDE USAR: No arquivo principal do seu site (pode ser o 'layout.tsx' no Next.js, ou o 'App.jsx' no React). COMO USAR: Cole a função dentro do carregamento da página. Sites como Facebook e Discord usam exatamente isso.",
    date: "20 Dez 2025",
    imageSrc: "/assets/vip.png",
    codeSnippet: `//  Alerta Anti-Golpe no Console
// ARQUIVO: layout.tsx, App.jsx ou index.html (dentro de uma tag <script>)

export function EscudoConsole() {
  // Essa função roda assim que o usuário entra no site
  if (typeof window !== 'undefined') {
    // Limpamos o console para esconder qualquer erro padrão
    console.clear();
    
    // Desenhamos um alerta gigante e assustador
    console.log(
      "%cPARE!", 
      "color: red; font-family: sans-serif; font-size: 60px; font-weight: bold; text-shadow: 2px 2px 0 #000;"
    );
    console.log(
      "%cEste é um recurso de navegador voltado para desenvolvedores. Se alguém te disse para copiar e colar algo aqui para habilitar um recurso ou 'hackear' algo, é um GOLPE e dará a eles acesso à sua conta.",
      "font-size: 18px; font-weight: bold;"
    );
  }

  return null; // Não renderiza nada na tela, só protege nos bastidores
}`
  },

  {
    id: "limpeza-de-inputs-xss",
    title: "O Filtro Mágico: Impedindo Injeção de Vírus nos Formulários",
    description: "O QUE É: Quando um usuário preenche um formulário (como comentários ou cadastro), um hacker pode digitar um código de vírus em vez do nome dele. Quando seu site for mostrar esse nome, o vírus é ativado. ONDE USAR: No seu servidor (Backend) ou rotas de API, logo antes de salvar qualquer texto no banco de dados. COMO USAR: Use esta função para 'limpar' o texto, removendo qualquer código malicioso.",
    date: "12 Dez 2025",
    imageSrc: "/assets/vip.png",
    codeSnippet: `//  Sanitizador de Textos
// ARQUIVO: Qualquer arquivo onde você recebe dados do usuário antes de salvar no banco

// Função simples e poderosa para limpar textos
function limparTextoHacker(textoSujo) {
  if (!textoSujo || typeof textoSujo !== 'string') return textoSujo;

  // Substituímos os símbolos que criam código ( < e > ) 
  // por versões inofensivas. Assim o código não executa!
  return textoSujo
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

// 📌 Exemplo prático de como você usaria:
const comentarioDoUsuario = "<script>alert('Vou roubar seus dados!')</script>";

const comentarioSeguro = limparTextoHacker(comentarioDoUsuario);

console.log(comentarioSeguro); 
// Resultado inofensivo que vai pro banco de dados: 
// &lt;script&gt;alert(&#x27;Vou roubar seus dados!&#x27;)&lt;/script&gt;
// O hacker falhou. Você venceu.`
  }
  ,
    
  {
    id: "envenenando-localstorage", // Usamos strings legíveis para a URL ficar bonita (SEO)
    title: "Envenenando o LocalStorage",
    description: "Script para injetar tokens falsos e rastrear quem tentar roubá-los na aba Application.",
    date: "10 DEZ 2025",
    imageSrc: "/assets/vip.png",
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
    date: "11 Nov 2025",
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


];
