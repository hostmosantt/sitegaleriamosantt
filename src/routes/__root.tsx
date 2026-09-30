import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";
import appCss from "../styles.css?url";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand text-charcoal px-6 relative overflow-hidden">
      <div className="absolute top-[10%] left-[10%] w-[40%] h-[40%] rounded-full bg-oak/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-charcoal/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-md text-center relative z-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold">Erro 404</span>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl text-charcoal leading-none tracking-tight">Página não encontrada</h1>
        <p className="mt-6 text-sm md:text-base text-charcoal/70 font-medium leading-relaxed">
          A página que você está procurando não existe, foi removida ou está temporariamente indisponível.
        </p>
        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-2xl bg-charcoal text-sand px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all hover:bg-oak hover:-translate-y-1 shadow-xl shadow-charcoal/10"
          >
            Voltar ao Início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: Readonly<{ error: unknown; reset: () => void }>) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    // Error reporting removed
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-sand text-charcoal px-6 relative overflow-hidden">
      <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] rounded-full bg-red-500/5 blur-[120px] pointer-events-none" />
      
      <div className="max-w-md text-center relative z-10">
        <span className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold">Erro Inesperado</span>
        <h1 className="mt-4 font-serif text-4xl md:text-5xl text-charcoal tracking-tight">Algo deu errado</h1>
        <p className="mt-4 text-sm md:text-base text-charcoal/70 font-medium leading-relaxed">
          Ocorreu um problema ao tentar carregar esta página. Tente recarregar ou volte para o início.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={async () => {
              await router.invalidate();
              reset();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-charcoal text-sand px-8 py-3.5 text-xs font-bold uppercase tracking-widest transition-all hover:bg-oak shadow-lg"
          >
            Tentar Novamente
          </button>
          <a
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-charcoal/20 bg-transparent px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-charcoal transition-all hover:border-oak hover:text-oak"
          >
            Voltar ao Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Mosantt — Galeria de Clínicas e Consultórios | Rio Branco" },
      { name: "description", content: "Mosantt reúne clínicas e consultórios independentes de saúde e estética em Rio Branco, Acre. Um edifício-galeria dedicado ao cuidado e ao design." },
      { name: "author", content: "Mosantt" },
      { property: "og:title", content: "Mosantt — Galeria de Clínicas e Consultórios" },
      { property: "og:description", content: "Um ecossistema de clínicas independentes em Rio Branco, unidas pelo design, bem-estar e excelência técnica." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@mosantt" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400;1,500&family=Inter:wght@300;400;500&display=swap",
      },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
