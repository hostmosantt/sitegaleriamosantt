import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Acesso restrito — Painel Mosantt" },
      { name: "description", content: "Área de acesso do administrador do site Mosantt em Rio Branco." },
      { property: "og:title", content: "Acesso restrito — Painel Mosantt" },
      { property: "og:description", content: "Área de acesso do administrador do site Mosantt." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Não foi possível entrar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-sand text-charcoal flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-serif text-3xl mb-2">Painel Mosantt</h1>
        <p className="text-sm text-charcoal/60 font-light mb-8">
          Entre para editar o site.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-[10px] uppercase tracking-[0.25em] text-charcoal/60">
            E-mail
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm tracking-normal normal-case text-charcoal outline-none focus:border-oak"
            />
          </label>
          <label className="text-[10px] uppercase tracking-[0.25em] text-charcoal/60">
            Senha
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm tracking-normal normal-case text-charcoal outline-none focus:border-oak"
            />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-charcoal px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] text-sand transition-colors hover:bg-oak disabled:opacity-50"
          >
            {loading ? "Aguarde..." : "Entrar"}
          </button>
        </form>
        <div className="mt-6 flex justify-end text-[10px] uppercase tracking-[0.2em] text-charcoal/50">
          <Link to="/" className="hover:text-oak">
            Voltar ao site
          </Link>
        </div>
      </div>
    </main>
  );
}
