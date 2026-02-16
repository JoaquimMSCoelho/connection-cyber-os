"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- INJEÇÃO FUNCIONAL: PARSER DE DATAS (BR -> ISO) ---
// Converte "15/02/2026" para "2026-02-15" (Padrão Banco de Dados)
function parseDateBrToIso(dateStr: string | null | undefined): string | null {
  if (!dateStr || dateStr.length !== 10) return null;
  const [day, month, year] = dateStr.split('/');
  if (!day || !month || !year) return null;
  return `${year}-${month}-${day}`;
}

// --- AÇÃO 1: CRIAR NOVO MEMBRO (COM FOTO E VALIDAÇÃO) ---
export async function createMemberAction(formData: FormData) {
  const supabase = await createClient();

  // 1. Identificação e Pessoais
  const full_name = formData.get("full_name") as string;
  const birth_date = formData.get("birth_date") as string;
  const gender = formData.get("gender") as string;
  const civil_status = formData.get("civil_status") as string;
  const profession = formData.get("profession") as string;
  const photo_url = formData.get("photo_url") as string; // Link da Foto
  
  // 2. Contato e Origem
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const nationality_city = formData.get("nationality_city") as string;
  const nationality_state = formData.get("nationality_state") as string;
  const schooling = formData.get("schooling") as string;
  const origin_church = formData.get("origin_church") as string; // Restaurado

  // 3. Documentação
  const cpf = formData.get("cpf") as string;
  const rg = formData.get("rg") as string;
  const rg_issuer = formData.get("rg_issuer") as string;
  const rg_state = formData.get("rg_state") as string;

  // 4. Eclesiástico
  const role_id = formData.get("role_id") as string;
  const church_id = formData.get("church_id") as string;
  const ecclesiastical_status = formData.get("ecclesiastical_status") as string || "ACTIVE";
  const baptism_date = formData.get("baptism_date") as string; // Restaurado
  
  // 5. Familiares
  const spouse_name = formData.get("spouse_name") as string;
  const father_name = formData.get("father_name") as string;
  const mother_name = formData.get("mother_name") as string;
  const marriage_date = formData.get("marriage_date") as string; // Restaurado

  // 6. Endereço
  const zip_code = formData.get("zip_code") as string;
  const address = formData.get("address") as string;
  const number = formData.get("number") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;

  // 7. Financeiro
  const financial_status = formData.get("financial_status") as string || "PENDING";

  if (!full_name) {
    return { success: false, message: "Nome é obrigatório." };
  }

  // --- TRAVA 1: VALIDAÇÃO DE CPF DUPLICADO ---
  if (cpf && cpf.trim() !== "") {
    const { data: cpfExists } = await supabase.from("members").select("id").eq("cpf", cpf).single();
    if (cpfExists) {
      return { success: false, message: "Operação abortada: Este CPF já está cadastrado no sistema." };
    }
  }

  // --- LÓGICA DE MATRÍCULA (MANUAL VS AUTO) E TRAVA DE DUPLICIDADE ---
  let finalRegistrationNumber = formData.get("registration_number") as string;
  const isActive = ecclesiastical_status === 'ACTIVE';

  if (!finalRegistrationNumber || finalRegistrationNumber.trim() === "") {
    // Se veio vazio, chama o Gerador Automático
    const { data: novaMatricula, error: rpcError } = await supabase.rpc('get_next_matricula', { is_active: isActive });
    if (rpcError) {
      console.error("Erro ao gerar matrícula:", rpcError);
      return { success: false, message: "Falha ao gerar matrícula automática." };
    }
    finalRegistrationNumber = novaMatricula;
  } else {
    // Se digitou manual, verifica se a matrícula já existe no banco
    const { data: matExists } = await supabase.from("members").select("id").eq("registration_number", finalRegistrationNumber).single();
    if (matExists) {
      return { success: false, message: `Operação abortada: A Matrícula ${finalRegistrationNumber} já está em uso.` };
    }
  }

  const { error } = await supabase.from("members").insert({
    full_name,
    birth_date: parseDateBrToIso(birth_date), // INJEÇÃO FUNCIONAL (Tradução de Data)
    gender,
    civil_status,
    profession,
    photo_url, 
    email,
    phone,
    nationality_city,
    nationality_state,
    schooling,
    cpf,
    rg,
    rg_issuer,
    rg_state,
    role_id: role_id || null, 
    church_id: church_id || null,
    ecclesiastical_status,
    registration_number: finalRegistrationNumber, 
    spouse_name,
    father_name,
    mother_name,
    marriage_date: parseDateBrToIso(marriage_date), // INJEÇÃO FUNCIONAL (Tradução de Data)
    baptism_date: parseDateBrToIso(baptism_date),   // INJEÇÃO FUNCIONAL (Tradução de Data)
    origin_church,
    zip_code,
    address,
    number,
    neighborhood,
    city,
    state,
    financial_status,
    status: 'ACTIVE',
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Erro ao criar membro:", error);
    if (error.code === '23505') { // Captura da trava física do Banco de Dados
        return { success: false, message: "Erro: Matrícula ou CPF já existem no banco de dados." };
    }
    return { success: false, message: "Erro de banco de dados ao cadastrar membro." };
  }

  revalidatePath("/dashboard/membros");
  redirect("/dashboard/membros");
}

// --- AÇÃO 2: ATUALIZAR MEMBRO (COM FOTO E VALIDAÇÃO) ---
export async function updateMemberAction(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  
  if (!id) return { success: false, message: "ID obrigatório." };

  // Captura de TODOS os campos
  const full_name = formData.get("full_name") as string;
  const birth_date = formData.get("birth_date") as string;
  const gender = formData.get("gender") as string;
  const civil_status = formData.get("civil_status") as string;
  const profession = formData.get("profession") as string;
  const photo_url = formData.get("photo_url") as string; 
  
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const nationality_city = formData.get("nationality_city") as string;
  const nationality_state = formData.get("nationality_state") as string;
  const schooling = formData.get("schooling") as string;
  const origin_church = formData.get("origin_church") as string; // Restaurado

  const cpf = formData.get("cpf") as string;
  const rg = formData.get("rg") as string;
  const rg_issuer = formData.get("rg_issuer") as string;
  const rg_state = formData.get("rg_state") as string;
  
  const role_id = formData.get("role_id") as string;
  const church_id = formData.get("church_id") as string;
  const ecclesiastical_status = formData.get("ecclesiastical_status") as string;
  const baptism_date = formData.get("baptism_date") as string; // Restaurado
  
  const spouse_name = formData.get("spouse_name") as string;
  const father_name = formData.get("father_name") as string;
  const mother_name = formData.get("mother_name") as string;
  const marriage_date = formData.get("marriage_date") as string; // Restaurado
  
  const zip_code = formData.get("zip_code") as string;
  const address = formData.get("address") as string;
  const number = formData.get("number") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const financial_status = formData.get("financial_status") as string;

  // --- TRAVA 1: VALIDAÇÃO DE CPF DUPLICADO (Ignorando o próprio membro) ---
  if (cpf && cpf.trim() !== "") {
    const { data: cpfExists } = await supabase.from("members").select("id").eq("cpf", cpf).neq("id", id).single();
    if (cpfExists) {
      return { success: false, message: "Operação abortada: Este CPF já pertence a outro membro." };
    }
  }

  // --- LÓGICA DE MATRÍCULA E TRAVA DE DUPLICIDADE (Edição) ---
  let matriculaAtual = formData.get("registration_number") as string;

  if (!matriculaAtual || matriculaAtual.trim() === "") {
      // Se apagou a matrícula na tela, gera uma nova baseada no status atual
      const { data: novaMatricula } = await supabase.rpc('get_next_matricula', { is_active: ecclesiastical_status === 'ACTIVE' });
      if (novaMatricula) matriculaAtual = novaMatricula;
  } else if (matriculaAtual.startsWith('-') && ecclesiastical_status === 'ACTIVE') {
      // Transição de Inativo para Ativo (Converte matrícula negativa em definitiva)
      const { data: matriculaDefinitiva } = await supabase.rpc('get_next_matricula', { is_active: true });
      if (matriculaDefinitiva) matriculaAtual = matriculaDefinitiva;
  } else {
      // Se é uma matrícula digitada manualmente ou não mudou, verifica se já não pertence a outro
      const { data: matExists } = await supabase.from("members").select("id").eq("registration_number", matriculaAtual).neq("id", id).single();
      if (matExists) {
          return { success: false, message: `Operação abortada: A Matrícula ${matriculaAtual} já está em uso por outro membro.` };
      }
  }

  const { error } = await supabase
    .from("members")
    .update({
      full_name,
      birth_date: parseDateBrToIso(birth_date), // INJEÇÃO FUNCIONAL (Tradução de Data)
      gender,
      civil_status,
      profession,
      photo_url,
      email,
      phone,
      nationality_city,
      nationality_state,
      schooling,
      cpf,
      rg,
      rg_issuer,
      rg_state,
      role_id: role_id || null,
      church_id: church_id || null,
      ecclesiastical_status,
      registration_number: matriculaAtual, 
      spouse_name,
      father_name,
      mother_name,
      marriage_date: parseDateBrToIso(marriage_date), // INJEÇÃO FUNCIONAL (Tradução de Data)
      baptism_date: parseDateBrToIso(baptism_date),   // INJEÇÃO FUNCIONAL (Tradução de Data)
      origin_church,
      zip_code,
      address,
      number,
      neighborhood,
      city,
      state,
      financial_status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Erro ao atualizar:", error);
    if (error.code === '23505') { // Captura da trava física do Banco de Dados
        return { success: false, message: "Erro: Matrícula ou CPF já existem no banco de dados." };
    }
    return { success: false, message: "Erro de banco de dados ao atualizar dados." };
  }

  revalidatePath("/dashboard/membros");
  redirect("/dashboard/membros");
}

// --- AÇÃO 3: ARQUIVAR MEMBRO ---
export async function archiveMemberAction(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;

  if (!id) return { success: false, message: "ID obrigatório." };

  const { error } = await supabase
    .from("members")
    .update({
      status: 'ARCHIVED',
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Erro ao arquivar:", error);
    return { success: false, message: "Erro ao arquivar membro." };
  }

  revalidatePath("/dashboard/membros");
  redirect("/dashboard/membros");
}

// --- AÇÃO 4: RESTAURAR MEMBRO ---
export async function restoreMemberAction(formData: FormData) {
    const supabase = await createClient();
    const id = formData.get("id") as string;
  
    if (!id) return { success: false, message: "ID obrigatório." };
  
    const { error } = await supabase
      .from("members")
      .update({
        status: 'ACTIVE',
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);
  
    if (error) {
      console.error("Erro ao restaurar:", error);
      return { success: false, message: "Erro ao restaurar membro." };
    }
  
    revalidatePath("/dashboard/membros");
    redirect("/dashboard/membros");
}

// --- AÇÃO 5: CONSULTAR PRÓXIMA MATRÍCULA (UX MAGIC BUTTON) ---
export async function getNextRegistrationNumberAction(isActive: boolean) {
  const supabase = await createClient();
  
  // Chama a função RPC (Procedure) que já criamos no banco de dados
  const { data: nextMatricula, error } = await supabase.rpc('get_next_matricula', { is_active: isActive });
  
  if (error) {
    console.error("Erro ao buscar próxima matrícula:", error);
    return { success: false, message: "Erro ao gerar número.", data: null };
  }
  
  return { success: true, data: nextMatricula };
}