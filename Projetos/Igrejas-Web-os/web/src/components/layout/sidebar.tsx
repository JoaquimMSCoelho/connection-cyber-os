"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Wallet, 
  Settings, 
  LogOut,
  GraduationCap
} from "lucide-react";
import { cn } from "@/utils/cn";
import { createClient } from "@/utils/supabase/client";

const menuItems = [
  { icon: LayoutDashboard, label: "Visão Geral", href: "/dashboard" },
  { icon: Wallet, label: "Financeiro", href: "/dashboard/financeiro" },
  { icon: Users, label: "Membros", href: "/dashboard/membros" },
  { icon: Building2, label: "Setores & Igrejas", href: "/dashboard/igrejas" },
  { icon: GraduationCap, label: "Formação Eclesiástica", href: "/dashboard/formacao" },
  { icon: Settings, label: "Configurações", href: "/dashboard/configuracoes" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <aside className="w-64 bg-neutral-900 border-r border-neutral-800 hidden md:flex flex-col h-screen fixed left-0 top-0 z-40">
      {/* LOGO AREA */}
      <div className="h-16 flex items-center px-6 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
             <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
          </div>
          <span className="font-bold text-neutral-100 tracking-tight">
            IgrejasWeb <span className="text-emerald-500">OS</span>
          </span>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          // Lógica Inteligente de Ativação (Mantém aceso em sub-rotas)
          const isActive = item.href === '/dashboard' 
             ? pathname === item.href 
             : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                isActive 
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                  : "text-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/50"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-emerald-500" : "text-neutral-500 group-hover:text-neutral-300")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* FOOTER / USER */}
      <div className="p-4 border-t border-neutral-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
          Sair do Sistema
        </button>
      </div>
    </aside>
  );
}