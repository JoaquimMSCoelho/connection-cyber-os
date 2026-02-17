import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Users, DollarSign, Building } from "lucide-react";
import QuickTimelineSearch from "@/components/dashboard/QuickTimelineSearch";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* CABEÇALHO DA PÁGINA */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Visão Geral
        </h1>
        <p className="text-neutral-400">
          Bem-vindo de volta, <span className="text-emerald-500 font-medium">{user.email}</span>
        </p>
      </div>

      {/* GRID DE CARDS (KPIs) + BUSCA RÁPIDA (Reordenado Fase 7) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* CARD 1 (DESTAQUE MÁXIMO): HISTÓRICO MEMBRO */}
        <QuickTimelineSearch />
        
        {/* CARD 2: RECEITA */}
        <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-800 rounded-xl text-emerald-500">
              <DollarSign className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-400 font-medium uppercase tracking-wider">Receita Mensal</p>
              <h3 className="text-2xl font-bold text-white mt-1">R$ 0,00</h3>
            </div>
          </div>
        </div>

        {/* CARD 3: MEMBROS ATIVOS */}
        <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-800 rounded-xl text-emerald-500">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-400 font-medium uppercase tracking-wider">Membros Ativos</p>
              <h3 className="text-2xl font-bold text-white mt-1">0</h3>
            </div>
          </div>
        </div>

        {/* CARD 4: IGREJAS NO SETOR */}
        <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors" />
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-800 rounded-xl text-emerald-500">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-neutral-400 font-medium uppercase tracking-wider">Igrejas no Setor</p>
              <h3 className="text-2xl font-bold text-white mt-1">7</h3>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}