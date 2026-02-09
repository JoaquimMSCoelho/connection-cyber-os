import { createClient } from "@/utils/supabase/server";
import { Plus, Search, MoreHorizontal, User, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link"; // FUSÃO TÉCNICA: Importação necessária para navegação
import { Member } from "@/types"; 

export default async function MembersPage() {
  const supabase = await createClient();
  
  const { data: members, error } = await supabase
    .from("members")
    .select(`
      *,
      ecclesiastical_roles (
        name
      )
    `)
    .eq('status', 'ACTIVE') // Filtro de Negócio (Apenas Membros Ativos)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      {/* CABEÇALHO */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Gestão de Membros</h1>
          <p className="text-neutral-400">Gerencie os membros ativos da congregação.</p>
        </div>
        
        {/* FUSÃO TÉCNICA: Botão convertido em Link para navegação correta */}
        <Link 
          href="/dashboard/membros/novo"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-emerald-900/20"
        >
          <Plus className="w-4 h-4" />
          Novo Membro
        </Link>
      </div>

      {/* BARRA DE BUSCA */}
      <div className="flex items-center gap-4 bg-neutral-900/50 p-1 rounded-xl border border-neutral-800 w-full max-w-md">
        <div className="pl-3 text-neutral-500">
          <Search className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          placeholder="Buscar membro ativo..." 
          className="bg-transparent border-none text-sm text-neutral-200 placeholder-neutral-600 w-full focus:ring-0"
        />
      </div>

      {/* TABELA DE DADOS */}
      <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-900/30">
        <table className="w-full text-left text-sm">
          <thead className="bg-neutral-900 border-b border-neutral-800">
            <tr>
              <th className="px-6 py-4 font-medium text-neutral-400">Nome Completo</th>
              <th className="px-6 py-4 font-medium text-neutral-400">Função</th>
              <th className="px-6 py-4 font-medium text-neutral-400">Situação</th>
              <th className="px-6 py-4 font-medium text-neutral-400">Contato</th>
              <th className="px-6 py-4 font-medium text-neutral-400 text-right">Ações</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-neutral-800">
            {(members as unknown as Member[])?.map((member) => (
              <tr key={member.id} className="group hover:bg-neutral-800/30 transition-colors">
                
                {/* Coluna Nome */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 border border-neutral-700">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-medium text-neutral-200">{member.full_name}</div>
                      <div className="text-xs text-neutral-500">{member.email || "Sem e-mail"}</div>
                    </div>
                  </div>
                </td>

                {/* Coluna Função */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-neutral-800 text-neutral-400 border-neutral-700">
                    {member.ecclesiastical_roles?.name || "Sem Cargo"}
                  </span>
                </td>

                {/* Coluna Situação Financeira (Lógica Preservada) */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {member.financial_status === 'UP_TO_DATE' ? (
                      // VERDE: Pagamentos em dia
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Em Dia
                      </span>
                    ) : (
                      // VERMELHO: Pendente
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/20">
                        <AlertCircle className="w-3 h-3" />
                        Pendente
                      </span>
                    )}
                  </div>
                </td>

                {/* Coluna Contato */}
                <td className="px-6 py-4 text-neutral-400">
                  {member.phone || "-"}
                </td>

                {/* Coluna Ações */}
                <td className="px-6 py-4 text-right">
                  <button className="text-neutral-500 hover:text-white transition-colors cursor-pointer">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}

            {(!members || members.length === 0) && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                  Nenhum membro ativo encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}