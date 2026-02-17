"use client";

import { useEffect, useState, useRef } from "react";
import { X, Clock, Loader2, ArrowRight, ShieldAlert, CheckCircle2, UserPlus, BookOpen, Printer, FileText, User, MapPin, Phone, Hash, ChevronDown } from "lucide-react";
import { getMemberTimelineAction } from "@/app/dashboard/membros/actions";

interface MemberTimelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;
  memberName: string;
}

type PrintMode = 'FICHA' | 'DOSSIE' | 'AMBOS' | null;

export default function MemberTimelineModal({ isOpen, onClose, memberId, memberName }: MemberTimelineModalProps) {
  const [events, setEvents] = useState<any[]>([]);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'FICHA' | 'DOSSIE'>('FICHA');
  
  // Estados do Motor PDF Inteligente
  const [printMenuOpen, setPrintMenuOpen] = useState(false);
  const [printMode, setPrintMode] = useState<PrintMode>(null);

  useEffect(() => {
    if (isOpen && memberId) {
      setLoading(true);
      setActiveTab('FICHA');
      setPrintMenuOpen(false);
      getMemberTimelineAction(memberId).then((res) => {
        if (res.success && res.data) {
          setProfile(res.data.profile);
          setEvents(res.data.timeline);
        }
        setLoading(false);
      });
    }
  }, [isOpen, memberId]);

  if (!isOpen) return null;

  const getEventStyle = (type: string) => {
    switch (type) {
      case 'CRIACAO': return { icon: <UserPlus className="w-4 h-4 text-emerald-500" />, bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
      case 'MUDANCA_CARGO': return { icon: <ArrowRight className="w-4 h-4 text-blue-500" />, bg: "bg-blue-500/10", border: "border-blue-500/20" };
      case 'TRANSFERENCIA': return { icon: <ArrowRight className="w-4 h-4 text-purple-500" />, bg: "bg-purple-500/10", border: "border-purple-500/20" };
      case 'ALTERACAO_STATUS': return { icon: <ShieldAlert className="w-4 h-4 text-yellow-500" />, bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
      case 'FORMACAO': return { icon: <BookOpen className="w-4 h-4 text-pink-500" />, bg: "bg-pink-500/10", border: "border-pink-500/20" };
      default: return { icon: <CheckCircle2 className="w-4 h-4 text-neutral-400" />, bg: "bg-neutral-800", border: "border-neutral-700" };
    }
  };

  const formatDate = (isoString: string) => {
    if (!isoString) return "---";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' }).format(date);
  };

  const formatDateTime = (isoString: string) => {
    if (!isoString) return "---";
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  };

  // MOTOR PDF INTELIGENTE: Modela a tela, espera 300ms e aciona a impressão.
  const handlePrint = (mode: PrintMode) => {
    setPrintMode(mode);
    setPrintMenuOpen(false);
    
    // O Timeout é essencial para o React renderizar as divs ocultas antes de chamar a janela do Windows.
    setTimeout(() => {
      window.print();
      setPrintMode(null); // Devolve o layout ao normal após a janela fechar
    }, 300);
  };

  return (
    <>
      {/* CSS DE IMPRESSÃO - Controlado pelo estado 'printMode' */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; color: black !important; }
          #print-area { 
            position: absolute; left: 0; top: 0; 
            width: 100%; max-width: 100% !important; 
            height: auto !important; max-height: none !important;
            background: white !important; 
            box-shadow: none !important; 
            border: none !important; 
            border-radius: 0 !important;
            padding: 0 !important;
          }
          .no-print { display: none !important; }
          .print-border { border-color: #ddd !important; }
          .print-bg { background: #f9f9f9 !important; }
          .page-break { page-break-before: always; margin-top: 40px; padding-top: 40px; border-top: 1px solid #ccc; }
          
          /* Remove barras de rolagem ao imprimir */
          .overflow-y-auto { overflow: visible !important; }
        }
      `}</style>

      {/* Overlay escuro de fundo */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] transition-opacity no-print flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        {/* SUPER MODAL CENTRALIZADO (Impede o clique de fechar o fundo se clicar dentro dele) */}
        <div 
          id="print-area"
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-5xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl z-[1000] flex flex-col animate-in zoom-in-95 duration-200 max-h-[95vh]"
        >
          
          {/* HEADER DO MODAL E MOTOR DE IMPRESSÃO */}
          <div className="flex items-center justify-between p-6 border-b border-neutral-800 bg-neutral-950/50 rounded-t-2xl print-bg print-border">
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-500 no-print" />
                Relatório Eclesiástico
              </h2>
              <p className="text-sm text-neutral-400 mt-1">
                Documento Oficial de Consulta
              </p>
            </div>
            
            <div className="flex items-center gap-3 no-print relative">
              
              {/* DROPDOWN DE IMPRESSÃO */}
              <div className="relative">
                <button 
                  onClick={() => setPrintMenuOpen(!printMenuOpen)} 
                  className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white rounded-lg transition-colors text-sm font-medium"
                >
                  <Printer className="w-4 h-4 text-emerald-500" /> Exportar PDF <ChevronDown className="w-4 h-4 opacity-50" />
                </button>

                {printMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-neutral-800 border border-neutral-700 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <button onClick={() => handlePrint('FICHA')} className="w-full text-left px-4 py-3 text-sm text-white hover:bg-neutral-700 transition-colors flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-500" /> Somente Ficha
                    </button>
                    <button onClick={() => handlePrint('DOSSIE')} className="w-full text-left px-4 py-3 text-sm text-white hover:bg-neutral-700 transition-colors flex items-center gap-2 border-t border-neutral-700/50">
                      <Clock className="w-4 h-4 text-cyan-500" /> Somente Dossiê
                    </button>
                    <button onClick={() => handlePrint('AMBOS')} className="w-full text-left px-4 py-3 text-sm text-white hover:bg-neutral-700 transition-colors flex items-center gap-2 border-t border-neutral-700/50 bg-emerald-500/10 hover:bg-emerald-500/20">
                      <FileText className="w-4 h-4 text-emerald-500" /> Relatório Completo
                    </button>
                  </div>
                )}
              </div>

              <div className="w-px h-6 bg-neutral-800 mx-1"></div>
              
              <button onClick={onClose} className="p-2 text-neutral-500 hover:text-red-500 hover:bg-neutral-800 rounded-lg transition-colors" title="Fechar Janela">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* NAVEGAÇÃO DE ABAS */}
          <div className="flex border-b border-neutral-800 px-8 pt-4 gap-8 no-print bg-neutral-900">
            <button 
              onClick={() => setActiveTab('FICHA')}
              className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'FICHA' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-neutral-500 hover:text-neutral-300'}`}
            >
              <User className="w-4 h-4" /> Ficha Cadastral do Membro
            </button>
            <button 
              onClick={() => setActiveTab('DOSSIE')}
              className={`pb-4 text-sm font-bold border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'DOSSIE' ? 'border-emerald-500 text-emerald-500' : 'border-transparent text-neutral-500 hover:text-neutral-300'}`}
            >
              <Clock className="w-4 h-4" /> Histórico e Alterações
            </button>
          </div>

          {/* CORPO DE DADOS SCROLLÁVEL */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-neutral-950/30 rounded-b-2xl">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3 text-neutral-500 no-print">
                <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
                <p className="text-sm font-medium">Extraindo dados e consolidando Ficha...</p>
              </div>
            ) : (
              <>
                {/* ========================================================= */}
                {/* ABA 1: A NOVA FICHA CADASTRAL (Grid Espelhado do Cadastro)  */}
                {/* ========================================================= */}
                {/* A lógica a seguir obedece ao motor PDF: Fica vísivel se a Aba Ficha está ativa, ou se mandamos imprimir a Ficha, ou se mandamos imprimir Ambos */}
                <div className={`${activeTab === 'FICHA' || printMode === 'FICHA' || printMode === 'AMBOS' ? 'block' : 'hidden no-print'}`}>
                  
                  {/* CABEÇALHO DA FICHA (Mapeando o Visual Enterprise) */}
                  <div className="grid grid-cols-12 gap-6 items-center mb-8 bg-neutral-900/50 p-6 rounded-2xl border border-neutral-800 print-bg print-border">
                    <div className="col-span-12 md:col-span-9 flex flex-col gap-2">
                      <h1 className="text-3xl font-black text-white uppercase tracking-tight">{profile?.full_name}</h1>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs px-3 py-1 rounded-full uppercase font-bold flex items-center gap-1 print-border">
                          {profile?.role_name}
                        </span>
                        <span className="text-neutral-400 text-sm font-medium flex items-center gap-1 border-l border-neutral-700 pl-3">
                          <Hash className="w-4 h-4 text-emerald-500"/> Matrícula: <strong className="text-white ml-1">{profile?.registration_number}</strong>
                        </span>
                        <span className="text-neutral-400 text-sm font-medium flex items-center gap-1 border-l border-neutral-700 pl-3">
                          <Clock className="w-4 h-4 text-emerald-500"/> Batizado em: <strong className="text-white ml-1">{formatDate(profile?.baptism_date)}</strong>
                        </span>
                      </div>
                    </div>
                    
                    {/* FOTO À DIREITA */}
                    <div className="col-span-12 md:col-span-3 flex justify-end">
                      {profile?.photo_url ? (
                        <img src={profile.photo_url} alt="Foto" className="w-32 h-32 rounded-xl object-cover border-[3px] border-neutral-800 shadow-xl print-border" />
                      ) : (
                        <div className="w-32 h-32 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-500 border-[3px] border-neutral-700 border-dashed print-border">
                          <div className="flex flex-col items-center gap-1"><User className="w-8 h-8" /><span className="text-[10px] uppercase font-bold">Sem Foto</span></div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BLOCOS DE DADOS EM GRID (Igual a Tela de Edição) */}
                  <div className="space-y-6">
                    
                    {/* BLOCO: Pessoais e Familiares */}
                    <div>
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 mb-4 border-b border-neutral-800 print-border">
                        <User className="w-4 h-4 text-emerald-500" /> Dados Pessoais e Documentação
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-neutral-900 border border-neutral-800 p-5 rounded-xl print-bg print-border">
                        <div><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">CPF</p><p className="font-medium text-white">{profile?.cpf || "---"}</p></div>
                        <div><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">RG</p><p className="font-medium text-white">{profile?.rg ? `${profile.rg} ${profile.rg_issuer}-${profile.rg_state}` : "---"}</p></div>
                        <div><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Data Nasc.</p><p className="font-medium text-white">{formatDate(profile?.birth_date)}</p></div>
                        <div><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Sexo</p><p className="font-medium text-white">{profile?.gender || "---"}</p></div>
                        
                        <div><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Estado Civil</p><p className="font-medium text-white">{profile?.civil_status || "---"}</p></div>
                        <div className="col-span-2"><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Naturalidade</p><p className="font-medium text-white">{profile?.nationality_city ? `${profile.nationality_city}/${profile.nationality_state}` : "---"}</p></div>
                        <div><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Escolaridade</p><p className="font-medium text-white">{profile?.schooling || "---"}</p></div>

                        <div className="col-span-2"><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Profissão</p><p className="font-medium text-white">{profile?.profession || "---"}</p></div>
                        <div className="col-span-2"><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Cônjuge</p><p className="font-medium text-white">{profile?.spouse_name || "---"}</p></div>
                        
                        <div className="col-span-2"><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Nome da Mãe</p><p className="font-medium text-white">{profile?.mother_name || "---"}</p></div>
                        <div className="col-span-2"><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Nome do Pai</p><p className="font-medium text-white">{profile?.father_name || "---"}</p></div>
                      </div>
                    </div>

                    {/* BLOCO: Contato e Endereço */}
                    <div>
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 mb-4 border-b border-neutral-800 print-border">
                        <MapPin className="w-4 h-4 text-emerald-500" /> Contato e Endereço
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-neutral-900 border border-neutral-800 p-5 rounded-xl print-bg print-border">
                        <div><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Telefone / WhatsApp</p><p className="font-medium text-white">{profile?.phone || "---"}</p></div>
                        <div className="col-span-3"><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">E-mail</p><p className="font-medium text-white">{profile?.email || "---"}</p></div>
                        
                        <div className="col-span-4"><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Endereço Completo</p>
                          <p className="font-medium text-neutral-300">
                            {profile?.address ? `${profile.address}, ${profile.number} - ${profile.neighborhood}, ${profile.city}/${profile.state} - CEP: ${profile.zip_code}` : "Não cadastrado"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* BLOCO: Institucional */}
                    <div>
                      <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 mb-4 border-b border-neutral-800 print-border">
                        <BookOpen className="w-4 h-4 text-emerald-500" /> Histórico Eclesiástico
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-neutral-900 border border-neutral-800 p-5 rounded-xl print-bg print-border">
                        <div className="col-span-2"><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Igreja de Origem (Anterior)</p><p className="font-medium text-white">{profile?.origin_church || "---"}</p></div>
                        <div><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Situação Financeira</p><p className="font-medium text-white">{profile?.financial_status === 'UP_TO_DATE' ? "Em Dia" : "Pendente"}</p></div>
                        <div className="col-span-3"><p className="text-neutral-500 text-[10px] uppercase font-bold mb-1">Congregação Atual Atribuída</p><p className="font-bold text-emerald-500 text-lg">{profile?.church_name}</p></div>
                      </div>
                    </div>

                  </div>
                </div>

                {/* ========================================================= */}
                {/* ABA 2: O DOSSIÊ (LINHA DO TEMPO) */}
                {/* ========================================================= */}
                {/* Se a impressão for 'AMBOS', aplicamos o 'page-break' para o Dossiê cair na Página 2 de forma limpa. */}
                <div className={`${activeTab === 'DOSSIE' || printMode === 'DOSSIE' || printMode === 'AMBOS' ? 'block' : 'hidden no-print'} ${printMode === 'AMBOS' ? 'page-break' : ''}`}>
                  
                  {/* Título de Separação na Impressão (Apenas visível no papel) */}
                  <div className="hidden print:flex items-center gap-3 pb-4 mb-8 border-b-2 border-black">
                    <Clock className="w-6 h-6 text-black" />
                    <div>
                      <h3 className="text-xl font-black uppercase text-black">Dossiê Eclesiástico - Linha do Tempo</h3>
                      <p className="text-sm text-gray-600 font-bold mt-1">Membro: {profile?.full_name} | Matrícula: {profile?.registration_number}</p>
                    </div>
                  </div>

                  {events.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-2 text-neutral-500 text-center">
                      <Clock className="w-12 h-12 opacity-20" />
                      <p className="text-base font-medium text-neutral-400">Nenhum evento registrado no histórico.</p>
                      <p className="text-xs">Alterações de cargo, status ou igreja aparecerão aqui.</p>
                    </div>
                  ) : (
                    <div className="relative border-l-2 border-neutral-800 ml-4 space-y-10 py-6 print-border">
                      {events.map((event) => {
                        const style = getEventStyle(event.event_type);
                        return (
                          <div key={event.id} className="relative pl-8">
                            {/* Ponto / Ícone da Linha */}
                            <div className={`absolute -left-5 top-0 w-10 h-10 rounded-full border-4 border-neutral-900 bg-neutral-900 flex items-center justify-center shadow-lg print-bg print-border z-10`}>
                              {style.icon}
                            </div>
                            
                            {/* Conteúdo do Evento */}
                            <div className="flex flex-col gap-2 pt-1">
                              <span className="text-xs font-black text-neutral-500 uppercase tracking-wider flex items-center gap-2">
                                {formatDateTime(event.created_at)}
                                <span className={`px-2 py-0.5 rounded text-[9px] ${style.bg} ${style.border} border`}>{event.event_type}</span>
                              </span>
                              <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-xl shadow-md print-bg print-border">
                                <p className="text-base text-neutral-200 leading-relaxed font-medium">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}