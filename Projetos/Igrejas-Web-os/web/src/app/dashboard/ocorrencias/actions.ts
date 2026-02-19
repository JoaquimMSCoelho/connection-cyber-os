"use server";

import { createClient } from "@/utils/supabase/server";

// 1. Busca as categorias ativas para preencher a caixa de seleção do formulário
export async function getOccurrenceTypesListAction() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("occurrence_types")
    .select("*")
    .order("category", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.error("Erro ao buscar tipos de ocorrência:", error);
    return { success: false, data: [] };
  }
  return { success: true, data: data || [] };
}

// 2. Registra o fato no banco de dados mantendo a Trilha de Auditoria (DUAL WRITE)
export async function registerMemberOccurrenceAction(payload: {
  member_id: string;
  occurrence_type_id: string;
  occurrence_date: string;
  happened_in_current_church: boolean;
  observation: string;
}) {
  const supabase = await createClient();
  
  // Ação 1: Salva o dado oficial estatístico na tabela de Ocorrências
  const { error: occurrenceError } = await supabase
    .from("member_occurrences")
    .insert([{
      member_id: payload.member_id,
      occurrence_type_id: payload.occurrence_type_id,
      occurrence_date: payload.occurrence_date,
      happened_in_current_church: payload.happened_in_current_church,
      observation: payload.observation
    }]);

  if (occurrenceError) {
    console.error("Erro ao registrar ocorrência:", occurrenceError);
    return { success: false, message: occurrenceError.message };
  }

  // Ação 2: (ESCRITA DUPLA NO HISTÓRICO)
  // ZERO ALUCINAÇÃO: Bloco preparado. Descomentaremos quando o nome da tabela de timeline for fornecido.
  /*
  const { error: timelineError } = await supabase
    .from("NOME_DA_SUA_TABELA_DE_TIMELINE") // Ex: member_timeline
    .insert([{
      member_id: payload.member_id,
      title: "Nova Ocorrência", 
      description: payload.observation,
      created_at: new Date().toISOString()
    }]);
  */
  
  return { success: true };
}

// 3. INJEÇÃO FUNCIONAL: Busca as ocorrências cadastradas em um período (Para a aba LISTAGEM)
export async function getOccurrencesByPeriodAction(startDate: string, endDate: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from("member_occurrences")
    .select(`
      id,
      occurrence_date,
      happened_in_current_church,
      observation,
      created_at,
      occurrence_types (name, category),
      members (full_name, matricula)
    `)
    .gte("occurrence_date", startDate)
    .lte("occurrence_date", endDate)
    .order("occurrence_date", { ascending: false });

  if (error) {
    console.error("Erro ao buscar listagem de ocorrências:", error);
    return { success: false, data: [] };
  }
  return { success: true, data: data || [] };
}