"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// --- AÇÃO 1: CRIAR NOVO MEMBRO (COM FOTO) ---
export async function createMemberAction(formData: FormData) {
  const supabase = await createClient();

  // 1. Identificação e Pessoais
  const full_name = formData.get("full_name") as string;
  const birth_date = formData.get("birth_date") as string;
  const gender = formData.get("gender") as string;
  const civil_status = formData.get("civil_status") as string;
  const profession = formData.get("profession") as string;
  const photo_url = formData.get("photo_url") as string; // NOVO: Link da Foto
  
  // 2. Contato e Origem
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const nationality_city = formData.get("nationality_city") as string;
  const nationality_state = formData.get("nationality_state") as string;
  const schooling = formData.get("schooling") as string;

  // 3. Documentação
  const cpf = formData.get("cpf") as string;
  const rg = formData.get("rg") as string;
  const rg_issuer = formData.get("rg_issuer") as string;
  const rg_state = formData.get("rg_state") as string;

  // 4. Eclesiástico
  const role_id = formData.get("role_id") as string;
  const church_id = formData.get("church_id") as string;
  const ecclesiastical_status = formData.get("ecclesiastical_status") as string || "ACTIVE";
  
  // 5. Familiares
  const spouse_name = formData.get("spouse_name") as string;
  const father_name = formData.get("father_name") as string;
  const mother_name = formData.get("mother_name") as string;

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

  const { error } = await supabase.from("members").insert({
    full_name,
    birth_date,
    gender,
    civil_status,
    profession,
    photo_url, // Gravando foto
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
    spouse_name,
    father_name,
    mother_name,
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
    return { success: false, message: "Erro ao cadastrar membro." };
  }

  revalidatePath("/dashboard/membros");
  redirect("/dashboard/membros");
}

// --- AÇÃO 2: ATUALIZAR MEMBRO (COM FOTO) ---
export async function updateMemberAction(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get("id") as string;
  
  // Captura de TODOS os campos incluindo FOTO
  const full_name = formData.get("full_name") as string;
  const birth_date = formData.get("birth_date") as string;
  const gender = formData.get("gender") as string;
  const civil_status = formData.get("civil_status") as string;
  const profession = formData.get("profession") as string;
  const photo_url = formData.get("photo_url") as string; // NOVO
  
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const nationality_city = formData.get("nationality_city") as string;
  const nationality_state = formData.get("nationality_state") as string;
  const schooling = formData.get("schooling") as string;
  const cpf = formData.get("cpf") as string;
  const rg = formData.get("rg") as string;
  const rg_issuer = formData.get("rg_issuer") as string;
  const rg_state = formData.get("rg_state") as string;
  const role_id = formData.get("role_id") as string;
  const church_id = formData.get("church_id") as string;
  const ecclesiastical_status = formData.get("ecclesiastical_status") as string;
  const spouse_name = formData.get("spouse_name") as string;
  const father_name = formData.get("father_name") as string;
  const mother_name = formData.get("mother_name") as string;
  const zip_code = formData.get("zip_code") as string;
  const address = formData.get("address") as string;
  const number = formData.get("number") as string;
  const neighborhood = formData.get("neighborhood") as string;
  const city = formData.get("city") as string;
  const state = formData.get("state") as string;
  const financial_status = formData.get("financial_status") as string;

  if (!id) return { success: false, message: "ID obrigatório." };

  const { error } = await supabase
    .from("members")
    .update({
      full_name,
      birth_date,
      gender,
      civil_status,
      profession,
      photo_url, // Atualizando foto
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
      spouse_name,
      father_name,
      mother_name,
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
    return { success: false, message: "Erro ao atualizar dados." };
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