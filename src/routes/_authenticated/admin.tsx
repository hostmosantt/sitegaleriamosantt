import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import {
  getSiteContent,
  getIsAdmin,
  updateSala,
  type Sala,
} from "@/lib/site.functions";
import {
  LogOut,
  Building2,
  Save,
  Globe
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

function Field({
  label,
  value,
  onChange,
  textarea,
}: Readonly<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}>) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold uppercase tracking-wider text-charcoal/70 flex items-center gap-2">
        {label}
      </label>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-oak focus:bg-white/80 focus:ring-4 focus:ring-oak/10 shadow-sm"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-white/40 bg-white/50 backdrop-blur-sm px-4 py-3 text-sm text-charcoal outline-none transition-all focus:border-oak focus:bg-white/80 focus:ring-4 focus:ring-oak/10 shadow-sm"
        />
      )}
    </div>
  );
}

function Sidebar({ onSignOut }: Readonly<{ onSignOut: () => void }>) {
  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-72 bg-white/40 backdrop-blur-xl border-r border-white/50 flex-col p-6 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
      <div className="flex items-center gap-4 mb-12 px-2">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-oak to-charcoal flex items-center justify-center text-sand shadow-lg shadow-oak/20">
          <Building2 className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-serif text-2xl font-medium text-charcoal leading-none">Mosantt</h2>
          <span className="text-[10px] uppercase tracking-widest text-charcoal/50 font-semibold mt-1 block">Painel Admin</span>
        </div>
      </div>
      
      <nav className="flex flex-col gap-2 flex-1">
        <button className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all bg-white/80 text-oak shadow-sm scale-[1.02]">
          <Building2 className="w-5 h-5" /> Gestão de Salas
        </button>
      </nav>
      
      <div className="flex flex-col gap-2 mt-auto pt-6 border-t border-charcoal/10">
        <Link to="/" className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-charcoal/60 hover:bg-white/50 hover:text-charcoal transition-all">
          <Globe className="w-5 h-5" /> Visualizar Site
        </Link>
        <button onClick={onSignOut} className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold text-red-500/80 hover:bg-red-500/10 hover:text-red-600 transition-all text-left">
          <LogOut className="w-5 h-5" /> Desconectar
        </button>
      </div>
    </aside>
  );
}

function SalaEditor({ sala, onSave }: Readonly<{ sala: Sala; onSave: (sala: Sala) => Promise<void> }>) {
  const [local, setLocal] = useState(sala);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setLocal(sala);
  }, [sala]);

  const handleSave = async () => {
    setIsSaving(true);
    await onSave(local);
    setIsSaving(false);
  };

  const isOcupada = local.status === "Ocupada";

  return (
    <div className="bg-white/60 backdrop-blur-xl border border-white/60 rounded-3xl p-6 md:p-8 shadow-xl shadow-charcoal/5 transition-all hover:shadow-2xl flex flex-col gap-6 relative overflow-hidden group">
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-oak/10 rounded-full blur-3xl group-hover:bg-oak/20 transition-all duration-700 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-charcoal/5 relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-charcoal to-charcoal/80 text-sand flex items-center justify-center font-serif text-3xl shadow-lg shadow-charcoal/10">
             {local.numero}
          </div>
          <div>
            <h3 className="font-serif text-2xl text-charcoal">Sala {local.numero}</h3>
            <span className="text-[10px] uppercase tracking-widest text-charcoal/50 font-bold">Configuração e Status</span>
          </div>
        </div>
        
        <button 
          onClick={() => setLocal({ ...local, status: isOcupada ? "Disponível" : "Ocupada" })}
          className="flex items-center gap-3 bg-white/80 p-2 pl-4 rounded-xl shadow-sm border border-white cursor-pointer hover:bg-white transition-all hover:scale-105 active:scale-95"
          title="Clique para alternar o status"
        >
          <div className={`w-2.5 h-2.5 rounded-full ${isOcupada ? 'bg-red-400' : 'bg-emerald-400'} ${isOcupada ? '' : 'animate-pulse'}`} />
          <span className="text-sm font-bold text-charcoal pr-2 select-none">
            {local.status}
          </span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <Field label="Nome do Doutor/Ocupante" value={local.ocupante ?? ""} onChange={(v) => setLocal({ ...local, ocupante: v })} />
        <Field label="Especialidade" value={local.especialidade ?? ""} onChange={(v) => setLocal({ ...local, especialidade: v })} />
        <div className="md:col-span-2">
          <Field label="Descrição" textarea value={local.nota ?? ""} onChange={(v) => setLocal({ ...local, nota: v })} />
        </div>
        <Field label="Instagram" value={local.instagram ?? ""} onChange={(v) => setLocal({ ...local, instagram: v })} />
        <Field label="Site" value={local.site ?? ""} onChange={(v) => setLocal({ ...local, site: v })} />
        <div className="md:col-span-2">
           <Field label="WhatsApp" value={local.whatsapp ?? ""} onChange={(v) => setLocal({ ...local, whatsapp: v })} />
        </div>
      </div>
      
      <div className="pt-4 flex justify-end relative z-10">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-white/80 border border-charcoal/10 px-6 py-3.5 rounded-xl text-[11px] uppercase tracking-widest font-bold text-charcoal transition-all hover:bg-charcoal hover:text-sand hover:border-charcoal disabled:opacity-50 shadow-sm"
        >
          <Save className="w-4 h-4" />
          {isSaving ? "Salvando..." : `Salvar Sala ${local.numero}`}
        </button>
      </div>
    </div>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const adminQuery = useQuery({ queryKey: ["is-admin"], queryFn: () => getIsAdmin() });
  const contentQuery = useQuery({ queryKey: ["site-content-admin"], queryFn: () => getSiteContent() });

  const [salas, setSalas] = useState<Sala[]>([]);

  useEffect(() => {
    if (contentQuery.data?.salas) {
      setSalas(contentQuery.data.salas);
    }
  }, [contentQuery.data]);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut(auth);
    await navigate({ to: "/auth", replace: true });
  }

  async function handleSaveSala(sala: Sala) {
    try {
      await updateSala({
        data: {
          id: sala.id,
          status: sala.status,
          ocupante: sala.ocupante,
          especialidade: sala.especialidade,
          nota: sala.nota,
          instagram: sala.instagram,
          site: sala.site,
          whatsapp: sala.whatsapp,
        },
      });
      toast.success(`Sala ${sala.numero} salva.`);
      await queryClient.invalidateQueries();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível salvar a sala.");
    }
  }

  if (adminQuery.data && !adminQuery.data.isAdmin) {
    return (
      <main className="min-h-screen bg-sand text-charcoal grid place-items-center px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
          <div className="absolute top-[20%] left-[20%] w-[40%] h-[40%] rounded-full bg-red-500/5 blur-[120px]" />
        </div>
        <div className="bg-white/60 backdrop-blur-xl p-12 rounded-3xl shadow-2xl border border-white/50 max-w-sm w-full relative z-10">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
             <LogOut className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-3xl mb-3 text-charcoal tracking-tight">Acesso Negado</h1>
          <p className="text-sm text-charcoal/70 font-medium mb-10 leading-relaxed">
            Esta conta não possui privilégios de administrador no sistema.
          </p>
          <button onClick={handleSignOut} className="w-full py-4 rounded-xl bg-charcoal text-sand text-xs font-bold uppercase tracking-widest hover:bg-oak transition-colors shadow-lg">
            Voltar e Sair
          </button>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-sand text-charcoal font-sans selection:bg-oak/20 flex overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-oak/10 blur-[150px]" />
        <div className="absolute -bottom-[10%] -right-[5%] w-[60%] h-[60%] rounded-full bg-charcoal/5 blur-[150px]" />
      </div>

      <Sidebar onSignOut={handleSignOut} />

      <main className="flex-1 lg:ml-72 h-screen overflow-y-auto overflow-x-hidden relative z-10">
        
        {/* Mobile Nav Header */}
        <div className="lg:hidden flex items-center justify-between p-6 bg-white/40 backdrop-blur-xl border-b border-white/50 sticky top-0 z-40">
           <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-oak to-charcoal flex items-center justify-center text-sand shadow-lg">
                <Building2 className="w-5 h-5" />
             </div>
             <h2 className="font-serif text-xl font-medium text-charcoal">Mosantt Admin</h2>
           </div>
           <button onClick={handleSignOut} className="p-2 text-charcoal/60 hover:text-red-500 transition-colors">
              <LogOut className="w-6 h-6" />
           </button>
        </div>

        <div className="max-w-5xl mx-auto p-6 md:p-12 lg:p-16">
          <header className="mb-10 lg:mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="font-serif text-4xl lg:text-5xl text-charcoal tracking-tight mb-4">
              Gerenciamento de Salas
            </h1>
            <p className="text-charcoal/60 text-sm md:text-base font-medium max-w-2xl leading-relaxed">
              Mantenha os status de disponibilidade, informações de médicos ocupantes e dados de contato das salas sempre atualizados.
            </p>
          </header>

          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
            {contentQuery.isLoading ? (
              <div className="flex flex-col items-center justify-center h-64 gap-5 bg-white/30 backdrop-blur-md rounded-3xl border border-white/50">
                 <div className="w-12 h-12 border-4 border-oak/30 border-t-oak rounded-full animate-spin" />
                 <p className="text-sm text-charcoal/60 uppercase tracking-widest font-bold">Carregando salas...</p>
              </div>
            ) : (
              <div className="pb-24">
                <div className="flex flex-col gap-10">
                  {salas.map((sala) => (
                    <SalaEditor key={sala.id} sala={sala} onSave={handleSaveSala} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
