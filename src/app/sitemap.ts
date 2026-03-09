import { MetadataRoute } from 'next';
import { posts } from '@/lib/db'; // Puxamos os posts pra gerar as rotas

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://segurity.zanvexis.com'; // <-- Seu domínio final

  // A Home
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
  ];

  // Gera o sitemap de cada post dinâmico do blog (ignora os secretos VIPs)
  const postRoutes = posts
    .filter(post => !post.isSecret)
    .map((post) => ({
      url: `${baseUrl}/post/${post.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }));

  return [...routes, ...postRoutes];
}