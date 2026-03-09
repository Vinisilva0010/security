import Link from "next/link";
import { notFound } from "next/navigation";
import BrokenTerminal from "@/components/ui/BrokenTerminal";
import { posts } from "@/lib/db";

// Next.js 16: params é uma promise
export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  // Busca o post no nosso "banco de dados"
  const post = posts.find((p) => p.id === resolvedParams.id);

  // Se o hacker tentar acessar uma URL que não existe, joga pro 404
  if (!post) {
    notFound(); 
  }

  return (
    <main className="min-h-screen bg-yellow-400 p-6 md:p-12 cursor-[url('/assets/icone.png'),_auto] selection:bg-black selection:text-[#FF00FF]">
      
      <div className="max-w-4xl mx-auto mb-12">
        <Link href="/">
          <button className="text-3xl font-black uppercase text-black bg-white border-4 border-black shadow-[6px_6px_0px_0px_#000] px-6 py-3 hover:translate-x-[-4px] hover:translate-y-[4px] hover:shadow-none transition-all cursor-[url('/assets/icone.png'),_pointer]">
            {"< Voltar para o Caos"}
          </button>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto mb-8 text-center md:text-left">
        {/* Título dinâmico puxado do banco */}
        <h1 className="text-4xl md:text-6xl font-black uppercase text-black bg-[#FF00FF] inline-block border-4 border-black p-4 transform rotate-1 shadow-[8px_8px_0px_0px_#000]">
          {post.title}
        </h1>
        <p className="mt-6 text-xl md:text-2xl font-bold bg-black text-white p-4 border-4 border-black inline-block transform -rotate-1">
          {post.description}
        </p>
      </div>

      {/* Código dinâmico puxado do banco */}
      <BrokenTerminal codeSnippet={post.codeSnippet} />

    </main>
  );
}