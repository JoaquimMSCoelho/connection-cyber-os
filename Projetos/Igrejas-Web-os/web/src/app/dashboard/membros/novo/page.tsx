import { createClient } from "@/utils/supabase/server";
import { MemberForm } from "./form";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// FUSÃO TÉCNICA: Esta linha obriga o Next.js a buscar dados novos a cada acesso.
// Isso resolve o problema de IDs antigos (Cache) conflitanto com IDs novos do banco.
export const dynamic = "force-dynamic";

export default async function NewMemberPage() {
  const supabase = await createClient();

  // 1. Busca Cargos
  const { data: roles } = await supabase
    .from("ecclesiastical_roles")
    .select("id, name")
    .order("hierarchy_level", { ascending: true });

  // 2. Busca Setores
  const { data: sectors } = await supabase
    .from("sectors")
    .select("id, name")
    .order("name", { ascending: true });

  // 3. Busca Igrejas (Com ID do Setor atualizado)
  const { data: churches } = await supabase
    .from("churches")
    .select("id, name, sector_id")
    .order("name", { ascending: true });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="bg-neutral-900/30 border border-neutral-800 rounded-xl p-6 sm:p-8">
        <MemberForm 
          roles={roles || []} 
          sectors={sectors || []} 
          churches={churches || []} 
        />
      </div>
    </div>
  );
}