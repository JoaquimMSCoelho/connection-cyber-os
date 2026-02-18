"use client";

import { useState } from "react";
import { CalendarPlus, ArrowRight } from "lucide-react";
import DashboardCardBase from "./DashboardCardBase"; // <-- Import do Molde Oficial

export default function OccurrenceSchedulerCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <DashboardCardBase
        icon={<CalendarPlus className="w-7 h-7" />}
        title="AGENDAMENTO"
        subtitle="Lançamento de ocorrência"
        theme="blue"
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-blue-600/10 hover:bg-blue-600/20 border border-blue-600/30 text-blue-500 p-3 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm font-bold shadow-md"
          title="Abrir formulário de ocorrência"
        >
          OCORRÊNCIAS <ArrowRight className="w-4 h-4" />
        </button>
      </DashboardCardBase>

      {/* SKELETON DO MODAL PRESERVADO PARA A FASE 4 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-center justify-center p-4 sm:p-6 transition-opacity">
          <div className="w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-10 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-200">
            <CalendarPlus className="w-16 h-16 text-blue-500 mb-4 opacity-50" />
            <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-widest">Modal de Ocorrência</h2>
            <p className="text-neutral-400 mb-8 font-medium">A interface de preenchimento inteligente será injetada aqui na Fase 4.</p>
            <button onClick={() => setIsModalOpen(false)} className="bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-lg">
              Fechar Janela (Aguardando Fase 4)
            </button>
          </div>
        </div>
      )}
    </>
  );
}