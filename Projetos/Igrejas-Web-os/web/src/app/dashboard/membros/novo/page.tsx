import NewMemberForm from "./form"; // Importa o novo formulário inteligente

export default function NewMemberPage() {
  // ARQUITETURA LIMPA:
  // A página (Server Component) atua apenas como container.
  // O formulário (Client Component) é autônomo e busca seus próprios dados (Igrejas, Cargos, etc).
  
  return (
    <div className="max-w-[1600px] mx-auto">
       <NewMemberForm />
    </div>
  );
}