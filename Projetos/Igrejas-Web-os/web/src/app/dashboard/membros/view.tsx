"use client";

import { User, Search, MapPin, Loader2, Archive, RefreshCcw, MoreHorizontal, Plus, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function MembersView() {
  // --- ESTADOS ---
  const [viewMode, setViewMode] = useState<'ACTIVE' | 'ARCHIVED'>('ACTIVE');
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
  
  // Filtro de Texto Simples (Busca)
  const [search, setSearch] = useState("");

  // --- BUSCA DE DADOS ---
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const supabase = createClient();

      const targetStatus = viewMode === 'ACTIVE' ? 'ACTIVE' : 'ARCHIVED';
      
      // Query corrigida: Busca full_name e relacionamento com ecclesiastical_roles
      const { data: membersData } = await supabase
        .from("members")
        .select(`
            *,
            churches ( name ),
            ecclesiastical_roles ( name ) 
        `)
        .eq("status", targetStatus) 
        .order("full_name", { ascending: true });

      if (membersData) setMembers(membersData);
      setLoading(false);
    }
    fetchData();
  }, [viewMode]);

  // --- FILTRAGEM ---
  const filteredMembers = members.filter((member) => {
    const memberName = member.full_name || "";
    return search ? memberName.toLowerCase().includes(search.toLowerCase()) : true;
  });

  // --- RENDERIZAÇÃO ---
  if (loading) {
    return (
        <div className="flex justify-center py-20">
            <Loader2 className={`w-8 h-8 animate-spin ${viewMode === 'ACTIVE' ? "text-emerald-500" : "text-red-500"}`} />
        </div>
    );
  }

  const themeBorder = viewMode === 'ACTIVE' ? "border-neutral-800" : "border-red-900/50";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. CABEÇALHO E CONTROLES */}
      <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
        <div>
          <h1 className={`text-2xl font-bold ${viewMode === 'ACTIVE' ? "text-white" : "text-red-500"} tracking-tight`}>
            {viewMode === 'ACTIVE' ? "Gestão de Membros" : "Arquivo Morto (Membros)"}
          </h1>
          <p className="text-neutral-400">
            {viewMode === 'ACTIVE' ? "Gerencie os membros ativos da congregação." : "Histórico de membros excluídos/inativos."}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
            {/* Toggle Arquivo Morto (VERMELHO FIXO) */}
            <button
                onClick={() => setViewMode(viewMode === 'ACTIVE' ? 'ARCHIVED' : 'ACTIVE')}
                className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium transition-all border
                    bg-red-950/10 text-red-500 border-red-900/30 hover:bg-red-900/30 hover:text-red-400 hover:border-red-900/50
                    ${viewMode === 'ARCHIVED' ? "shadow-[0_0_15px_rgba(220,38,38,0.2)] bg-red-900/20" : ""} 
                `}
            >
                {viewMode === 'ARCHIVED' ? <RefreshCcw className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
                {viewMode === 'ARCHIVED' ? "Voltar para Ativos" : "Arquivo Morto"}
            </button>

            {/* Botão Novo Membro (Apenas no modo Ativo) */}
            {viewMode === 'ACTIVE' && (
                <Link 
                href="/dashboard/membros/novo"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-emerald-900/20"
                >
                <Plus className="w-4 h-4" />
                Novo Membro
                </Link>
            )}
        </div>
      </div>

      {/* 2. BARRA DE BUSCA (Estilo Original) */}
      <div className={`flex items-center gap-4 bg-neutral-900/50 p-1 rounded-xl border ${themeBorder} w-full max-w-md transition-colors`}>
        <div className="pl-3 text-neutral-500">
          <Search className="w-4 h-4" />
        </div>
        <input 
          type="text" 
          placeholder={viewMode === 'ACTIVE' ? "Buscar membro ativo..." : "Buscar no arquivo morto..."} 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none text-sm text-neutral-200 placeholder-neutral-600 w-full focus:ring-0 outline-none"
        />
      </div>

      {/* 3. TABELA DE DADOS (Restaurada do Original) */}
      <div className={`border ${themeBorder} rounded-xl overflow-hidden bg-neutral-900/30 transition-colors`}>
        <table className="w-full text-left text-sm">
          <thead className={`bg-neutral-900 border-b ${themeBorder}`}>
            <tr>
              <th className="px-6 py-4 font-medium text-neutral-400">Nome Completo</th>
              <th className="px-6 py-4 font-medium text-neutral-400">Função</th>
              <th className="px-6 py-4 font-medium text-neutral-400">Situação</th>
              <th className="px-6 py-4 font-medium text-neutral-400">Contato</th>
              <th className="px-6 py-4 font-medium text-neutral-400 text-right">Ações</th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-neutral-800">
            {filteredMembers.map((member) => (
              <tr key={member.id} className="group hover:bg-neutral-800/30 transition-colors">
                
                {/* Coluna Nome */}
                <td className="px-6 py-4">
                  <Link href={`/dashboard/membros/editar/${member.id}`} className="block w-full">
                    <div className="flex items-center gap-3 cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400 border border-neutral-700 group-hover:border-emerald-500/50 group-hover:text-emerald-500 transition-colors">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-medium ${viewMode === 'ACTIVE' ? 'text-neutral-200 group-hover:text-emerald-400' : 'text-neutral-400 group-hover:text-red-400'} transition-colors`}>
                          {member.full_name}
                        </div>
                        <div className="text-xs text-neutral-500">{member.email || "Sem e-mail"}</div>
                      </div>
                    </div>
                  </Link>
                </td>

                {/* Coluna Função */}
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-neutral-800 text-neutral-400 border-neutral-700">
                    {member.ecclesiastical_roles?.name || "Sem Cargo"}
                  </span>
                </td>

                {/* Coluna Situação Financeira */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {member.financial_status === 'UP_TO_DATE' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" />
                        Em Dia
                      </span>
                    ) : (
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
                  <Link href={`/dashboard/membros/editar/${member.id}`}>
                    <button className="text-neutral-500 hover:text-white transition-colors cursor-pointer p-2 hover:bg-neutral-800 rounded-md">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </Link>
                </td>
              </tr>
            ))}

            {filteredMembers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                  {viewMode === 'ACTIVE' 
                    ? "Nenhum membro ativo encontrado." 
                    : "O Arquivo Morto está vazio."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}