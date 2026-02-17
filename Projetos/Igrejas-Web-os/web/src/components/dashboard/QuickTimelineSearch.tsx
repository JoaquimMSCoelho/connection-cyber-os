"use client";

import { useState } from "react";
import { Search, Loader2, History, AlertCircle } from "lucide-react";
import { getMemberByMatriculaWithTimelineAction } from "@/app/dashboard/membros/actions";
import MemberTimelineModal from "@/components/dashboard/MemberTimelineModal";

export default function QuickTimelineSearch() {
  const [matriculaInput, setMatriculaInput] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isSearchingTimeline, setIsSearchingTimeline] = useState(false);

  // Estados de controle do Modal
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [selectedMemberName, setSelectedMemberName] = useState("");

  const handleSearchTimeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matriculaInput.trim()) return;

    setIsSearchingTimeline(true);
    setSearchError("");

    // Consome a Ação 7 Enriquecida do Backend
    const result = await getMemberByMatriculaWithTimelineAction(matriculaInput.trim());

    if (!result.success) {
      setSearchError(result.message || "Matrícula não encontrada.");
    } else if (result.data && result.data.profile) {
      // Repassa os dados básicos para o Modal (Por enquanto. No Vetor 3 passaremos tudo)
      setSelectedMemberId(result.data.profile.id);
      setSelectedMemberName(result.data.profile.full_name || result.data.profile.name);

      setMatriculaInput("");
      setIsTimelineOpen(true);
    }
    setIsSearchingTimeline(false);
  };

  return (
    <>
      <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-2xl relative overflow-hidden group hover:border-emerald-500/30 transition-colors flex flex-col justify-between h-full shadow-lg">
        {/* Efeito Visual de Fundo */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-12 -mt-12 group-hover:bg-emerald-500/10 transition-colors" />

        {/* Cabeçalho do Card */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-neutral-800 rounded-xl text-emerald-500">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Dossiê Rápido</h3>
            <p className="text-[10px] text-neutral-400">Busca por Matrícula</p>
          </div>
        </div>

        {/* Input e Botão Alinhados ao fundo */}
        <form onSubmit={handleSearchTimeline} className="relative mt-auto">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Ex: 52591"
                value={matriculaInput}
                onChange={(e) => {
                  setMatriculaInput(e.target.value);
                  if (searchError) setSearchError("");
                }}
                className={`w-full bg-neutral-950 border rounded-lg py-2.5 px-3 text-sm text-white focus:outline-none transition-colors ${searchError ? 'border-red-500 focus:border-red-500' : 'border-neutral-800 focus:border-emerald-500'}`}
              />
            </div>
            <button
              type="submit"
              disabled={isSearchingTimeline || !matriculaInput.trim()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-lg transition-colors disabled:opacity-50 shadow-md shadow-emerald-900/20"
              title="Buscar Histórico"
            >
              {isSearchingTimeline ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            </button>
          </div>
          {searchError && (
            <span className="absolute -bottom-5 left-1 text-red-500 text-[10px] font-bold flex items-center gap-1">
              <AlertCircle className="w-3 h-3" /> {searchError}
            </span>
          )}
        </form>
      </div>

      {/* Renderização do Dossiê na tela inicial */}
      <MemberTimelineModal
        isOpen={isTimelineOpen}
        onClose={() => setIsTimelineOpen(false)}
        memberId={selectedMemberId}
        memberName={selectedMemberName}
      />
    </>
  );
}