import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Deixa o Googlebot, PerplexityBot, ChatGPTBot entrarem
      allow: '/',
      disallow: '/private/', // Rota imaginária que não queremos indexar
    },
    sitemap: 'https://segurity.zanvexis.com/sitemap.xml',
  };
}