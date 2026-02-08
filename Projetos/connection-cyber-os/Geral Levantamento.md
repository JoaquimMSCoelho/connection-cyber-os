**Destes material que você me passou {temos algum banco de dados**

**vinculado a algum desses documentos}, {}Responder no idioma local Português-BR.**



**Analisar o texto, de um parecer técnico**, mais não gere nenhum comando ou código,

me diga se nós jatemos esta rotina implementada em nosso sistema ou podemos implementar

esta rotina em nosso sistema, não se esqueça de armazenar as informações para uso posterior.

Responder no idioma local Português-BR. Verificar se podemos implementar em nosso 

projeto {connection-cyber-os}.











**AULTMIND\_BLUEPRINT\_MASTER**

\# VAULTMIND\_OS | BLUEPRINT MASTER v1.0

\*\*Status:\*\* Em Desenvolvimento Ativo

\*\*Ultima Atualização:\*\* 05/02/2026

\*\*Arquiteto Chefe:\*\* Joaquim Mario (Ado)

\*\*Engine:\*\* ConnectionCyberOS Ecosystem



**## 1. VISÃO E IDENTIDADE**

O \*\*VaultMindOS\*\* não é apenas um curso, é um "Sistema Operacional de Carreira". Uma plataforma híbrida que une LMS (Learning Management System) com funcionalidades de ERP para gestão de carreira e negócios.



\* \*\*Core Value:\*\* Transformar potencial bruto ("Primeiro Emprego") em prontidão técnica.

\* \*\*Identidade Visual:\*\* "Enterprise Emerald" (Dark Mode Profissional).

&nbsp;   \* Base: `bg-neutral-950`

&nbsp;   \* Texto: `text-neutral-100`

&nbsp;   \* Destaque: `text-emerald-500`

\* \*\*Público Alvo:\*\* Jovens em busca do primeiro emprego, técnicos de informática, microempreendedores (MEI).



**## 2. ARQUITETURA TÉCNICA (STACK)**



\### Frontend (Aplicação)

\* \*\*Framework:\*\* Next.js 15+ (App Router).

\* \*\*Linguagem:\*\* TypeScript (Strict Mode).

\* \*\*Estilização:\*\* Tailwind CSS + Lucide React (Ícones).

\* \*\*Diretório Raiz da App:\*\* `E:\\Projetos\\VaultMindOS\\web` (Regra de Ouro).



\### Backend \& Dados

\* \*\*BaaS:\*\* Supabase (PostgreSQL).

\* \*\*Autenticação:\*\* Supabase Auth (Email/Senha + Magic Link).

\* \*\*Storage:\*\* Supabase Storage (para thumbnails e avatares).

\* \*\*Segurança:\*\* RLS (Row Level Security) ativado em todas as tabelas.



\### Infraestrutura Local

\* \*\*Scripts de Automação:\*\* PowerShell (.ps1).

\* \*\*Backup Físico:\*\* Drive J: (Espelhamento via Robocopy).



**## 3. MAPA CARTOGRÁFICO (ESTRUTURA DE PASTAS)**



```text

E:\\Projetos\\VaultMindOS\\

│

├── web/                            # APLICAÇÃO NEXT.JS (Raiz do Workspace)

│   ├── public/                     # Assets Estáticos (Imagens, SVGs)

│   ├── src/

│   │   ├── app/                    # APP ROUTER

│   │   │   ├── (public)/           # Rota Pública (Landing Page, Lead Form)

│   │   │   ├── (academy)/          # Rota Protegida (Portal do Aluno, Player)

│   │   │   ├── (auth)/             # Rota de Autenticação (Login, Recover)

│   │   │   ├── api/                # Webhooks e Rotas de API

│   │   │   ├── layout.tsx          # Root Layout

│   │   │   └── globals.css         # Tailwind Imports

│   │   │

│   │   ├── components/             # BIBLIOTECA DE COMPONENTES

│   │   │   ├── ui/                 # Componentes Atômicos (Cards, Buttons)

│   │   │   ├── Navbar.tsx          # Navegação Global

│   │   │   ├── PoweredByFooter.tsx # Rodapé Institucional

│   │   │   └── \[SpecificComponents]# Componentes de negócio

│   │   │

│   │   └── utils/

│   │       └── supabase/           # Clientes Supabase (Server/Client)

│   │

│   ├── next.config.ts              # Configurações do Next

│   └── tailwind.config.ts          # Configurações de Design Token

│

├── START\_SESSION.ps1               # Script de Inicialização

├── CLOSE\_SESSION.ps1               # Script de Encerramento e Backup

├── clear-all-cache.ps1             # Script de Limpeza Profunda

└── AUDIT\_STRUCTURE.ps1             # Script de Auditoria



**4. MÓDULOS DE NEGÓCIO**

A. Módulo Público (public)

Objetivo: Conversão de Leads e Apresentação Institucional.

Páginas Chave:

/ (Home): Apresentação dos 6 pilares, Hero Section.

/primeiro-emprego: Landing Page focada em captura de leads para bolsas.

/servicos: Vitrine comercial (futuro).

B. Módulo Academy (academy)

Objetivo: Entrega de conteúdo educacional e certificação.

Funcionalidades:

Portal: Dashboard com progresso, cursos ativos e bloqueados.

Watch: Player de vídeo (Vimeo/YouTube embed) com check de conclusão.

Profile: Gestão de dados pessoais e visualização de plano (Bolsista vs Premium).

C. Módulo Auth (auth)

Objetivo: Segurança e Gestão de Sessão.

Fluxo: Login, Logout, Recuperação de Senha, Callback (Troca de token).



**5. BANCO DE DADOS (SCHEMA RESUMIDO)**

TabelaFunçãoRelacionamentos ChaveprofilesDados estendidos do usuário (Nome, Avatar)1:1

com auth.userscoursesTabela mãe dos cursos (Título, Slug, Capa)1:N com modulesmodulesAgrupadores de aulas1:N

com lessonslessonsConteúdo final (Vídeo, Descrição)N:1 com modulesenrollmentsControle de acesso (Ativo,

Cancelado, Bolsista)Link user\_id <-> course\_iduser\_progressRastreamento

de aulas assistidas (Checks)Link user\_id <-> lesson\_idleads\_primeiro\_empregoCaptura

da Landing PageSem relação direta (Tabela de Funil)



**6. PROTOCOLOS OPERACIONAIS (DEVOPS)**

Protocolo de Início (START\_SESSION.ps1)

Limpa caches temporários (.next).

Verifica integridade do .env.local.

Instala dependências (npm install).

Inicia servidor de desenvolvimento (npm run dev).

Protocolo de Encerramento (CLOSE\_SESSION.ps1)

Encerra processos Node.js.

Solicita mensagem de commit padronizada.

Executa Git Push para origin main.

Backup Físico: Espelha todo o projeto para J:\\VaultMindOS\_BK2026.

Protocolo de Crise (clear-all-cache.ps1)

Executar apenas se houver erros bizarros de build ou dependência.

Remove node\_modules, .next, package-lock.json e limpa cache do NPM.



**7. REGRAS DE OURO (GOVERNANÇA)**

Regra do Caminho: Todo código da aplicação reside em /web/src.

A raiz E:\\Projetos\\VaultMindOS é exclusiva para scripts de orquestração.

Regra de Componentes: Componentes globais ficam na raiz de components/.

Evitar subpastas excessivas como components/global/ a menos que estritamente necessário.

Regra de Idioma: Código (variáveis, funções) preferencialmente em Inglês ou Português (manter consistência).

Interface (UI) estritamente em Português-BR.

Regra de Lint: Zero Errors. Não fazer commit com erros de TypeScript ou ESLint.

Regra de Backup: Nunca encerrar o dia sem rodar o CLOSE\_SESSION.ps1.



========================================================================================================================

========================================================================================================================



Como **Chief Integrated Systems Architect**, identifico que a "Página Inicial"

(http://localhost:3000) é gerada pelo arquivo principal da rota pública.

No ecossistema VaultMindOS (baseado em Next.js App Router), a rotina de execução funciona assim:

O servidor recebe a requisição na raiz /.

O Roteador busca o arquivo page.tsx dentro do grupo de rotas (public).

O React renderiza o componente Home, injetando a Navbar (topo)

e montando as seções (Hero, Cards, Diferenciais).

Aqui está o código completo e validado da sua Home Page atual:



**📄 Arquivo: web/src/app/(public)/page.tsx**

import Image from "next/image";

import Link from "next/link";

import { Navbar } from "@/components/Navbar";

import { FeatureCard } from "@/components/ui/FeatureCard";

import { 

&nbsp; ArrowRight, 

&nbsp; CheckCircle2, 

&nbsp; Shield, 

&nbsp; Cpu, 

&nbsp; Users,

&nbsp; ShieldCheck,

&nbsp; Zap,

&nbsp; Monitor,

&nbsp; Rocket,

&nbsp; Briefcase

} from 'lucide-react';



export default function Home() {



&nbsp; // Definição Estratégica dos 6 Pilares (Módulos)

&nbsp; const features = \[

&nbsp;   {

&nbsp;       title: 'Administrativa 4.0',

&nbsp;       icon: Users,

&nbsp;       description: 'Domínio de ERPs, CRM, automação de rotinas digitais e fluxo de caixa.'

&nbsp;   },

&nbsp;   {

&nbsp;       title: 'Segurança \& Automação',

&nbsp;       icon: ShieldCheck,

&nbsp;       description: 'Implementação de CFTV IP, centrais de alarme inteligentes e dispositivos IoT.'

&nbsp;   },

&nbsp;   {

&nbsp;       title: 'Redes \& Conectividade',

&nbsp;       icon: Zap,

&nbsp;       description: 'Infraestrutura de cabeamento estruturado, configuração de Wi-Fi 6 e Fibra Óptica.'

&nbsp;   },

&nbsp;   {

&nbsp;       title: 'Suporte \& Hardware',

&nbsp;       icon: Monitor,

&nbsp;       description: 'Manutenção avançada de notebooks, desktops e diagnóstico de hardware corporativo.'

&nbsp;   },

&nbsp;   {

&nbsp;       title: 'Elétrica Moderna',

&nbsp;       icon: Rocket,

&nbsp;       description: 'Instalações prediais, quadros de comando, eficiência energética e normas NR-10.'

&nbsp;   },

&nbsp;   {

&nbsp;       title: 'Consultoria Fiscal',

&nbsp;       icon: Briefcase,

&nbsp;       description: 'Abertura e gestão de MEI, IRPF, IRPJ e regularização tributária simplificada.'

&nbsp;   },

&nbsp; ];



&nbsp; return (

&nbsp;   <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-500/30 flex flex-col">

&nbsp;     

&nbsp;     {/\* Componente de Navegação Global \*/}

&nbsp;     <Navbar />



&nbsp;     <main className="flex-1 pt-16">

&nbsp;       

&nbsp;       {/\* HERO SECTION (Apresentação Principal) \*/}

&nbsp;       <header className="relative py-12 px-4 overflow-hidden flex flex-col items-center justify-center min-h-\[60vh]">

&nbsp;          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-\[500px] bg-emerald-900/10 rounded-full blur-\[100px] pointer-events-none" />

&nbsp;          <div className="absolute inset-0 bg-\[url('/grid-pattern.svg')] bg-center \[mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20"></div>



&nbsp;          <div className="max-w-5xl mx-auto text-center relative z-10">

&nbsp;            

&nbsp;            {/\* Logo VaultMind Otimizado \*/}

&nbsp;            <div className="mb-8 flex justify-center animate-in fade-in zoom-in duration-1000">

&nbsp;               <Image 

&nbsp;                 src="/logo-vaultmind.png" 

&nbsp;                 alt="VaultMindOS Logo" 

&nbsp;                 width={180} 

&nbsp;                 height={45} 

&nbsp;                 priority 

&nbsp;                 className="object-contain"

&nbsp;               />

&nbsp;            </div>



&nbsp;            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">

&nbsp;              <span className="relative flex h-2.5 w-2.5">

&nbsp;                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>

&nbsp;                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>

&nbsp;              </span>

&nbsp;              <span className="text-sm font-medium text-neutral-300">Ecossistema Integrado de Tecnologia e Educação</span>

&nbsp;            </div>



&nbsp;            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">

&nbsp;              O Sistema Operacional da sua <br />

&nbsp;              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 text-glow">

&nbsp;                Evolução Corporativa.

&nbsp;              </span>

&nbsp;            </h1>

&nbsp;            

&nbsp;            <p className="text-lg md:text-xl text-neutral-400 mb-8 leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">

&nbsp;              Centralize gestão, capacitação e inteligência estratégica em uma única plataforma. 

&nbsp;              Do \&quot;Primeiro Emprego\&quot; à liderança executiva, o VaultMindOS conecta potenciais a resultados.

&nbsp;            </p>



&nbsp;            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">

&nbsp;              <Link href="/servicos" className="group bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-full text-base font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 hover:scale-105">

&nbsp;                Explorar Soluções

&nbsp;                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

&nbsp;              </Link>

&nbsp;              <Link href="/primeiro-emprego" className="group bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 text-white px-8 py-3.5 rounded-full text-base font-medium transition-all flex items-center gap-2 backdrop-blur-sm hover:scale-105">

&nbsp;                Iniciativa Primeiro Emprego

&nbsp;              </Link>

&nbsp;            </div>



&nbsp;          </div>

&nbsp;       </header>



&nbsp;       {/\* SEÇÃO DE ÁREAS DE ATUAÇÃO (Cards) \*/}

&nbsp;       <section className="py-16 bg-neutral-950 relative overflow-hidden border-t border-neutral-900">

&nbsp;           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-\[800px] h-\[800px] bg-emerald-900/5 rounded-full blur-\[150px] pointer-events-none" />



&nbsp;           <div className="text-center mb-10 relative z-10 px-4">

&nbsp;               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">

&nbsp;                   Nossas Áreas de Atuação

&nbsp;               </h2>

&nbsp;               <p className="text-neutral-400 italic max-w-2xl mx-auto">

&nbsp;                   \&quot;Transformando potencial em prontidão técnica para o mercado real.\&quot;

&nbsp;               </p>

&nbsp;           </div>



&nbsp;           <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

&nbsp;               {features.map((feature, index) => (

&nbsp;                   <FeatureCard key={index} {...feature} />

&nbsp;               ))}

&nbsp;           </div>

&nbsp;       </section>



&nbsp;       {/\* SEÇÃO WHY US (Diferenciais) \*/}

&nbsp;       <section className="py-16 bg-neutral-900/30 relative border-y border-neutral-900">

&nbsp;         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

&nbsp;             

&nbsp;             <div className="relative">

&nbsp;                 <div className="aspect-square rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden relative group">

&nbsp;                      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-transparent to-emerald-900/20 opacity-50 group-hover:opacity-70 transition-opacity" />

&nbsp;                      

&nbsp;                      <div className="absolute inset-4 border border-neutral-800 rounded-2xl bg-neutral-950/50 p-6 flex flex-col gap-4 backdrop-blur-md">

&nbsp;                          {/\* Elementos decorativos (Skeleton UI simulado) \*/}

&nbsp;                          <div className="h-8 w-3/4 bg-neutral-800/50 rounded-lg animate-pulse" />

&nbsp;                          <div className="flex gap-4">

&nbsp;                              <div className="h-24 w-1/2 bg-neutral-800/50 rounded-lg" />

&nbsp;                              <div className="h-24 w-1/2 bg-emerald-900/20 border border-emerald-500/20 rounded-lg relative overflow-hidden">

&nbsp;                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-full animate-\[shimmer\_2s\_infinite]" />

&nbsp;                              </div>

&nbsp;                          </div>

&nbsp;                          <div className="h-8 w-full bg-neutral-800/50 rounded-lg" />

&nbsp;                          <div className="h-32 w-full bg-neutral-800/50 rounded-lg mt-auto" />

&nbsp;                      </div>



&nbsp;                      {/\* Ícones flutuantes \*/}

&nbsp;                      <div className="absolute -top-6 -right-6 w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center shadow-xl transform rotate-12 group-hover:rotate-6 transition-transform">

&nbsp;                          <Cpu className="w-8 h-8 text-emerald-500" />

&nbsp;                      </div>

&nbsp;                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center shadow-xl transform -rotate-12 group-hover:-rotate-6 transition-transform">

&nbsp;                          <Shield className="w-8 h-8 text-emerald-500" />

&nbsp;                      </div>

&nbsp;                 </div>

&nbsp;             </div>



&nbsp;             <div>

&nbsp;                 <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">

&nbsp;                     Muito mais que software. <br />

&nbsp;                     Uma <span className="text-emerald-500">parceria estratégica.</span>

&nbsp;                 </h2>

&nbsp;                 <p className="text-lg text-neutral-400 mb-8 leading-relaxed">

&nbsp;                     O ConnectionCyberOS Ecosystem não apenas fornece as ferramentas, mas também o caminho para o crescimento sustentável.

&nbsp;                     Integramos tecnologia de ponta com desenvolvimento humano.

&nbsp;                 </p>

&nbsp;                 

&nbsp;                 <ul className="space-y-4">

&nbsp;                     {\[

&nbsp;                         { title: 'Segurança Unificada', desc: 'Proteção de dados e ativos físicos em uma única visão.' },

&nbsp;                         { title: 'Capacitação Contínua', desc: 'Sua equipe treinada nas tecnologias que sua empresa usa.' },

&nbsp;                         { title: 'Eficiência Operacional', desc: 'Automatize rotinas e foque no que realmente importa.' },

&nbsp;                     ].map((item, i) => (

&nbsp;                         <li key={i} className="flex items-start gap-4 group">

&nbsp;                             <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">

&nbsp;                                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />

&nbsp;                             </div>

&nbsp;                             <div>

&nbsp;                                 <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{item.title}</h3>

&nbsp;                                 <p className="text-neutral-500">{item.desc}</p>

&nbsp;                             </div>

&nbsp;                         </li>

&nbsp;                     ))}

&nbsp;                 </ul>

&nbsp;             </div>



&nbsp;         </div>

&nbsp;       </section>



&nbsp;     </main>

&nbsp;     

&nbsp;   </div>

&nbsp; );

}





========================================================================================================================

========================================================================================================================



A estrutura de ferramentas (Tech Stack) que definimos e estamos utilizando para desenvolver o VaultMindOS é projetada para ser robusta, escalável e alinhada com as melhores práticas de mercado (Enterprise Grade).



**Aqui está o detalhamento técnico das ferramentas:**

**1. O Núcleo (Core Application)**

Framework: Next.js 15+ (App Router)

Por que: Permite renderização híbrida (Server Components para performance, Client Components para interatividade), rotas organizadas por pastas e otimização automática.

Linguagem: TypeScript

Por que: Traz segurança de tipagem estática, evitando erros bobos de código e facilitando a manutenção a longo prazo.

Ambiente de Execução: Node.js

Por que: O motor que roda o JavaScript/TypeScript fora do navegador.



**2. Interface e Design (UI/UX)**

Estilização: Tailwind CSS

Por que: Framework "utility-first" que agiliza o desenvolvimento de layouts responsivos e bonitos direto no HTML/JSX.

Componentes de Ícones: Lucide React

Por que: Biblioteca de ícones leve, moderna e consistente.

Design System: "Enterprise Emerald" (Customizado)

Conceito: Fundo escuro (neutral-950) com acentos em verde esmeralda (emerald-500), transmitindo seriedade, tecnologia e segurança.



**3. Backend e Dados (BaaS - Backend as a Service)**

Plataforma: Supabase

Por que: Uma alternativa Open Source ao Firebase, que nos dá um banco de dados SQL real e escalável.

Banco de Dados: PostgreSQL

Por que: O banco de dados relacional mais avançado e confiável do mundo.

Autenticação: Supabase Auth

Por que: Gerencia usuários, logins (Email/Senha, Magic Link, OAuth) e sessões de forma segura.

Segurança de Dados: RLS (Row Level Security)

Por que: Regras de segurança direto no banco de dados. "O usuário X só pode ver os dados do usuário X".



**4. Infraestrutura e DevOps (Automação Local)**

Scripts de Orquestração: PowerShell (.ps1)

Ferramentas:

START\_SESSION.ps1: Prepara o ambiente e inicia o servidor.

CLOSE\_SESSION.ps1: Encerra, comita no Git e faz backup físico.

AUDIT\_STRUCTURE.ps1: Audita os arquivos do projeto.

Controle de Versão: Git \& GitHub

Por que: Histórico de alterações e backup na nuvem.

Backup Físico: Robocopy (via Script)

Destino: Drive J: (Espelhamento local para segurança extra).



**5. Ferramentas de Desenvolvimento (DX)**

Editor de Código: VS Code (Recomendado)

Gerenciador de Pacotes: NPM (Node Package Manager)

Linter: ESLint (Para garantir qualidade e padronização do código).

Esta é a "caixa de ferramentas" completa que estamos operando. Ela cobre desde a escrita do código até a segurança dos dados e a prevenção de desastres.



========================================================================================================================

========================================================================================================================



**"códigos de governança"**

Esses **"códigos de governança"** visual são definidos no nosso arquivo de configuração de estilos, o Tailwind Config. É ele quem dita as regras do jogo para que ninguém invente uma cor nova ou um espaçamento que não existe no padrão.

Além disso, temos componentes globais (Navbar e Footer) que impõem a estrutura.

Aqui está o Código de Governança Visual do VaultMindOS:

**1. A Lei das Cores e Espaços (tailwind.config.ts)**

Este arquivo define o DNA visual do projeto. Tudo o que usamos (ex: bg-neutral-950, text-emerald-500) nasce aqui.



**Arquivo: web/tailwind.config.ts**

import type { Config } from "tailwindcss";



const config: Config = {

  content: \[

    "./src/pages/\*\*/\*.{js,ts,jsx,tsx,mdx}",

    "./src/components/\*\*/\*.{js,ts,jsx,tsx,mdx}",

    "./src/app/\*\*/\*.{js,ts,jsx,tsx,mdx}",

  ],

  theme: {

    extend: {

      // 🎨 PALETA DE CORES INSTITUCIONAL (Enterprise Emerald)

      colors: {

        background: "var(--background)", // Geralmente #0a0a0a (neutral-950)

        foreground: "var(--foreground)", // Geralmente #ededed (neutral-100)

 

        // Cores Semânticas (Usar estas ao invés de hexadecimais soltos)

        brand: {

            DEFAULT: "#10b981", // emerald-500 (Ação, Destaque, Logo)

            dark: "#064e3b",    // emerald-900 (Fundos sutis)

            light: "#6ee7b7",   // emerald-300 (Hover, Glow)

        },

        surface: {

            DEFAULT: "#171717", // neutral-900 (Cards, Sidebar)

            border: "#262626",  // neutral-800 (Bordas sutis)

        }

      },

 

      // 📐 LAYOUT E ESPAÇAMENTO

      container: {

        center: true,

        padding: "1rem",

        screens: {

          "2xl": "1400px", // Limite máximo de largura para não esticar em monitores gigantes

        },

      },



      // ✨ ANIMAÇÕES PADRÃO (Micro-interações)

      animation: {

        "fade-in": "fadeIn 0.5s ease-out",

        "slide-up": "slideUp 0.5s ease-out",

        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",

      },

      keyframes: {

        fadeIn: {

          "0%": { opacity: "0" },

          "100%": { opacity: "1" },

        },

        slideUp: {

          "0%": { transform: "translateY(10px)", opacity: "0" },

          "100%": { transform: "translateY(0)", opacity: "1" },

        },

      },

    },

  },

  plugins: \[

      require("tailwindcss-animate"), // Plugin para animações suaves

      require("@tailwindcss/typography") // Plugin para textos longos (Blog/Aulas)

  ],

};

export default config;



**2. A Lei da Estrutura Global (layout.tsx)**

Este arquivo define o "esqueleto" que se repete em todas as páginas. É aqui que garantimos que a fonte seja sempre a mesma e o fundo seja sempre escuro.



**Arquivo: web/src/app/layout.tsx**

import type { Metadata } from "next";

import { Inter } from "next/font/google"; // Fonte Oficial: Inter (Legibilidade Corporativa)

import "./globals.css"; // Importa as variáveis CSS globais



const inter = Inter({ subsets: \["latin"] });



export const metadata: Metadata = {

&nbsp; title: "VaultMindOS | Enterprise Intelligence",

&nbsp; description: "Sistema Operacional de Carreira e Gestão.",

};



export default function RootLayout({

&nbsp; children,

}: Readonly<{

&nbsp; children: React.ReactNode;

}>) {

&nbsp; return (

&nbsp;   <html lang="pt-BR" className="scroll-smooth"> {/\* Rolagem suave nativa \*/}

&nbsp;     <body className={`${inter.className} antialiased bg-neutral-950 text-neutral-100`}>

&nbsp;       {/\* O conteúdo das páginas (Home, Login, Portal) é injetado aqui dentro \*/}

&nbsp;       {children}

&nbsp;     </body>

&nbsp;   </html>

&nbsp; );

}



**3. Variáveis Globais (globals.css)**

Aqui definimos as "variáveis raiz" que o Tailwind consome. É o ajuste fino do CSS.



**Arquivo: web/src/app/globals.css**

@tailwind base;

@tailwind components;

@tailwind utilities;



:root {

&nbsp; /\* Modo Escuro Padrão (Enterprise Dark) \*/

&nbsp; --background: #0a0a0a;

&nbsp; --foreground: #ededed;

}



/\* Efeito de Seleção de Texto (Branding até no mouse) \*/

::selection {

&nbsp; background-color: rgba(16, 185, 129, 0.3); /\* Emerald-500 com transparência \*/

&nbsp; color: #ffffff;

}



/\* Estilização da Barra de Rolagem (Scrollbar) \*/

::-webkit-scrollbar {

&nbsp; width: 8px;

}

::-webkit-scrollbar-track {

&nbsp; background: #0a0a0a;

}

::-webkit-scrollbar-thumb {

&nbsp; background: #262626;

&nbsp; border-radius: 4px;

}

::-webkit-scrollbar-thumb:hover {

&nbsp; background: #10b981; /\* Fica verde quando passa o mouse \*/

}



**Resumo das Regras de Governança:**

Fundos: Sempre bg-neutral-950 (quase preto). Nunca preto absoluto (#000) nem cinza claro.

Botões Primários: Sempre bg-emerald-600 com hover para bg-emerald-500.

Botões Secundários: bg-neutral-900 com borda border-neutral-800.

Logo: Deve sempre usar a variante branca em fundos escuros.

Fontes: Sempre Inter.

Bordas: Sutis, sempre border-neutral-800 ou border-neutral-900.

========================================================================================================================

========================================================================================================================

**{http://localhost:3000}**

A Página Inicial (/) é o cartão de visitas do VaultMindOS. É a primeira coisa que o mundo vê.

Aqui está o detalhamento da rotina técnica e o código mestre atualizado e validado para esta rota.

**1. A Rotina (O Fluxo de Execução)**

Quando você acessa http://localhost:3000, o sistema segue este protocolo:

**Roteamento Raiz:**

O Next.js busca o arquivo page.tsx na raiz do grupo (public).

Caminho: web/src/app/(public)/page.tsx.

Montagem de Componentes:

Navbar: Injetada no topo (vinda do layout.tsx ou importada direto).

Hero Section: O banner principal com o logo e a chamada de ação.

Features Grid: A lista dos 6 pilares de atuação (Administrativa, Segurança, etc.).

Social Proof/Why Us: Seção de diferenciais competitivos.

Footer: Rodapé institucional.

Renderização (Server Side):

Como é uma página estática (não depende de dados do usuário logado), ela é pré-renderizada no servidor para máxima velocidade e SEO.

**2. O Código (A Implementação)**

Este arquivo deve ser salvo em: **web/src/app/(public)/page.tsx**

import Image from "next/image";

import Link from "next/link";

import { Navbar } from "@/components/Navbar";

import { FeatureCard } from "@/components/ui/FeatureCard";

import { PoweredByFooter } from "@/components/PoweredByFooter";

import { 

&nbsp; ArrowRight, 

&nbsp; CheckCircle2, 

&nbsp; Shield, 

&nbsp; Cpu, 

&nbsp; Users,

&nbsp; ShieldCheck,

&nbsp; Zap,

&nbsp; Monitor,

&nbsp; Rocket,

&nbsp; Briefcase

} from 'lucide-react';



export default function Home() {



&nbsp; // Definição Estratégica dos 6 Pilares (Módulos)

&nbsp; const features = \[

&nbsp;   {

&nbsp;       title: 'Administrativa 4.0',

&nbsp;       icon: Users,

&nbsp;       description: 'Domínio de ERPs, CRM, automação de rotinas digitais e fluxo de caixa.'

&nbsp;   },

&nbsp;   {

&nbsp;       title: 'Segurança \& Automação',

&nbsp;       icon: ShieldCheck,

&nbsp;       description: 'Implementação de CFTV IP, centrais de alarme inteligentes e dispositivos IoT.'

&nbsp;   },

&nbsp;   {

&nbsp;       title: 'Redes \& Conectividade',

&nbsp;       icon: Zap,

&nbsp;       description: 'Infraestrutura de cabeamento estruturado, configuração de Wi-Fi 6 e Fibra Óptica.'

&nbsp;   },

&nbsp;   {

&nbsp;       title: 'Suporte \& Hardware',

&nbsp;       icon: Monitor,

&nbsp;       description: 'Manutenção avançada de notebooks, desktops e diagnóstico de hardware corporativo.'

&nbsp;   },

&nbsp;   {

&nbsp;       title: 'Elétrica Moderna',

&nbsp;       icon: Rocket,

&nbsp;       description: 'Instalações prediais, quadros de comando, eficiência energética e normas NR-10.'

&nbsp;   },

&nbsp;   {

&nbsp;       title: 'Consultoria Fiscal',

&nbsp;       icon: Briefcase,

&nbsp;       description: 'Abertura e gestão de MEI, IRPF, IRPJ e regularização tributária simplificada.'

&nbsp;   },

&nbsp; ];



&nbsp; return (

&nbsp;   <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-500/30 flex flex-col">

&nbsp;     

&nbsp;     {/\* Componente de Navegação Global \*/}

&nbsp;     <Navbar />



&nbsp;     <main className="flex-1 pt-16">

&nbsp;       

&nbsp;       {/\* HERO SECTION (Apresentação Principal) \*/}

&nbsp;       <header className="relative py-12 px-4 overflow-hidden flex flex-col items-center justify-center min-h-\[60vh]">

&nbsp;          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-\[500px] bg-emerald-900/10 rounded-full blur-\[100px] pointer-events-none" />

&nbsp;          {/\* Grid Pattern (SVG que criamos) \*/}

&nbsp;          <div className="absolute inset-0 bg-\[url('/grid-pattern.svg')] bg-center \[mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20"></div>



&nbsp;          <div className="max-w-5xl mx-auto text-center relative z-10">

&nbsp;            

&nbsp;            {/\* Logo VaultMind Otimizado \*/}

&nbsp;            <div className="mb-8 flex justify-center animate-in fade-in zoom-in duration-1000">

&nbsp;               <Image 

&nbsp;                 src="/logo-vaultmind.png" 

&nbsp;                 alt="VaultMindOS Logo" 

&nbsp;                 width={180} 

&nbsp;                 height={45} 

&nbsp;                 priority 

&nbsp;                 className="object-contain"

&nbsp;               />

&nbsp;            </div>



&nbsp;            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900/80 border border-neutral-800 backdrop-blur-sm mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">

&nbsp;              <span className="relative flex h-2.5 w-2.5">

&nbsp;                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>

&nbsp;                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>

&nbsp;              </span>

&nbsp;              <span className="text-sm font-medium text-neutral-300">Ecossistema Integrado de Tecnologia e Educação</span>

&nbsp;            </div>



&nbsp;            <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">

&nbsp;              O Sistema Operacional da sua <br />

&nbsp;              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600 text-glow">

&nbsp;                Evolução Corporativa.

&nbsp;              </span>

&nbsp;            </h1>

&nbsp;            

&nbsp;            <p className="text-lg md:text-xl text-neutral-400 mb-8 leading-relaxed max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">

&nbsp;              Centralize gestão, capacitação e inteligência estratégica em uma única plataforma. 

&nbsp;              Do \&quot;Primeiro Emprego\&quot; à liderança executiva, o VaultMindOS conecta potenciais a resultados.

&nbsp;            </p>



&nbsp;            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">

&nbsp;              <Link href="/servicos" className="group bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3.5 rounded-full text-base font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/20 hover:shadow-emerald-900/40 hover:scale-105">

&nbsp;                Explorar Soluções

&nbsp;                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

&nbsp;              </Link>

&nbsp;              <Link href="/primeiro-emprego" className="group bg-neutral-900/80 hover:bg-neutral-900 border border-neutral-800 hover:border-emerald-500/50 text-white px-8 py-3.5 rounded-full text-base font-medium transition-all flex items-center gap-2 backdrop-blur-sm hover:scale-105">

&nbsp;                Iniciativa Primeiro Emprego

&nbsp;              </Link>

&nbsp;            </div>



&nbsp;          </div>

&nbsp;       </header>





&nbsp;       {/\* SEÇÃO DE ÁREAS DE ATUAÇÃO (Cards) \*/}

&nbsp;       <section className="py-16 bg-neutral-950 relative overflow-hidden border-t border-neutral-900">

&nbsp;           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-\[800px] h-\[800px] bg-emerald-900/5 rounded-full blur-\[150px] pointer-events-none" />



&nbsp;           <div className="text-center mb-10 relative z-10 px-4">

&nbsp;               <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">

&nbsp;                   Nossas Áreas de Atuação

&nbsp;               </h2>

&nbsp;               <p className="text-neutral-400 italic max-w-2xl mx-auto">

&nbsp;                   \&quot;Transformando potencial em prontidão técnica para o mercado real.\&quot;

&nbsp;               </p>

&nbsp;           </div>



&nbsp;           <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

&nbsp;               {features.map((feature, index) => (

&nbsp;                   <FeatureCard key={index} {...feature} />

&nbsp;               ))}

&nbsp;           </div>

&nbsp;       </section>





&nbsp;       {/\* SEÇÃO WHY US (Diferenciais) \*/}

&nbsp;       <section className="py-16 bg-neutral-900/30 relative border-y border-neutral-900">

&nbsp;         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">

&nbsp;             

&nbsp;             <div className="relative">

&nbsp;                 <div className="aspect-square rounded-3xl bg-neutral-900 border border-neutral-800 overflow-hidden relative group">

&nbsp;                      <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-transparent to-emerald-900/20 opacity-50 group-hover:opacity-70 transition-opacity" />

&nbsp;                      

&nbsp;                      <div className="absolute inset-4 border border-neutral-800 rounded-2xl bg-neutral-950/50 p-6 flex flex-col gap-4 backdrop-blur-md">

&nbsp;                          {/\* Elementos decorativos (Skeleton UI simulado) \*/}

&nbsp;                          <div className="h-8 w-3/4 bg-neutral-800/50 rounded-lg animate-pulse" />

&nbsp;                          <div className="flex gap-4">

&nbsp;                              <div className="h-24 w-1/2 bg-neutral-800/50 rounded-lg" />

&nbsp;                              <div className="h-24 w-1/2 bg-emerald-900/20 border border-emerald-500/20 rounded-lg relative overflow-hidden">

&nbsp;                                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent -translate-x-full animate-\[shimmer\_2s\_infinite]" />

&nbsp;                              </div>

&nbsp;                          </div>

&nbsp;                          <div className="h-8 w-full bg-neutral-800/50 rounded-lg" />

&nbsp;                          <div className="h-32 w-full bg-neutral-800/50 rounded-lg mt-auto" />

&nbsp;                      </div>



&nbsp;                      {/\* Ícones flutuantes \*/}

&nbsp;                      <div className="absolute -top-6 -right-6 w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center shadow-xl transform rotate-12 group-hover:rotate-6 transition-transform">

&nbsp;                          <Cpu className="w-8 h-8 text-emerald-500" />

&nbsp;                      </div>

&nbsp;                      <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center justify-center shadow-xl transform -rotate-12 group-hover:-rotate-6 transition-transform">

&nbsp;                          <Shield className="w-8 h-8 text-emerald-500" />

&nbsp;                      </div>

&nbsp;                 </div>

&nbsp;             </div>



&nbsp;             <div>

&nbsp;                 <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">

&nbsp;                     Muito mais que software. <br />

&nbsp;                     Uma <span className="text-emerald-500">parceria estratégica.</span>

&nbsp;                 </h2>

&nbsp;                 <p className="text-lg text-neutral-400 mb-8 leading-relaxed">

&nbsp;                     O ConnectionCyberOS Ecosystem não apenas fornece as ferramentas, mas também o caminho para o crescimento sustentável.

&nbsp;                     Integramos tecnologia de ponta com desenvolvimento humano.

&nbsp;                 </p>

&nbsp;                 

&nbsp;                 <ul className="space-y-4">

&nbsp;                     {\[

&nbsp;                         { title: 'Segurança Unificada', desc: 'Proteção de dados e ativos físicos em uma única visão.' },

&nbsp;                         { title: 'Capacitação Contínua', desc: 'Sua equipe treinada nas tecnologias que sua empresa usa.' },

&nbsp;                         { title: 'Eficiência Operacional', desc: 'Automatize rotinas e foque no que realmente importa.' },

&nbsp;                     ].map((item, i) => (

&nbsp;                         <li key={i} className="flex items-start gap-4 group">

&nbsp;                             <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">

&nbsp;                                 <CheckCircle2 className="w-5 h-5 text-emerald-500" />

&nbsp;                             </div>

&nbsp;                             <div>

&nbsp;                                 <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{item.title}</h3>

&nbsp;                                 <p className="text-neutral-500">{item.desc}</p>

&nbsp;                             </div>

&nbsp;                         </li>

&nbsp;                     ))}

&nbsp;                 </ul>

&nbsp;             </div>



&nbsp;         </div>

&nbsp;       </section>



&nbsp;     </main>



&nbsp;     <PoweredByFooter />

&nbsp;     

&nbsp;   </div>

&nbsp; );

}



========================================================================================================================

========================================================================================================================

**http://localhost:3000/login**

**1. A Rotina (O Fluxo de Execução)**

Quando você acessa http://localhost:3000/login, o sistema segue estes passos:

Middleware de Proteção (Guarda-Costas):

Antes de mostrar qualquer coisa, o middleware.ts verifica se você já tem um cookie de sessão válido.

Se tiver sessão: Ele te chuta direto para /portal (Dashboard). Você nem vê a tela de login.

Se não tiver: Ele deixa a requisição passar para a página de login.

Renderização (Server Side):

O Next.js carrega o arquivo web/src/app/(auth)/login/page.tsx.

Como é um Server Component, ele monta o layout base (fundo escuro, logo) no servidor para ser rápido.

Interatividade (Client Side):

Dentro da página, carregamos o formulário (inputs de email/senha).

Ao clicar em "Entrar", uma Server Action (login) é disparada. Ela vai até o Supabase, verifica as credenciais e, se corretas, define o cookie e redireciona.

**2. O Código (A Implementação)**

Aqui está o código padrão para o arquivo da página de login, seguindo nosso Design System "Enterprise Emerald".



**Arquivo: web/src/app/(auth)/login/page.tsx**

import Link from "next/link";

import { headers } from "next/headers";

import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

import { Shield, Lock, ArrowRight } from "lucide-react";



export default async function LoginPage({

&nbsp; searchParams,

}: {

&nbsp; searchParams: Promise<{ message: string }>;

}) {

&nbsp; // 1. Verificar Sessão (Dupla checagem além do Middleware)

&nbsp; const supabase = await createClient();

&nbsp; const { data: { session } } = await supabase.auth.getSession();



&nbsp; if (session) {

&nbsp;   return redirect("/portal");

&nbsp; }



&nbsp; // 2. Capturar mensagens de erro (ex: "Senha incorreta")

&nbsp; const params = await searchParams;

&nbsp; const message = params.message;



&nbsp; return (

&nbsp;   <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4 selection:bg-emerald-500/30">

&nbsp;     

&nbsp;     {/\* Container Principal - Card Centralizado \*/}

&nbsp;     <div className="w-full max-w-md bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm animate-in fade-in zoom-in duration-500">

&nbsp;       

&nbsp;       {/\* Cabeçalho do Card \*/}

&nbsp;       <div className="text-center mb-8">

&nbsp;         <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 mb-4 border border-emerald-500/20">

&nbsp;           <Shield className="w-6 h-6" />

&nbsp;         </div>

&nbsp;         <h1 className="text-2xl font-bold text-white tracking-tight">

&nbsp;           VaultMind<span className="text-emerald-500">OS</span>

&nbsp;         </h1>

&nbsp;         <p className="text-sm text-neutral-400 mt-2">

&nbsp;           Credenciais de Acesso Corporativo

&nbsp;         </p>

&nbsp;       </div>



&nbsp;       {/\* Formulário de Login \*/}

&nbsp;       <form

&nbsp;         className="space-y-4"

&nbsp;         action="/auth/login" // Aponta para a rota de API ou Server Action

&nbsp;         method="post"

&nbsp;       >

&nbsp;         <div>

&nbsp;           <label className="block text-xs font-medium text-neutral-500 uppercase mb-1 ml-1">

&nbsp;             Email Corporativo

&nbsp;           </label>

&nbsp;           <div className="relative">

&nbsp;             <input

&nbsp;               name="email"

&nbsp;               type="email"

&nbsp;               placeholder="nome@exemplo.com"

&nbsp;               required

&nbsp;               className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 block p-3 pl-4 transition-all outline-none"

&nbsp;             />

&nbsp;           </div>

&nbsp;         </div>



&nbsp;         <div>

&nbsp;           <label className="block text-xs font-medium text-neutral-500 uppercase mb-1 ml-1">

&nbsp;             Chave de Acesso

&nbsp;           </label>

&nbsp;           <div className="relative">

&nbsp;             <input

&nbsp;               name="password"

&nbsp;               type="password"

&nbsp;               placeholder="••••••••"

&nbsp;               required

&nbsp;               className="w-full bg-neutral-950 border border-neutral-800 text-white text-sm rounded-lg focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 block p-3 pl-4 transition-all outline-none"

&nbsp;             />

&nbsp;             <Lock className="w-4 h-4 text-neutral-600 absolute right-3 top-3.5" />

&nbsp;           </div>

&nbsp;         </div>



&nbsp;         {/\* Exibição de Mensagens de Erro \*/}

&nbsp;         {message \&\& (

&nbsp;           <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">

&nbsp;             {message}

&nbsp;           </div>

&nbsp;         )}



&nbsp;         <button

&nbsp;           type="submit"

&nbsp;           className="w-full text-white bg-emerald-600 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-500/30 font-medium rounded-lg text-sm px-5 py-3 text-center flex items-center justify-center gap-2 transition-all group"

&nbsp;         >

&nbsp;           Acessar Sistema

&nbsp;           <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

&nbsp;         </button>

&nbsp;       </form>



&nbsp;       {/\* Links Auxiliares \*/}

&nbsp;       <div className="mt-6 text-center space-y-2">

&nbsp;         <Link

&nbsp;           href="/forgot-password"

&nbsp;           className="text-xs text-neutral-500 hover:text-emerald-400 transition-colors block"

&nbsp;         >

&nbsp;           Esqueceu sua senha?

&nbsp;         </Link>

&nbsp;         

&nbsp;         <div className="text-xs text-neutral-600">

&nbsp;           Não tem acesso?{" "}

&nbsp;           <Link href="/primeiro-emprego" className="text-emerald-600 hover:text-emerald-500 font-medium transition-colors">

&nbsp;             Aplicar para Vaga

&nbsp;           </Link>

&nbsp;         </div>

&nbsp;       </div>

&nbsp;     </div>



&nbsp;     {/\* Footer Discreto \*/}

&nbsp;     <div className="mt-8 text-\[10px] text-neutral-600 uppercase tracking-widest">

&nbsp;       Secured by ConnectionCyberOS

&nbsp;     </div>

&nbsp;   </div>

&nbsp; );

}

========================================================================================================================

========================================================================================================================



**{http://localhost:3000/portal}**

Para a página do Portal do Aluno (/portal), a lógica é mais complexa que a Home ou Login, pois envolve dados dinâmicos (quem é o usuário, quais cursos ele tem, qual o progresso dele).



Aqui está o detalhamento da rotina de execução e o código mestre para essa rota.



**1. A Rotina (O Fluxo de Execução Segura)**

Quando você acessa http://localhost:3000/portal, o sistema segue este protocolo:

Barreira de Segurança (Middleware):

O middleware.ts intercepta o acesso. Se não houver cookie de sessão válido, ele redireciona imediatamente para /login. O portal é uma Rota Protegida.

Injeção de Layout ((academy)/layout.tsx):

Antes de carregar a página, o Next.js carrega o Layout do Grupo Academy.

É aqui que a Sidebar Lateral (Menu) e a TopBar (Perfil) são renderizadas. A página /portal é apenas o conteúdo central (o "miolo").

Data Fetching (Server Side):

O componente PortalPage conecta ao Supabase.

Recupera os dados do usuário logado (Nome, Cargo).

Busca a lista de cursos matriculados e o progresso calculado (ex: 45%).

Renderização:

Monta o Dashboard com os Cards de Curso e as Métricas de Progresso.



**2. O Código (A Implementação)**

Este arquivo deve ser salvo em: **web/src/app/(academy)/portal/page.tsx**

import Link from "next/link";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { 

&nbsp; PlayCircle, 

&nbsp; Clock, 

&nbsp; Award, 

&nbsp; TrendingUp, 

&nbsp; MoreVertical 

} from "lucide-react";



export default async function PortalPage() {

&nbsp; // 1. Conexão Segura com Supabase

&nbsp; const supabase = await createClient();



&nbsp; // 2. Obter Usuário da Sessão

&nbsp; const { data: { user } } = await supabase.auth.getUser();



&nbsp; if (!user) {

&nbsp;   return redirect("/login");

&nbsp; }



&nbsp; // 3. Buscar Dados do Perfil (Nome, Cargo)

&nbsp; // Nota: Em produção, isso viria da tabela 'profiles'

&nbsp; const userName = user.user\_metadata.full\_name || "Aluno VaultMind";

&nbsp; const userRole = "Trainee em Tecnologia"; 



&nbsp; // 4. Mock dos Cursos (Simulando o Banco de Dados para o MVP)

&nbsp; // Estes dados virão da tabela 'courses' e 'enrollments' futuramente

&nbsp; const myCourses = \[

&nbsp;   {

&nbsp;     id: "adm-40",

&nbsp;     title: "Administrativa 4.0",

&nbsp;     progress: 75,

&nbsp;     totalLessons: 24,

&nbsp;     lastWatched: "Módulo 3: ERPs e Gestão",

&nbsp;     coverColor: "from-blue-600 to-blue-900"

&nbsp;   },

&nbsp;   {

&nbsp;     id: "sec-iot",

&nbsp;     title: "Segurança \& Automação",

&nbsp;     progress: 30,

&nbsp;     totalLessons: 18,

&nbsp;     lastWatched: "Configuração de CFTV IP",

&nbsp;     coverColor: "from-emerald-600 to-emerald-900"

&nbsp;   },

&nbsp;   {

&nbsp;     id: "net-conn",

&nbsp;     title: "Redes \& Conectividade",

&nbsp;     progress: 0,

&nbsp;     totalLessons: 32,

&nbsp;     lastWatched: "Não iniciado",

&nbsp;     coverColor: "from-violet-600 to-violet-900"

&nbsp;   }

&nbsp; ];



&nbsp; return (

&nbsp;   <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

&nbsp;     

&nbsp;     {/\* CABEÇALHO DO DASHBOARD \*/}

&nbsp;     <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">

&nbsp;       <div>

&nbsp;         <h1 className="text-3xl font-bold text-white tracking-tight">

&nbsp;           Bem-vindo de volta, <span className="text-emerald-500">{userName.split(' ')\[0]}</span>

&nbsp;         </h1>

&nbsp;         <p className="text-neutral-400 mt-1">

&nbsp;           Você tem novas atividades pendentes no seu plano de carreira.

&nbsp;         </p>

&nbsp;       </div>

&nbsp;       

&nbsp;       {/\* Card de Resumo Rápido \*/}

&nbsp;       <div className="flex items-center gap-4 bg-neutral-900/50 border border-neutral-800 p-3 rounded-xl backdrop-blur-sm">

&nbsp;         <div className="p-2 bg-emerald-500/10 rounded-lg">

&nbsp;           <TrendingUp className="w-5 h-5 text-emerald-500" />

&nbsp;         </div>

&nbsp;         <div>

&nbsp;           <p className="text-xs text-neutral-500 uppercase font-bold">Nível Geral</p>

&nbsp;           <p className="text-sm font-bold text-white">Intermediário II</p>

&nbsp;         </div>

&nbsp;       </div>

&nbsp;     </header>



&nbsp;     {/\* SEÇÃO DE MÉTRICAS (KPIs) \*/}

&nbsp;     <section className="grid grid-cols-1 md:grid-cols-3 gap-4">

&nbsp;       {\[

&nbsp;         { label: "Cursos Ativos", value: "3", icon: PlayCircle },

&nbsp;         { label: "Horas Estudadas", value: "12.5h", icon: Clock },

&nbsp;         { label: "Certificados", value: "1", icon: Award },

&nbsp;       ].map((stat, i) => (

&nbsp;         <div key={i} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex items-center gap-4 hover:border-emerald-500/30 transition-colors">

&nbsp;           <div className="p-3 bg-neutral-800 rounded-lg text-neutral-400">

&nbsp;             <stat.icon className="w-6 h-6" />

&nbsp;           </div>

&nbsp;           <div>

&nbsp;             <p className="text-2xl font-bold text-white">{stat.value}</p>

&nbsp;             <p className="text-xs text-neutral-500 uppercase tracking-wider">{stat.label}</p>

&nbsp;           </div>

&nbsp;         </div>

&nbsp;       ))}

&nbsp;     </section>



&nbsp;     {/\* GRID DE MEUS CURSOS \*/}

&nbsp;     <section>

&nbsp;       <div className="flex items-center justify-between mb-6">

&nbsp;         <h2 className="text-xl font-bold text-white flex items-center gap-2">

&nbsp;           <PlayCircle className="w-5 h-5 text-emerald-500" />

&nbsp;           Meus Treinamentos

&nbsp;         </h2>

&nbsp;         <button className="text-sm text-neutral-500 hover:text-emerald-500 transition-colors">

&nbsp;           Ver Histórico Completo

&nbsp;         </button>

&nbsp;       </div>



&nbsp;       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

&nbsp;         {myCourses.map((course) => (

&nbsp;           <div 

&nbsp;             key={course.id} 

&nbsp;             className="group relative bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 hover:-translate-y-1"

&nbsp;           >

&nbsp;             {/\* Capa do Curso (Gradiente Dinâmico) \*/}

&nbsp;             <div className={`h-32 bg-gradient-to-br ${course.coverColor} relative`}>

&nbsp;               <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />

&nbsp;               <div className="absolute bottom-4 left-4 right-4">

&nbsp;                 <h3 className="text-lg font-bold text-white shadow-black drop-shadow-md">

&nbsp;                   {course.title}

&nbsp;                 </h3>

&nbsp;               </div>

&nbsp;             </div>



&nbsp;             {/\* Corpo do Card \*/}

&nbsp;             <div className="p-5">

&nbsp;               <div className="flex justify-between items-start mb-4">

&nbsp;                 <div>

&nbsp;                   <p className="text-xs text-neutral-500 mb-1">Última aula assistida</p>

&nbsp;                   <p className="text-sm text-neutral-300 line-clamp-1 font-medium">

&nbsp;                     {course.lastWatched}

&nbsp;                   </p>

&nbsp;                 </div>

&nbsp;                 <button className="text-neutral-600 hover:text-white transition-colors">

&nbsp;                   <MoreVertical className="w-4 h-4" />

&nbsp;                 </button>

&nbsp;               </div>



&nbsp;               {/\* Barra de Progresso \*/}

&nbsp;               <div className="space-y-2">

&nbsp;                 <div className="flex justify-between text-xs">

&nbsp;                   <span className="text-emerald-500 font-bold">{course.progress}%</span>

&nbsp;                   <span className="text-neutral-600">{course.totalLessons} aulas</span>

&nbsp;                 </div>

&nbsp;                 <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">

&nbsp;                   <div 

&nbsp;                     className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 

&nbsp;                     style={{ width: `${course.progress}%` }}

&nbsp;                   />

&nbsp;                 </div>

&nbsp;               </div>



&nbsp;               {/\* Botão de Ação \*/}

&nbsp;               <div className="mt-6">

&nbsp;                 <Link 

&nbsp;                   href={`/portal/watch/${course.id}`}

&nbsp;                   className="block w-full py-2.5 text-center text-sm font-semibold bg-white text-neutral-950 rounded-lg hover:bg-emerald-500 hover:text-white transition-all"

&nbsp;                 >

&nbsp;                   {course.progress > 0 ? "Continuar Estudando" : "Iniciar Curso"}

&nbsp;                 </Link>

&nbsp;               </div>

&nbsp;             </div>

&nbsp;           </div>

&nbsp;         ))}

&nbsp;       </div>

&nbsp;     </section>



&nbsp;   </div>

&nbsp; );

}



========================================================================================================================

========================================================================================================================



**{http://localhost:3000/portal/profile}**

A página de Perfil (/portal/profile) é o centro de controle da identidade do usuário dentro do VaultMindOS. Diferente do Dashboard, aqui o foco é leitura e edição de dados cadastrais.

Aqui está o detalhamento da rotina técnica e o código mestre para esta rota.

**1. A Rotina (O Fluxo de Execução)**

Quando você acessa http://localhost:3000/portal/profile, o sistema executa o seguinte protocolo:

Autenticação Rigorosa:

O middleware.ts valida o token. Sem token? Redireciona para login.

O componente ProfilePage (Server Side) faz uma segunda verificação direta com o Supabase para garantir que os dados renderizados pertencem estritamente ao usuário da sessão.

Herança de Layout:

A página é renderizada dentro do (academy)/layout.tsx, mantendo a Sidebar e a consistência visual.

Data Fetching (Dupla Camada):

Camada 1 (Auth): Recupera o email e ID do auth.users (imutáveis pelo frontend).

Camada 2 (Public): Recupera (ou simula, no MVP) dados estendidos como "Cargo", "Bio" e "Telefone" da tabela profiles.

Renderização de Formulário Híbrido:

Campos sensíveis (Email) são travados (readOnly).

Campos editáveis (Nome, Bio) são abertos.

Nota: Para o MVP, focaremos na exibição elegante. A edição real geralmente envolve um Client Component separado ou Server Actions, mas aqui entregaremos a estrutura completa de visualização.



**2. O Código (A Implementação)**

Este arquivo deve ser salvo em: **web/src/app/(academy)/portal/profile/page.tsx**

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

import { 

&nbsp; User, 

&nbsp; Mail, 

&nbsp; Briefcase, 

&nbsp; MapPin, 

&nbsp; ShieldCheck, 

&nbsp; Camera,

&nbsp; Save

} from "lucide-react";



export default async function ProfilePage() {

&nbsp; // 1. Conexão Segura

&nbsp; const supabase = await createClient();



&nbsp; // 2. Verificar Sessão

&nbsp; const { data: { user } } = await supabase.auth.getUser();



&nbsp; if (!user) {

&nbsp;   return redirect("/login");

&nbsp; }



&nbsp; // 3. Dados do Usuário (Fallback seguro se não houver metadados)

&nbsp; const userData = {

&nbsp;   name: user.user\_metadata.full\_name || "Usuário VaultMind",

&nbsp;   email: user.email,

&nbsp;   role: "Trainee em Tecnologia",

&nbsp;   location: "Piracicaba, SP (Remoto)",

&nbsp;   joinDate: new Date(user.created\_at).toLocaleDateString('pt-BR'),

&nbsp;   uid: user.id

&nbsp; };



&nbsp; return (

&nbsp;   <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

&nbsp;     

&nbsp;     {/\* CABEÇALHO \*/}

&nbsp;     <div>

&nbsp;       <h1 className="text-3xl font-bold text-white tracking-tight">Meu Perfil</h1>

&nbsp;       <p className="text-neutral-400 mt-1">Gerencie suas informações pessoais e de segurança.</p>

&nbsp;     </div>



&nbsp;     <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

&nbsp;       

&nbsp;       {/\* COLUNA ESQUERDA - CARTÃO DE IDENTIDADE \*/}

&nbsp;       <div className="md:col-span-1 space-y-6">

&nbsp;         <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden">

&nbsp;           

&nbsp;           {/\* Efeito de Fundo \*/}

&nbsp;           <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-emerald-900/20 to-transparent pointer-events-none" />



&nbsp;           {/\* Avatar \*/}

&nbsp;           <div className="relative mb-4 group">

&nbsp;             <div className="w-24 h-24 rounded-full bg-neutral-800 border-4 border-neutral-950 flex items-center justify-center text-emerald-500 text-3xl font-bold overflow-hidden shadow-xl">

&nbsp;               {userData.name.charAt(0)}

&nbsp;             </div>

&nbsp;             <button className="absolute bottom-0 right-0 p-2 bg-emerald-600 rounded-full text-white hover:bg-emerald-500 transition-colors shadow-lg group-hover:scale-110">

&nbsp;               <Camera className="w-4 h-4" />

&nbsp;             </button>

&nbsp;           </div>



&nbsp;           <h2 className="text-xl font-bold text-white">{userData.name}</h2>

&nbsp;           <p className="text-sm text-emerald-500 font-medium mb-4">{userData.role}</p>



&nbsp;           <div className="w-full pt-4 border-t border-neutral-800 flex flex-col gap-3 text-sm text-neutral-400">

&nbsp;             <div className="flex items-center gap-2">

&nbsp;               <MapPin className="w-4 h-4 text-neutral-600" />

&nbsp;               <span>{userData.location}</span>

&nbsp;             </div>

&nbsp;             <div className="flex items-center gap-2">

&nbsp;               <ShieldCheck className="w-4 h-4 text-neutral-600" />

&nbsp;               <span>Membro desde {userData.joinDate}</span>

&nbsp;             </div>

&nbsp;           </div>

&nbsp;         </div>

&nbsp;       </div>



&nbsp;       {/\* COLUNA DIREITA - FORMULÁRIO DE DADOS \*/}

&nbsp;       <div className="md:col-span-2">

&nbsp;         <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">

&nbsp;           <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">

&nbsp;             <User className="w-5 h-5 text-emerald-500" />

&nbsp;             Informações Pessoais

&nbsp;           </h3>



&nbsp;           <form className="space-y-6">

&nbsp;             

&nbsp;             <div className="grid md:grid-cols-2 gap-6">

&nbsp;               <div className="space-y-2">

&nbsp;                 <label className="text-xs font-medium text-neutral-500 uppercase">Nome Completo</label>

&nbsp;                 <input 

&nbsp;                   type="text" 

&nbsp;                   defaultValue={userData.name}

&nbsp;                   className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"

&nbsp;                 />

&nbsp;               </div>

&nbsp;               <div className="space-y-2">

&nbsp;                 <label className="text-xs font-medium text-neutral-500 uppercase">Cargo / Função</label>

&nbsp;                 <div className="relative">

&nbsp;                   <input 

&nbsp;                     type="text" 

&nbsp;                     defaultValue={userData.role}

&nbsp;                     className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all pl-10"

&nbsp;                   />

&nbsp;                   <Briefcase className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />

&nbsp;                 </div>

&nbsp;               </div>

&nbsp;             </div>



&nbsp;             <div className="space-y-2">

&nbsp;               <label className="text-xs font-medium text-neutral-500 uppercase">Email Corporativo</label>

&nbsp;               <div className="relative opacity-75">

&nbsp;                 <input 

&nbsp;                   type="email" 

&nbsp;                   defaultValue={userData.email}

&nbsp;                   readOnly

&nbsp;                   className="w-full bg-neutral-950/50 border border-neutral-800 rounded-lg px-4 py-3 text-neutral-400 cursor-not-allowed pl-10"

&nbsp;                 />

&nbsp;                 <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-3.5" />

&nbsp;                 <span className="absolute right-4 top-3.5 text-xs text-emerald-500/80 font-medium flex items-center gap-1">

&nbsp;                   <ShieldCheck className="w-3 h-3" /> Verificado

&nbsp;                 </span>

&nbsp;               </div>

&nbsp;               <p className="text-\[10px] text-neutral-600 pl-1">O email de acesso não pode ser alterado manualmente.</p>

&nbsp;             </div>



&nbsp;             <div className="pt-4 flex justify-end">

&nbsp;               <button 

&nbsp;                 type="button" // Em produção, seria 'submit' com Server Action

&nbsp;                 className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-lg font-medium transition-all shadow-lg shadow-emerald-900/20"

&nbsp;               >

&nbsp;                 <Save className="w-4 h-4" />

&nbsp;                 Salvar Alterações

&nbsp;               </button>

&nbsp;             </div>



&nbsp;           </form>

&nbsp;         </div>

&nbsp;       </div>



&nbsp;     </div>

&nbsp;   </div>

&nbsp; );

}

========================================================================================================================

========================================================================================================================



**{http://localhost:3000/primeiro-emprego}**

A página "Primeiro Emprego" (/primeiro-emprego) é uma Landing Page estratégica focada em conversão (captura de candidatos). Diferente do Portal (que é restrito), esta é uma página pública, mas com foco total no formulário de inscrição.

Aqui está o detalhamento da rotina de execução e o código mestre para esta rota.

**1. A Rotina (O Fluxo de Execução)**

Quando o usuário acessa http://localhost:3000/primeiro-emprego, o sistema segue este protocolo:

**Roteamento Público:**

O Next.js identifica a rota e carrega web/src/app/(public)/primeiro-emprego/page.tsx.

Por estar no grupo (public), ela herda automaticamente a Navbar e o Footer institucionais.

Renderização Híbrida:

Server Side: A página principal (page.tsx) carrega o texto, os benefícios e a estrutura visual instantaneamente para SEO.

Client Side: O formulário de inscrição (PrimeiroEmpregoForm.tsx) é hidratado no navegador para permitir a digitação e validação em tempo real.

Ação de Negócio (Server Action):

Ao submeter o formulário, os dados são enviados para a tabela leads no Supabase (ou um endpoint de API), e o usuário recebe um feedback visual.



**2. O Código (A Implementação)**

Para esta página funcionar, precisamos de 2 arquivos: a Página (Visual) e o Formulário (Lógica).



**A. A Página Mestra (Server Component)**

Arquivo: **web/src/app/(public)/primeiro-emprego/page.tsx**

import Image from "next/image";

import { Navbar } from "@/components/Navbar";

import { PrimeiroEmpregoForm } from "./PrimeiroEmpregoForm"; // Componente do Formulário

import { CheckCircle2, Shield, Users, ArrowRight } from "lucide-react";



export default function PrimeiroEmpregoPage() {

&nbsp; 

&nbsp; const benefits = \[

&nbsp;   { title: "Mentoria Técnica", desc: "Acompanhamento direto com Seniores." },

&nbsp;   { title: "Hardware Real", desc: "Laboratórios práticos de manutenção." },

&nbsp;   { title: "Certificação", desc: "Válida em todo território nacional." }

&nbsp; ];



&nbsp; return (

&nbsp;   <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-emerald-500/30 flex flex-col">

&nbsp;     

&nbsp;     <Navbar />



&nbsp;     <main className="flex-1 pt-24 pb-12">

&nbsp;       <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center min-h-\[80vh]">

&nbsp;         

&nbsp;         {/\* LADO ESQUERDO: Copy de Venda \*/}

&nbsp;         <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">

&nbsp;           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/20 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest">

&nbsp;             <Users className="w-3 h-3" /> Vagas Abertas 2026

&nbsp;           </div>

&nbsp;           

&nbsp;           <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">

&nbsp;             Sua carreira começa <br />

&nbsp;             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">

&nbsp;               antes do diploma.

&nbsp;             </span>

&nbsp;           </h1>

&nbsp;           

&nbsp;           <p className="text-lg text-neutral-400 leading-relaxed max-w-lg">

&nbsp;             O Programa Primeiro Emprego do VaultMindOS não é apenas um curso. 

&nbsp;             É uma imersão corporativa que coloca você dentro do mercado de tecnologia real, 

&nbsp;             conectando seu potencial às maiores empresas da região.

&nbsp;           </p>



&nbsp;           <ul className="space-y-4">

&nbsp;             {benefits.map((item, i) => (

&nbsp;               <li key={i} className="flex items-center gap-3">

&nbsp;                 <div className="p-1 rounded-full bg-emerald-500/10">

&nbsp;                   <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />

&nbsp;                 </div>

&nbsp;                 <div>

&nbsp;                   <strong className="text-white block">{item.title}</strong>

&nbsp;                   <span className="text-sm text-neutral-500">{item.desc}</span>

&nbsp;                 </div>

&nbsp;               </li>

&nbsp;             ))}

&nbsp;           </ul>

&nbsp;         </div>



&nbsp;         {/\* LADO DIREITO: O Formulário (Card Flutuante) \*/}

&nbsp;         <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 delay-200">

&nbsp;           {/\* Efeito de Glow \*/}

&nbsp;           <div className="absolute inset-0 bg-emerald-500/10 blur-\[100px] rounded-full pointer-events-none" />

&nbsp;           

&nbsp;           <div className="relative bg-neutral-900 border border-neutral-800 p-6 md:p-8 rounded-2xl shadow-2xl">

&nbsp;             <div className="mb-6">

&nbsp;               <h3 className="text-xl font-bold text-white flex items-center gap-2">

&nbsp;                 <Shield className="w-5 h-5 text-emerald-500" />

&nbsp;                 Aplicação para Bolsa

&nbsp;               </h3>

&nbsp;               <p className="text-sm text-neutral-500">Preencha seus dados para análise de perfil.</p>

&nbsp;             </div>

&nbsp;             

&nbsp;             {/\* Injeção do Componente de Formulário \*/}

&nbsp;             <PrimeiroEmpregoForm />

&nbsp;           </div>

&nbsp;         </div>



&nbsp;       </div>

&nbsp;     </main>

&nbsp;     

&nbsp;   </div>

&nbsp; );

}



**B. O Formulário Interativo (Client Component)**

Arquivo: **web/src/app/(public)/primeiro-emprego/PrimeiroEmpregoForm.tsx**

"use client"; // Necessário para usar hooks e interatividade



import { useState } from "react";

import { ArrowRight, Loader2 } from "lucide-react";



export function PrimeiroEmpregoForm() {

&nbsp; const \[loading, setLoading] = useState(false);



&nbsp; async function handleSubmit(e: React.FormEvent) {

&nbsp;   e.preventDefault();

&nbsp;   setLoading(true);

&nbsp;   // Simulação de envio (Aqui entraria a chamada ao Supabase)

&nbsp;   await new Promise(resolve => setTimeout(resolve, 2000));

&nbsp;   alert("Inscrição enviada com sucesso! Verifique seu e-mail.");

&nbsp;   setLoading(false);

&nbsp; }



&nbsp; return (

&nbsp;   <form onSubmit={handleSubmit} className="space-y-4">

&nbsp;     <div className="space-y-1">

&nbsp;       <label className="text-xs font-medium text-neutral-400 uppercase">Nome Completo</label>

&nbsp;       <input 

&nbsp;         required 

&nbsp;         type="text" 

&nbsp;         placeholder="Seu nome aqui"

&nbsp;         className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"

&nbsp;       />

&nbsp;     </div>



&nbsp;     <div className="space-y-1">

&nbsp;       <label className="text-xs font-medium text-neutral-400 uppercase">WhatsApp</label>

&nbsp;       <input 

&nbsp;         required 

&nbsp;         type="tel" 

&nbsp;         placeholder="(00) 00000-0000"

&nbsp;         className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"

&nbsp;       />

&nbsp;     </div>



&nbsp;     <div className="space-y-1">

&nbsp;       <label className="text-xs font-medium text-neutral-400 uppercase">Email</label>

&nbsp;       <input 

&nbsp;         required 

&nbsp;         type="email" 

&nbsp;         placeholder="seu@email.com"

&nbsp;         className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"

&nbsp;       />

&nbsp;     </div>



&nbsp;     <div className="pt-2">

&nbsp;       <button 

&nbsp;         type="submit" 

&nbsp;         disabled={loading}

&nbsp;         className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2"

&nbsp;       >

&nbsp;         {loading ? (

&nbsp;           <Loader2 className="w-5 h-5 animate-spin" />

&nbsp;         ) : (

&nbsp;           <>

&nbsp;             Garantir minha Vaga

&nbsp;             <ArrowRight className="w-5 h-5" />

&nbsp;           </>

&nbsp;         )}

&nbsp;       </button>

&nbsp;       <p className="text-\[10px] text-center text-neutral-600 mt-3">

&nbsp;         Seus dados estão seguros. Ao enviar, você concorda com nossa política de privacidade.

&nbsp;       </p>

&nbsp;     </div>

&nbsp;   </form>

&nbsp; );

}



========================================================================================================================

========================================================================================================================



**Assistir Aula**

A página de Assistir Aula (/portal/watch/\[lessonId]) é o coração da experiência educacional. Ela utiliza o recurso de Rotas Dinâmicas do Next.js para carregar conteúdos diferentes (Aula 1, Aula 2, etc.) usando a mesma estrutura de código.

Aqui está o detalhamento da rotina técnica e o código mestre para esta funcionalidade.

1\. A Rotina (O Fluxo de Execução Dinâmica)

Quando você acessa http://localhost:3000/portal/watch/aula-1 ou .../aula-2, o sistema segue este protocolo:

Captura de Parâmetro (Slug):

O Next.js identifica que aula-1 é o valor do parâmetro \[lessonId].

Busca de Dados (Simulada):

O componente WatchPage usa esse ID para encontrar a aula correspondente no banco de dados (ou no nosso objeto de Mock, por enquanto).

Montagem do Player:

Se a aula existe, ele renderiza o vídeo (YouTube/Vimeo) e a descrição.

Se não existe, exibe uma tela de "Aula não encontrada".

Estado de Conclusão:

O botão "Marcar como Concluída" dispara uma ação visual (no MVP) ou de banco de dados (na versão final).

**2. O Código (A Implementação)**

Este arquivo deve ser salvo em: **web/src/app/(academy)/portal/watch/\[lessonId]/page.tsx**

Nota: Certifique-se de criar a pasta \[lessonId] (com colchetes) dentro de watch.



import Link from "next/link";

import { redirect } from "next/navigation";

import { 

&nbsp; CheckCircle2, 

&nbsp; ChevronLeft, 

&nbsp; ChevronRight, 

&nbsp; Play, 

&nbsp; FileText, 

&nbsp; Download 

} from "lucide-react";



// --- DADOS MOCKADOS (SIMULAÇÃO DO BANCO DE DADOS) ---

// Aqui definimos o conteúdo da "Aula 1" e "Aula 2" para teste imediato.

const lessonsDB: Record<string, {

&nbsp; title: string;

&nbsp; module: string;

&nbsp; videoId: string; // ID do YouTube para teste

&nbsp; description: string;

&nbsp; duration: string;

&nbsp; nextLessonId?: string;

&nbsp; prevLessonId?: string;

}> = {

&nbsp; "aula-1": {

&nbsp;   title: "01. Boas-vindas e Visão Geral",

&nbsp;   module: "Módulo 1: Onboarding",

&nbsp;   videoId: "LXb3EKWsInQ", // Exemplo: Vídeo de paisagem 4k (Troque pelo seu)

&nbsp;   duration: "10:42",

&nbsp;   description: "Nesta aula inaugural, apresentamos a visão macro do VaultMindOS e como você vai utilizar este sistema para acelerar sua carreira.",

&nbsp;   nextLessonId: "aula-2",

&nbsp;   prevLessonId: undefined

&nbsp; },

&nbsp; "aula-2": {

&nbsp;   title: "02. Configurando seu Ambiente",

&nbsp;   module: "Módulo 1: Onboarding",

&nbsp;   videoId: "P12M9Wd3xQ", // Exemplo genérico

&nbsp;   duration: "15:30",

&nbsp;   description: "Passo a passo completo para instalar as ferramentas necessárias (VS Code, Node.js) e preparar sua máquina para o desenvolvimento.",

&nbsp;   nextLessonId: undefined, // Fim do curso por enquanto

&nbsp;   prevLessonId: "aula-1"

&nbsp; }

};



type Props = {

&nbsp; params: Promise<{ lessonId: string }>;

};



export default async function WatchPage({ params }: Props) {

&nbsp; // 1. Capturar o ID da URL

&nbsp; const { lessonId } = await params;

&nbsp; 

&nbsp; // 2. Buscar a aula no "Banco de Dados"

&nbsp; const lesson = lessonsDB\[lessonId];



&nbsp; // 3. Se a aula não existir, redireciona para o portal

&nbsp; if (!lesson) {

&nbsp;   return redirect("/portal");

&nbsp; }



&nbsp; return (

&nbsp;   <div className="flex flex-col min-h-screen bg-neutral-950">

&nbsp;     

&nbsp;     {/\* BARRA DE NAVEGAÇÃO SUPERIOR (Modo Cinema) \*/}

&nbsp;     <div className="h-16 border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-50">

&nbsp;       <Link 

&nbsp;         href="/portal" 

&nbsp;         className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm font-medium"

&nbsp;       >

&nbsp;         <ChevronLeft className="w-4 h-4" />

&nbsp;         Voltar ao Dashboard

&nbsp;       </Link>

&nbsp;       

&nbsp;       <span className="text-sm font-mono text-emerald-500 font-bold uppercase tracking-widest">

&nbsp;         VaultMind<span className="text-white">Academy</span>

&nbsp;       </span>

&nbsp;     </div>



&nbsp;     <main className="flex-1 flex flex-col lg:flex-row">

&nbsp;       

&nbsp;       {/\* ÁREA DO VÍDEO (Esquerda/Topo) \*/}

&nbsp;       <div className="flex-1 bg-black flex flex-col">

&nbsp;         <div className="relative w-full aspect-video bg-neutral-900 shadow-2xl">

&nbsp;           {/\* Embed do YouTube Responsivo \*/}

&nbsp;           <iframe 

&nbsp;             src={`https://www.youtube.com/embed/${lesson.videoId}?autoplay=0\&rel=0\&modestbranding=1`}

&nbsp;             title={lesson.title}

&nbsp;             className="absolute top-0 left-0 w-full h-full"

&nbsp;             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"

&nbsp;             allowFullScreen

&nbsp;           />

&nbsp;         </div>



&nbsp;         {/\* Controles de Navegação da Aula \*/}

&nbsp;         <div className="p-6 flex items-center justify-between border-b border-neutral-800 lg:border-none">

&nbsp;           <div className="flex gap-4">

&nbsp;             {lesson.prevLessonId ? (

&nbsp;               <Link 

&nbsp;                 href={`/portal/watch/${lesson.prevLessonId}`}

&nbsp;                 className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors text-sm"

&nbsp;               >

&nbsp;                 <ChevronLeft className="w-4 h-4" /> Anterior

&nbsp;               </Link>

&nbsp;             ) : (

&nbsp;               <span className="text-neutral-700 text-sm cursor-not-allowed flex items-center gap-2">

&nbsp;                 <ChevronLeft className="w-4 h-4" /> Anterior

&nbsp;               </span>

&nbsp;             )}



&nbsp;             {lesson.nextLessonId ? (

&nbsp;               <Link 

&nbsp;                 href={`/portal/watch/${lesson.nextLessonId}`}

&nbsp;                 className="flex items-center gap-2 text-white hover:text-emerald-400 transition-colors text-sm font-medium"

&nbsp;               >

&nbsp;                 Próxima <ChevronRight className="w-4 h-4" />

&nbsp;               </Link>

&nbsp;             ) : (

&nbsp;               <span className="text-neutral-600 text-sm cursor-not-allowed flex items-center gap-2">

&nbsp;                 Próxima <ChevronRight className="w-4 h-4" />

&nbsp;               </span>

&nbsp;             )}

&nbsp;           </div>



&nbsp;           <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-emerald-900/20">

&nbsp;             <CheckCircle2 className="w-4 h-4" />

&nbsp;             Marcar como Concluída

&nbsp;           </button>

&nbsp;         </div>

&nbsp;       </div>



&nbsp;       {/\* SIDEBAR DE CONTEÚDO (Direita/Baixo) \*/}

&nbsp;       <div className="w-full lg:w-96 border-l border-neutral-800 bg-neutral-900/30 p-6 overflow-y-auto">

&nbsp;         

&nbsp;         <div className="mb-8">

&nbsp;           <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">

&nbsp;             {lesson.module}

&nbsp;           </span>

&nbsp;           <h1 className="text-2xl font-bold text-white mt-4 leading-tight">

&nbsp;             {lesson.title}

&nbsp;           </h1>

&nbsp;           <div className="flex items-center gap-4 mt-3 text-sm text-neutral-500">

&nbsp;             <span className="flex items-center gap-1"><Play className="w-3 h-3" /> Vídeo Aula</span>

&nbsp;             <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {lesson.duration}</span>

&nbsp;           </div>

&nbsp;         </div>



&nbsp;         <div className="space-y-6">

&nbsp;           <div>

&nbsp;             <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">

&nbsp;               <FileText className="w-4 h-4 text-emerald-500" />

&nbsp;               Descrição

&nbsp;             </h3>

&nbsp;             <p className="text-sm text-neutral-400 leading-relaxed">

&nbsp;               {lesson.description}

&nbsp;             </p>

&nbsp;           </div>



&nbsp;           <div className="pt-6 border-t border-neutral-800">

&nbsp;             <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">

&nbsp;               <Download className="w-4 h-4 text-emerald-500" />

&nbsp;               Materiais Complementares

&nbsp;             </h3>

&nbsp;             <ul className="space-y-3">

&nbsp;               <li>

&nbsp;                 <a href="#" className="block p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors group">

&nbsp;                   <p className="text-sm font-medium text-white group-hover:text-emerald-400">Slides da Apresentação</p>

&nbsp;                   <p className="text-xs text-neutral-500">PDF • 2.4 MB</p>

&nbsp;                 </a>

&nbsp;               </li>

&nbsp;               <li>

&nbsp;                 <a href="#" className="block p-3 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition-colors group">

&nbsp;                   <p className="text-sm font-medium text-white group-hover:text-emerald-400">Código Fonte Inicial</p>

&nbsp;                   <p className="text-xs text-neutral-500">ZIP • 1.1 MB</p>

&nbsp;                 </a>

&nbsp;               </li>

&nbsp;             </ul>

&nbsp;           </div>

&nbsp;         </div>



&nbsp;       </div>



&nbsp;     </main>

&nbsp;   </div>

&nbsp; );

}



========================================================================================================================

========================================================================================================================

**Scripts:**

**ESSION.ps1: Prepara o ambiente e inicia o servidor.},**

**{CLOSE\_SESSION.ps1: Encerra, comita no Git e faz backup físico},**

**{AUDIT\_STRUCTURE.ps1: Audita os arquivos do projeto}.**

Abaixo estão os scripts prontos para uso. Lembre-se que eles devem ser salvos na Raiz do Projeto



**1. 🟢 START\_SESSION.ps1**

Função: Limpa caches temporários para evitar erros de build, valida se o arquivo

de variáveis de ambiente (.env.local) existe, instala novas dependências e inicia

o servidor de desenvolvimento. Uso: Sempre execute este script ao iniciar o dia de trabalho.

\# ==============================================================================

\# PROJETO: VaultMindOS

\# SCRIPT: Protocolo de Abertura de Sessao (Versao Adaptada /web)

\# ==============================================================================

\# Forca o uso de UTF8 para evitar erros de caracteres

\[Console]::OutputEncoding = \[System.Text.Encoding]::UTF8

Write-Host "\[SISTEMA] Iniciando Protocolo de Abertura VaultMindOS..." -ForegroundColor Cyan

\# Navega para a pasta da aplicação Next.js

if (Test-Path ".\\web") {

&nbsp;   Set-Location ".\\web"

&nbsp;   Write-Host "\[PATH] Contexto definido para: /web" -ForegroundColor DarkGray

} else {

&nbsp;   Write-Host "\[ALERTA] Pasta /web não encontrada. Executando na raiz." -ForegroundColor Yellow

}

\# 1. LIMPEZA TECNICA

Write-Host "\[CACHE] Limpando cache do Turbopack..." -ForegroundColor White

if (Test-Path ".next") {

&nbsp;   Remove-Item -Recurse -Force .next

}

\# 2. VALIDACAO DE AMBIENTE

Write-Host "\[ENV] Verificando variaveis de ambiente (.env.local)..." -ForegroundColor White

if (-not (Test-Path ".env.local")) {

&nbsp;   Write-Host "\[ERRO] Arquivo .env.local nao localizado!" -ForegroundColor Red

}

\# 3. SINCRONIZACAO

Write-Host "\[NPM] Validando pacotes..." -ForegroundColor White

npm install --quiet

\# 4. START DO MOTOR

Write-Host "\[MOTOR] Inicializando VaultMindOS..." -ForegroundColor Cyan

npm run dev





**2. 🔴 CLOSE\_SESSION.ps1**

Função: Mata os processos do Node.js (para liberar portas), solicita uma mensagem de commit,

envia para o GitHub e realiza um Backup Físico robusto (espelhamento) para o

Drive J:. Uso: Execute ao finalizar uma tarefa importante ou encerrar o dia.

\# ==============================================================================

\# PROJETO: VaultMindOS

\# SCRIPT: Protocolo de Encerramento e Backup (Versao Limpa)

\# ==============================================================================

\[Console]::OutputEncoding = \[System.Text.Encoding]::UTF8

Write-Host "\[SISTEMA] Iniciando Protocolo de Selagem VaultMindOS..." -ForegroundColor Cyan

\# 1. PARADA DOS PROCESSOS

Write-Host "\[PROCESS] Encerrando processos Node.js..." -ForegroundColor White

Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

\# 2. CONSOLIDACAO NO GITHUB

$Mensagem = Read-Host "Descreva a evolucao deste commit"

Write-Host "\[GITHUB] Sincronizando com GitHub..." -ForegroundColor Green

git add .

git commit -m "feat(vaultmind): $Mensagem"

git push origin main

\# 3. BACKUP FISICO

\# Define o destino com ano corrente (baseado no contexto 2026)

$Destino = "J:\\VaultMindOS\_BK2026"

Write-Host "\[BACKUP] Espelhando para o volume BACKUP (J:)..." -ForegroundColor Yellow

if (-not (Test-Path $Destino)) {

&nbsp;  New-Item -ItemType Directory -Path $Destino -Force

}

\# Robocopy configurado para excluir node\_modules e caches para economizar espaço e tempo

\# Backup da Raiz E:\\Projetos\\VaultMindOS

robocopy "E:\\Projetos\\VaultMindOS" $Destino /E /Z /R:5 /W:5 /XD node\_modules .next .git /V /MT:8

\# 4. STATUS FINAL

$Data = Get-Date -Format "dd/MM/yyyy HH:mm"

Write-Host "\[OK] Sessao encerrada e blindada as $Data." -ForegroundColor Green



**3. 🔍 AUDIT\_STRUCTURE.ps1**

Função: Percorre recursivamente a pasta src da aplicação,

lista todos os arquivos, seus tamanhos em KB e data de modificação.

Útil para encontrar arquivos pesados ou verificar se você está trabalhando na pasta certa.



=======================================================================================================================

========================================================================================================================



**Envio e Recebimento de E-mails e Geração de Leads**

A rotina de Envio e Recebimento de E-mails e Geração de Leads é uma funcionalidade "invisível" (Backend) que conecta o formulário de inscrição (/primeiro-emprego) com a nossa base de dados e sistemas de notificação.

No VaultMindOS, nós não temos uma "página de email" visível. O que temos é uma API Route (Rota de Servidor) que processa os dados enviados pelo formulário.

Aqui está o detalhamento da arquitetura técnica e o código da API que gerencia isso.

**1. A Rotina (O Fluxo de Dados)**

Quando o usuário clica em "Garantir minha Vaga" na página /primeiro-emprego:

Captura (Frontend): O componente PrimeiroEmpregoForm.tsx coleta Nome, Email e WhatsApp.

Disparo (Server Action): O formulário envia esses dados para a rota de API /api/leads/register.

Processamento (Backend):

Validação: A API verifica se o email é válido e se já não existe na base.

Gravação: Salva o lead na tabela leads\_primeiro\_emprego do Supabase.

Notificação (Email Transacional): Usa um provedor de email (como Resend ou Supabase Auth Mailer) para enviar um "E-mail de Boas-vindas" automático para o candidato.

Feedback: A API responde com "Sucesso", e o formulário mostra o alerta visual.

**2. O Código (A Implementação da API)**

Para que isso funcione, precisamos criar uma Rota de API no Next.js.

Arquivo: **web/src/app/api/leads/register/route.ts**

import { createClient } from "@/utils/supabase/server";

import { NextResponse } from "next/server";

// Importação opcional: Se usarmos Resend para emails transacionais bonitos

// import { Resend } from 'resend'; 



export async function POST(request: Request) {

&nbsp; try {

&nbsp;   // 1. Receber e Ler os Dados do Formulário

&nbsp;   const body = await request.json();

&nbsp;   const { name, email, whatsapp } = body;



&nbsp;   // 2. Validação Básica

&nbsp;   if (!name || !email || !whatsapp) {

&nbsp;     return NextResponse.json(

&nbsp;       { error: "Todos os campos são obrigatórios." },

&nbsp;       { status: 400 }

&nbsp;     );

&nbsp;   }



&nbsp;   // 3. Conexão com Banco de Dados (Supabase)

&nbsp;   const supabase = await createClient();



&nbsp;   // 4. Salvar o Lead na Tabela

&nbsp;   const { error: dbError } = await supabase

&nbsp;     .from("leads\_primeiro\_emprego")

&nbsp;     .insert(\[

&nbsp;       {

&nbsp;         full\_name: name,

&nbsp;         email: email,

&nbsp;         whatsapp: whatsapp,

&nbsp;         status: "novo", // Status inicial no funil

&nbsp;         source: "landing\_page\_v1",

&nbsp;         created\_at: new Date().toISOString(),

&nbsp;       },

&nbsp;     ]);



&nbsp;   if (dbError) {

&nbsp;     console.error("Erro no Supabase:", dbError);

&nbsp;     return NextResponse.json(

&nbsp;       { error: "Erro ao salvar inscrição. Tente novamente." },

&nbsp;       { status: 500 }

&nbsp;     );

&nbsp;   }



&nbsp;   // 5. Disparo de E-mail (Simulação / Integração Futura)

&nbsp;   // Aqui é onde conectaríamos com o Resend/SendGrid para enviar o email real.

&nbsp;   // Por enquanto, apenas logamos que o email "deveria" ser enviado.

&nbsp;   console.log(`\[EMAIL SYSTEM] Enviando boas-vindas para: ${email}`);

&nbsp;   

&nbsp;   /\* // Exemplo de código real com Resend:

&nbsp;   await resend.emails.send({

&nbsp;     from: 'VaultMind <nao-responda@vaultmind.com.br>',

&nbsp;     to: email,

&nbsp;     subject: 'Confirmação: Sua aplicação foi recebida!',

&nbsp;     html: '<p>Olá ' + name + ', recebemos sua inscrição...</p>'

&nbsp;   });

&nbsp;   \*/



&nbsp;   // 6. Resposta de Sucesso

&nbsp;   return NextResponse.json({ 

&nbsp;     success: true, 

&nbsp;     message: "Inscrição realizada com sucesso!" 

&nbsp;   });



&nbsp; } catch (error) {

&nbsp;   return NextResponse.json(

&nbsp;     { error: "Erro interno do servidor." },

&nbsp;     { status: 500 }

&nbsp;   );

&nbsp; }

}



**3. Atualização no Frontend (Conectando as pontas)**

Agora, precisamos atualizar o PrimeiroEmpregoForm.tsx para chamar essa API de verdade, em vez de apenas simular com setTimeout.

Arquivo: **web/src/app/(public)/primeiro-emprego/PrimeiroEmpregoForm.tsx (Trecho atualizado)**

// ... imports ...



export function PrimeiroEmpregoForm() {

&nbsp; const \[loading, setLoading] = useState(false);



&nbsp; async function handleSubmit(e: React.FormEvent) {

&nbsp;   e.preventDefault();

&nbsp;   setLoading(true);



&nbsp;   const form = e.target as HTMLFormElement;

&nbsp;   const formData = {

&nbsp;       name: (form\[0] as HTMLInputElement).value,

&nbsp;       whatsapp: (form\[1] as HTMLInputElement).value,

&nbsp;       email: (form\[2] as HTMLInputElement).value

&nbsp;   };



&nbsp;   try {

&nbsp;       // CHAMADA REAL PARA A NOSSA API

&nbsp;       const response = await fetch('/api/leads/register', {

&nbsp;           method: 'POST',

&nbsp;           headers: { 'Content-Type': 'application/json' },

&nbsp;           body: JSON.stringify(formData)

&nbsp;       });



&nbsp;       const data = await response.json();



&nbsp;       if (!response.ok) throw new Error(data.error);



&nbsp;       alert("✅ " + data.message);

&nbsp;       form.reset(); // Limpa o formulário



&nbsp;   } catch (error: any) {

&nbsp;       alert("❌ Erro: " + error.message);

&nbsp;   } finally {

&nbsp;       setLoading(false);

&nbsp;   }

&nbsp; }

&nbsp; 

&nbsp; // ... resto do JSX ...

}

**Resumo: A "página" de geração de leads é, na verdade, uma dupla dinâmica:**

**O Formulário Visual (Frontend) coleta os dados.**

**A Rota de API (Backend) processa, salva no banco e (futuramente) dispara o e-mail.**





**Além do Formulário (Frontend) e da Rota de API (Backend) que detalhei anteriormente**,

existe uma terceira "engrenagem" fundamental para que esse processo seja considerado

completo e seguro no ecossistema VaultMindOS:

Trata-se da Definição da Tabela no Banco de Dados (Supabase).

Sem essa tabela criada com os tipos corretos e as políticas de segurança (RLS),

a API /api/leads/register falhará ao tentar salvar os dados.

Aqui está o código SQL e a rotina de segurança vinculada a este processo.



**1. A Rotina (O Contrato de Dados)**

Estrutura: Precisamos de uma tabela que aceite os campos enviados

(full\_name, email, whatsapp).

**Segurança (RLS):**

A tabela deve permitir INSERT (gravação) para qualquer pessoa (público),

pois é um formulário de lead.

A tabela deve BLOQUEAR SELECT (leitura) para o público.

Ninguém pode acessar api/leads e baixar a lista de inscritos, apenas o Admin.

**2. O Código (SQL de Infraestrutura)**

Você deve executar este comando no SQL Editor do seu Dashboard do Supabase

para criar a infraestrutura que recebe os leads.



**SQL**

**-- 1. Criação da Tabela de Leads**

**CREATE TABLE IF NOT EXISTS leads\_primeiro\_emprego (**

&nbsp; id UUID DEFAULT gen\_random\_uuid() PRIMARY KEY,

&nbsp; full\_name TEXT NOT NULL,

&nbsp; email TEXT NOT NULL, -- Não usamos UNIQUE aqui propositalmente para permitir que a pessoa tente de novo se errar algo

&nbsp; whatsapp TEXT NOT NULL,

&nbsp; status TEXT DEFAULT 'novo' CHECK (status IN ('novo', 'contatado', 'convertido', 'descartado')),

&nbsp; source TEXT DEFAULT 'site\_v1',

&nbsp; created\_at TIMESTAMPTZ DEFAULT NOW(),

&nbsp; notes TEXT -- Campo para anotações internas da equipe de vendas

);



-- 2. Habilitar Segurança RLS (Obrigatorio)

ALTER TABLE leads\_primeiro\_emprego ENABLE ROW LEVEL SECURITY;



-- 3. Política: Público pode INSERIR (Criar lead)

CREATE POLICY "Public can insert leads" 

ON leads\_primeiro\_emprego 

FOR INSERT 

TO anon, authenticated 

WITH CHECK (true);



-- 4. Política: Apenas Admins podem LER (Ver lista)

-- Nota: Ajustaremos a regra de 'admin' futuramente. 

-- Por enquanto, bloqueamos o acesso público de leitura.

CREATE POLICY "Public cannot read leads" 

ON leads\_primeiro\_emprego 

FOR SELECT 

TO anon 

USING (false); 

-- Isso garante que se alguem tentar dar um 'fetch' na tabela pelo navegador, retornará vazio.



**Resumo do Ecossistema de Leads**

Portanto, o sistema completo de geração de leads é composto por 3 Peças:

Frontend (PrimeiroEmpregoForm.tsx): A interface onde o usuário digita.

Backend (route.ts): O "porteiro" que valida e encaminha os dados.

Database (SQL acima): O "cofre" seguro onde os dados repousam.



========================================================================================================================

========================================================================================================================





========================================================================================================================

========================================================================================================================







========================================================================================================================

========================================================================================================================



