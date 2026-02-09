"use client";

import Link from "next/link";
import { Save, Loader2, PlusCircle, ArrowLeft } from "lucide-react";
import { useFormStatus } from "react-dom";
import { useState } from "react";
// FUSÃO TÉCNICA: Importamos a ação real do servidor
import { createMember } from "./actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-800 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-lg shadow-emerald-900/20"
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
      {pending ? "Salvando..." : "Salvar Membro"}
    </button>
  );
}

// Interfaces
interface Role { id: string; name: string; }
interface Sector { id: string; name: string; }
interface Church { id: string; name: string; sector_id: string; }

export function MemberForm({ roles, sectors, churches }: { roles: Role[], sectors: Sector[], churches: Church[] }) {
  
  const [selectedSector, setSelectedSector] = useState<string>("");

  const filteredChurches = churches.filter(church => church.sector_id === selectedSector);

  // NOTA DE ARQUITETURA: 
  // Removemos o 'handleSubmit' local (console.log).
  // O form agora aponta diretamente para 'createMember' no servidor.

  return (
    // FUSÃO TÉCNICA: Action conectada
    <form action={createMember} className="space-y-8 max-w-4xl w-full">
      
      {/* HEADER */}
      <div className="flex items-center justify-between w-full mb-8">
         <Link 
            href="/dashboard/membros" 
            className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para Lista
          </Link>
          <h2 className="text-lg font-medium text-white">Novo Membro</h2>
      </div>

      {/* SUB-HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-neutral-800 pb-6 gap-4">
        <div className="flex items-baseline gap-4">
          <h2 className="text-lg font-medium text-white">Dados Cadastrais</h2>
          <p className="text-sm text-neutral-400">Preencha os dados eclesiásticos.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link href="/dashboard/membros" className="px-4 py-2.5 text-sm font-medium text-neutral-400 hover:text-white transition-colors">
            Cancelar
          </Link>
          <SubmitButton />
        </div>
      </div>

      {/* GRADE DE CAMPOS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* NOME (9) + STATUS (3) */}
        <div className="col-span-12 md:col-span-9">
          <input type="text" name="full_name" required placeholder="Nome Completo" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
        </div>
        <div className="col-span-12 md:col-span-3">
           <div className="relative">
            <select name="status" defaultValue="ACTIVE" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white appearance-none focus:ring-1 focus:ring-emerald-500 outline-none transition-all cursor-pointer">
              <option value="ACTIVE">Ativo</option>
              <option value="INACTIVE">Inativo</option>
            </select>
             <div className="absolute right-4 top-3.5 pointer-events-none text-neutral-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
          </div>
        </div>

        {/* SETOR (6) + IGREJA (6) */}
        <div className="col-span-12 md:col-span-6">
          <div className="relative">
            <select
              name="sector_id"
              required
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white appearance-none focus:ring-1 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
            >
              <option value="" disabled>Selecionar Setor...</option>
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>{sector.name}</option>
              ))}
            </select>
            <div className="absolute right-4 top-3.5 pointer-events-none text-neutral-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6">
          <div className="relative">
            <select
              name="church_id"
              required
              defaultValue=""
              disabled={!selectedSector}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white appearance-none focus:ring-1 focus:ring-emerald-500 outline-none transition-all cursor-pointer disabled:opacity-50"
            >
              {!selectedSector ? (
                <option value="" disabled>Selecione o Setor primeiro</option>
              ) : filteredChurches.length === 0 ? (
                <option value="" disabled>Nenhuma igreja neste setor</option>
              ) : (
                <option value="" disabled>Selecionar Igreja...</option>
              )}
              
              {filteredChurches.map((church) => (
                <option key={church.id} value={church.id}>{church.name}</option>
              ))}
            </select>
            <div className="absolute right-4 top-3.5 pointer-events-none text-neutral-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
          </div>
        </div>

        {/* EMAIL (6) + TELEFONE (6) */}
        <div className="col-span-12 md:col-span-6">
          <input type="email" name="email" placeholder="E-mail" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
        </div>
        <div className="col-span-12 md:col-span-6">
          <input type="tel" name="phone" placeholder="Telefone / WhatsApp" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white placeholder:text-neutral-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all" />
        </div>

        {/* CARGO (12) */}
        <div className="col-span-12">
          <div className="flex gap-2">
            <div className="relative w-full">
              <select name="role_id" required defaultValue="" className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white appearance-none focus:ring-1 focus:ring-emerald-500 outline-none transition-all cursor-pointer">
                <option value="" disabled>Selecionar Cargo...</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.name}</option>
                ))}
              </select>
              <div className="absolute right-4 top-3.5 pointer-events-none text-neutral-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></div>
            </div>
            <button type="button" className="bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white px-4 rounded-lg border border-neutral-700">
              <PlusCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </form>
  );
}