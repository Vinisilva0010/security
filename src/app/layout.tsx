import type { Metadata } from "next";
import "./globals.css";
import ConsoleHoneypot from "@/components/traps/ConsoleHoneypot"; // IMPORTA AQUI
import SlimeTrail from "@/components/ui/SlimeTrail";
export const metadata: Metadata = {
  title: {
    default: " Anti-Hacker | segurity",
    template: "%s |  Anti-Hacker",
  },
  description: "Arsenal de códigos Brutalista e armadilhas de front-end. Inspecionar o elemento não vai te salvar aqui.",

  icons: {
    icon: '/favicon.png', 
  },

  keywords: ["Cybersecurity", "Web3", "Next.js", "React Three Fiber", "Honeypot", "Zanvexis", "Vinicius Pontual", "Segurança Web"],
  authors: [{ name: "Vinicius Pontual", url: "https://github.com/Vinisilva0010" }],
  creator: "Vinicius Pontual",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://seusite.com.br", // <-- Troque pro seu domínio depois
    title: " Anti-Hacker | segurity",
    description: "Arsenal de códigos e armadilhas de front-end. Entre por sua conta e risco.",
    siteName: "Asilo Anti-Hacker",
    // imagens pro card do LinkedIn/Discord
    images: [
      {
        url: "/assets/room/servidor.png", // A nossa isca fica de capa
        width: 1200,
        height: 630,
        alt: "Servidor Derretido",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: " Anti-Hacker",
    description: "Arsenal brutalista de códigos de segurança.",
    creator: "@zanvexis", // Se tiver
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // O JSON-LD estruturado: mastigando a info pra IA
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": " Anti-Hacker",
    "url": "https://segurity.zanvexis.com",
    "description": "Portfólio interativo focado em segurança ofensiva e desenvolvimento de alta performance.",
    "publisher": {
      "@type": "Organization",
      "name": "Zanvexis",
      "logo": {
        "@type": "ImageObject",
        "url": "https://segurity.zanvexis.com/assets/icone.png"
      }
    },
    "author": {
      "@type": "Person",
      "name": "Vinicius Pontual",
      "url": "https://www.linkedin.com/in/vinicius-pontual-84b05b390"
    }
  };

  return (
    <html lang="pt-BR">
      <body>
        <ConsoleHoneypot />
        <SlimeTrail />
        
        {/* INJEÇÃO DO JSON-LD NO DOM */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {children}
      </body>
    </html>
  );
}