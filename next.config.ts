/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Aplica essas regras de segurança em TODAS as rotas do site
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            // Força o navegador a usar SEMPRE HTTPS (Blindagem SSL)
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            // Impede que outros sites abram o seu dentro de um iframe (Anti-Clickjacking)
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            // Bloqueia o navegador de tentar "adivinhar" o MIME type (evita execução de malware disfarçado de imagem)
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            // Protege de onde o tráfego está vindo quando você linka pra fora
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ],
      },
    ];
  },
};

export default nextConfig;