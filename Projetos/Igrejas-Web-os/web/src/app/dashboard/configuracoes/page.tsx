import Link from "next/link";
import { Cpu, Network, Waypoints, ShieldCheck, Terminal, Library, GitMerge, Fingerprint, Radar } from "lucide-react";

export default function ConfiguracoesPage() {
  const modulos = [
    { title: "Igrejas", desc: "Gestão de malha eclesiástica", href: "/dashboard/igrejas", icon: Network, color: "text-emerald-500" },
    
    // INJEÇÃO CORRETIVA: A rota de setores era /igrejas e não /setores solto.
    { title: "Setores", desc: "Roteamento de áreas", href: "/dashboard/igrejas", icon: Waypoints, color: "text-blue-500" },
    
    { title: "Cargos", desc: "Níveis de autoridade", href: "/dashboard/configuracoes/cargos", icon: ShieldCheck, color: "text-purple-500" },
    { title: "Profissões", desc: "Matriz de atuação", href: "/dashboard/configuracoes/profissoes", icon: Terminal, color: "text-amber-500" },
    { title: "Escolaridade", desc: "Base de conhecimento", href: "/dashboard/configuracoes/escolaridade", icon: Library, color: "text-indigo-500" },
    { title: "Estado Civil", desc: "Vínculos e uniões", href: "/dashboard/configuracoes/estado-civil", icon: GitMerge, color: "text-pink-500" },
    { title: "Gênero", desc: "Identificação única", href: "/dashboard/configuracoes/genero", icon: Fingerprint, color: "text-cyan-500" },
    { title: "Regiões do DF", desc: "Mapeamento territorial", href: "/dashboard/configuracoes/regioes-df", icon: Radar, color: "text-rose-500" },
  ];

  return (
    <div className="max-w-[1600px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 pb-6 border-b border-neutral-800">
        <Cpu className="w-8 h-8 text-neutral-400" />
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Settings</h1>
          <p className="text-sm text-neutral-400">Gerencie as tabelas auxiliares e os dados mestres da plataforma.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {modulos.map((mod) => (
          <Link key={mod.title} href={mod.href} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 hover:border-neutral-600 transition-all group flex items-start gap-4 shadow-sm hover:shadow-black/50">
            <div className={`p-3 rounded-lg bg-neutral-950 border border-neutral-800 group-hover:scale-110 transition-transform ${mod.color}`}>
              <mod.icon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-white font-bold text-base group-hover:text-emerald-500 transition-colors">{mod.title}</h3>
              <p className="text-neutral-500 text-xs mt-1">{mod.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}