import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { auth, storage as firebaseStorage } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
import {
  getSiteContent,
  getIsAdmin,
  updateSala,
  updateSiteSettings,
  type Sala,
  type SiteSettings,
} from "@/lib/site.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminPage,
});

type SettingsForm = Omit<SiteSettings, "id" | "updated_at">;

function Field({
  label,
  value,
  onChange,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}) {
  return (
    <label className="block text-[10px] uppercase tracking-[0.2em] text-charcoal/60">
      {label}
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full border border-charcoal/20 bg-white/60 px-4 py-3 text-sm normal-case tracking-normal text-charcoal outline-none focus:border-oak"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full border border-charcoal/20 bg-white/60 px-4 py-3 text-sm normal-case tracking-normal text-charcoal outline-none focus:border-oak"
        />
      )}
    </label>
  );
}

function AdminPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchContent = useServerFn(getSiteContent);
  const fetchIsAdmin = useServerFn(getIsAdmin);
  const saveSettings = useServerFn(updateSiteSettings);
  const saveSala = useServerFn(updateSala);

  const adminQuery = useQuery({ queryKey: ["is-admin"], queryFn: () => fetchIsAdmin() });
  const contentQuery = useQuery({ queryKey: ["site-content-admin"], queryFn: () => fetchContent() });

  const [form, setForm] = useState<SettingsForm | null>(null);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (contentQuery.data?.settings) {
      const { id: _id, updated_at: _u, ...rest } = contentQuery.data.settings;
      const raw = contentQuery.data.rawMedia;
      setForm({
        ...rest,
        hero_image_url: raw?.hero_image_url || rest.hero_image_url,
        tour_video_url: raw?.tour_video_url || rest.tour_video_url,
      });
    }
    if (contentQuery.data?.salas) setSalas(contentQuery.data.salas);
  }, [contentQuery.data]);

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await signOut(auth);
    navigate({ to: "/auth", replace: true });
  }

  async function uploadMedia(file: File, field: "hero_image_url" | "tour_video_url") {
    setUploading(field);
    try {
      const path = `${field === "hero_image_url" ? "hero" : "tour"}/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
      const storageRef = ref(firebaseStorage, `site-media/${path}`);
      await uploadBytes(storageRef, file);
      
      setForm((prev) => (prev ? { ...prev, [field]: `site-media/${path}` } : prev));
      toast.success("Arquivo enviado. Clique em salvar para publicar.");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha no envio.");
    } finally {
      setUploading(null);
    }
  }

  async function handleSaveSettings() {
    if (!form) return;
    setSaving(true);
    try {
      await saveSettings({ data: form });
      toast.success("Conteúdo salvo.");
      queryClient.invalidateQueries();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível salvar.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveSala(sala: Sala) {
    try {
      await saveSala({
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
      queryClient.invalidateQueries();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível salvar a sala.");
    }
  }

  if (adminQuery.data && !adminQuery.data.isAdmin) {
    return (
      <main className="min-h-screen bg-sand text-charcoal grid place-items-center px-6 text-center">
        <div>
          <h1 className="font-serif text-3xl mb-3">Sem permissão</h1>
          <p className="text-sm text-charcoal/60 font-light mb-6">
            Esta conta não tem acesso de administrador.
          </p>
          <button onClick={handleSignOut} className="text-[10px] uppercase tracking-[0.2em] hover:text-oak">
            Sair
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-sand text-charcoal px-6 md:px-10 py-12">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold">Painel</span>
            <h1 className="font-serif text-4xl mt-2">Editar o site</h1>
          </div>
          <div className="flex gap-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/60">
            <Link to="/" className="hover:text-oak">
              Ver site
            </Link>
            <button onClick={handleSignOut} className="hover:text-oak">
              Sair
            </button>
          </div>
        </header>

        {!form ? (
          <p className="text-sm text-charcoal/60">Carregando...</p>
        ) : (
          <div className="flex flex-col gap-12">
            <section className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl">Início (hero)</h2>
              <Field label="Linha superior" value={form.hero_eyebrow} onChange={(v) => setForm({ ...form, hero_eyebrow: v })} />
              <Field label="Título — 1ª linha" value={form.hero_title_line1} onChange={(v) => setForm({ ...form, hero_title_line1: v })} />
              <Field label="Título — 2ª linha (itálico)" value={form.hero_title_line2} onChange={(v) => setForm({ ...form, hero_title_line2: v })} />
              <Field label="Frase de apoio" textarea value={form.hero_subtitle} onChange={(v) => setForm({ ...form, hero_subtitle: v })} />
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/60">Foto do topo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadMedia(file, "hero_image_url");
                  }}
                  className="mt-2 block w-full text-xs"
                />
                <p className="mt-2 text-xs text-charcoal/50 break-all">{form.hero_image_url}</p>
                {uploading === "hero_image_url" && <p className="text-xs text-oak">Enviando...</p>}
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl">Sobre o espaço</h2>
              <Field label="Título" value={form.about_title} onChange={(v) => setForm({ ...form, about_title: v })} />
              <Field label="Texto" textarea value={form.about_text} onChange={(v) => setForm({ ...form, about_text: v })} />
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl">Tour em vídeo</h2>
              <Field label="Título" value={form.tour_title} onChange={(v) => setForm({ ...form, tour_title: v })} />
              <Field label="Texto" textarea value={form.tour_text} onChange={(v) => setForm({ ...form, tour_text: v })} />
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-charcoal/60">Vídeo</span>
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void uploadMedia(file, "tour_video_url");
                  }}
                  className="mt-2 block w-full text-xs"
                />
                <p className="mt-2 text-xs text-charcoal/50 break-all">{form.tour_video_url}</p>
                {uploading === "tour_video_url" && <p className="text-xs text-oak">Enviando...</p>}
              </div>
            </section>

            <section className="flex flex-col gap-4">
              <h2 className="font-serif text-2xl">Contato e endereço</h2>
              <Field label="Link do WhatsApp" value={form.whatsapp_url} onChange={(v) => setForm({ ...form, whatsapp_url: v })} />
              <Field label="Instagram" value={form.instagram_url} onChange={(v) => setForm({ ...form, instagram_url: v })} />
              <Field label="Endereço — linha 1" value={form.address_line1} onChange={(v) => setForm({ ...form, address_line1: v })} />
              <Field label="Endereço — linha 2" value={form.address_line2} onChange={(v) => setForm({ ...form, address_line2: v })} />
              <Field label="Link do Google Maps" value={form.maps_url} onChange={(v) => setForm({ ...form, maps_url: v })} />
            </section>

            <button
              onClick={handleSaveSettings}
              disabled={saving}
              className="self-start bg-charcoal px-8 py-4 text-[11px] uppercase tracking-[0.25em] text-sand transition-colors hover:bg-oak disabled:opacity-50"
            >
              {saving ? "Salvando..." : "Salvar conteúdo"}
            </button>

            <section className="flex flex-col gap-8 border-t border-charcoal/10 pt-12">
              <h2 className="font-serif text-2xl">Salas</h2>
              {salas.map((sala, idx) => (
                <div key={sala.id} className="border border-charcoal/10 p-6 flex flex-col gap-4 bg-white/40">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-3xl">{sala.numero}</span>
                    <select
                      value={sala.status}
                      onChange={(e) => {
                        const next = [...salas];
                        next[idx] = { ...sala, status: e.target.value };
                        setSalas(next);
                      }}
                      className="border border-charcoal/20 bg-white/60 px-3 py-2 text-xs"
                    >
                      <option value="Disponível">Disponível</option>
                      <option value="Ocupada">Ocupada</option>
                    </select>
                  </div>
                  <Field
                    label="Nome do doutor"
                    value={sala.ocupante ?? ""}
                    onChange={(v) => {
                      const next = [...salas];
                      next[idx] = { ...sala, ocupante: v };
                      setSalas(next);
                    }}
                  />
                  <Field
                    label="Especialidade"
                    value={sala.especialidade ?? ""}
                    onChange={(v) => {
                      const next = [...salas];
                      next[idx] = { ...sala, especialidade: v };
                      setSalas(next);
                    }}
                  />
                  <Field
                    label="Descrição"
                    textarea
                    value={sala.nota ?? ""}
                    onChange={(v) => {
                      const next = [...salas];
                      next[idx] = { ...sala, nota: v };
                      setSalas(next);
                    }}
                  />
                  <Field
                    label="Instagram"
                    value={sala.instagram ?? ""}
                    onChange={(v) => {
                      const next = [...salas];
                      next[idx] = { ...sala, instagram: v };
                      setSalas(next);
                    }}
                  />
                  <Field
                    label="Site"
                    value={sala.site ?? ""}
                    onChange={(v) => {
                      const next = [...salas];
                      next[idx] = { ...sala, site: v };
                      setSalas(next);
                    }}
                  />
                  <Field
                    label="WhatsApp"
                    value={sala.whatsapp ?? ""}
                    onChange={(v) => {
                      const next = [...salas];
                      next[idx] = { ...sala, whatsapp: v };
                      setSalas(next);
                    }}
                  />
                  <button
                    onClick={() => void handleSaveSala(sala)}
                    className="self-start border border-charcoal/30 px-6 py-3 text-[10px] uppercase tracking-[0.25em] hover:border-oak hover:text-oak"
                  >
                    Salvar sala {sala.numero}
                  </button>
                </div>
              ))}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}
