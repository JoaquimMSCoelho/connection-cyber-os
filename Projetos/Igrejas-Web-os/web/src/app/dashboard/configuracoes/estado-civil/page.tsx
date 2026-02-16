"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Plus, Loader2, Trash2, GitMerge } from "lucide-react";
import Link from "next/link";
import { addSettingAction, deleteSettingAction } from "../actions";

export default function EstadoCivilConfigPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const TABLE_NAME = "settings_civil_status";

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from(TABLE_NAME).select("*").order("name");
    if (data) setItems(data);
    setLoading(false);
  }

  async function handleAdd(formData: FormData) {
    if (!newName.trim()) return;
    setIsSubmitting(true);
    setError("");
    formData.append("table", TABLE_NAME);
    
    const result = await addSettingAction(formData);
    if (result && !result.success) {
        setError(result.message);
    } else {
        setNewName("");
        await fetchItems();
    }
    setIsSubmitting(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    const formData = new FormData();
    formData.append("table", TABLE_NAME);
    formData.append("id", id);
    await deleteSettingAction(formData);
    await fetchItems();
  }

  return (
    <div className="max-w-[800px] mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex flex-col gap-4 pb-6 border-b border-neutral-800">
        <Link href="/dashboard/configuracoes" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm w-fit"><ArrowLeft className="w-4 h-4" /> Voltar para Configurações</Link>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 text-pink-500"><GitMerge className="w-6 h-6" /></div>
          <div><h1 className="text-2xl font-bold text-white tracking-tight">Estado Civil</h1><p className="text-sm text-neutral-400">Vínculos conjugais da malha.</p></div>
        </div>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
        <form action={handleAdd} className="flex gap-3 items-start">
            <div className="flex-1">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Ex: União Estável" 
                    value={newName} 
                    onChange={(e) => setNewName(e.target.value)} 
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-pink-500 outline-none"
                    required
                />
                {error && <span className="text-red-500 text-xs font-bold mt-2 block">{error}</span>}
            </div>
            <button type="submit" disabled={isSubmitting || !newName.trim()} className="flex items-center gap-2 bg-pink-600 hover:bg-pink-500 disabled:opacity-50 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />} Adicionar
            </button>
        </form>
      </div>

      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {loading ? (
            <div className="flex justify-center p-10"><Loader2 className="w-6 h-6 text-neutral-500 animate-spin" /></div>
        ) : (
            <table className="w-full text-left text-sm text-neutral-400">
                <thead className="bg-neutral-950 text-xs uppercase text-neutral-500 border-b border-neutral-800">
                    <tr>
                        <th className="px-6 py-4 font-medium">Nome do Estado Civil</th>
                        <th className="px-6 py-4 font-medium text-right">Ação</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                    {items.length === 0 ? (
                        <tr><td colSpan={2} className="px-6 py-8 text-center">Nenhum registro.</td></tr>
                    ) : (
                        items.map((item) => (
                            <tr key={item.id} className="hover:bg-neutral-800/50 transition-colors">
                                <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors inline-flex items-center justify-center">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        )}
      </div>
    </div>
  );
}