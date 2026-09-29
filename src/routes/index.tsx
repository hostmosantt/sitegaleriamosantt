import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import logoAsset from "@/assets/mosantt-logo.png.asset.json";
import { getSiteContent, type Sala, type SiteSettings } from "@/lib/site.functions";

const reviews = [
  {
    name: "William Cavalcante",
    when: "6 meses atrás",
    text: "Local maravilhoso e com ótimo atendimento, além de ser muito aconchegante. Tem profissionais de excelência e, em especial, o dentista Alison, que se destaca por ser atencioso, profissional e educado. Super recomendo!",
  },
  {
    name: "Sirineia Sirineia",
    when: "6 meses atrás",
    text: "Gostaria de parabenizar a clínica pelo excelente trabalho que vem realizando. É notável o compromisso com a qualidade, a dedicação da equipe e o cuidado em oferecer sempre o melhor aos clientes. Destaco também o importante papel da clínica com as pessoas que têm deficiência, promovendo cuidado e respeito.",
  },
  {
    name: "Júlia Ezitio",
    when: "1 ano atrás",
    text: "Já conhecia a antiga clínica em que o Dr. Alison atende, e a nova está lindíssima. Amei, sem falar no atendimento, que está excelente. Estou há quase três anos com o Alison e ele sempre foi atencioso e paciente.",
  },
  {
    name: "Diego Gomes",
    when: "6 meses atrás",
    text: "Lugar aconchegante, calmo e bastante agradável.",
  },
  {
    name: "Pedro Lucas",
    when: "6 meses atrás",
    text: "Lugar incrível, aconchegante e com ótimo atendimento.",
  },
  {
    name: "Joellytton Nogueira",
    when: "6 meses atrás",
    text: "Melhor atendimento da cidade.",
  },
  {
    name: "Michel Rocha Barbeiro",
    when: "2 semanas atrás",
    text: "Atendimento perfeito desde a recepção até o serviço. Mudou minha percepção sobre ir ao dentista!",
  },
  {
    name: "Gelcimar Souza",
    when: "6 meses atrás",
    text: "Um lindo espaço, muito acolhedor, e o atendimento é de excelência!",
  },
];

const fallback: Omit<SiteSettings, "id" | "updated_at"> = {
  hero_eyebrow: "Galeria de Saúde · Rio Branco — AC",
  hero_title_line1: "Saúde em sua",
  hero_title_line2: "melhor forma.",
  hero_subtitle:
    "Um ecossistema de clínicas independentes unidas pelo design, bem-estar e excelência técnica.",
  hero_image_url: "/assets/mosantt-hero.jpg",
  about_title: "Um novo conceito em Rio Branco",
  about_text:
    "A Galeria Mosantt é um espaço que reúne saúde, odontologia, estética e bem-estar em um ambiente sofisticado, acolhedor e pensado para proporcionar uma experiência diferenciada. Um conceito que conecta profissionais, serviços e pessoas em um só lugar, com cuidado, conforto e excelência em cada detalhe.",
  tour_title: "Uma visita guiada ao espaço.",
  tour_text:
    "Percorra o edifício e entenda como a Mosantt funciona: salas independentes, áreas comuns compartilhadas, recepção, estacionamento privativo e uma atmosfera pensada para acolher pacientes e profissionais.",
  tour_video_url: "/assets/mosantt-tour.mp4",
  whatsapp_url: "https://wa.me/5568992302967",
  instagram_url: "https://instagram.com/mosantt",
  address_line1: "Estr. Dias Martins, 1303",
  address_line2: "Jardim de Alah, Rio Branco — AC, 69915-526",
  maps_url:
    "https://www.google.com/maps/search/?api=1&query=Estrada+Dias+Martins+1303+Jardim+de+Alah+Rio+Branco",
};

const fallbackSalas: Sala[] = [
  {
    id: "sala-3",
    numero: "03",
    status: "Ocupada",
    ocupante: "Drª. Nayra Damasceno Sampaio",
    especialidade: "RAVIVVARE",
    nota: null,
    instagram: null,
    site: null,
    whatsapp: null,
    ordem: 1,
  },
  {
    id: "sala-5",
    numero: "05",
    status: "Ocupada",
    ocupante: "Dr. Alison Mota",
    especialidade: "Studio ALS Odontologia Integrada",
    nota: "Invisalign Doctor",
    instagram: null,
    site: null,
    whatsapp: null,
    ordem: 2,
  }
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mosantt — Galeria de Saúde em Rio Branco" },
      {
        name: "description",
        content:
          "Conheça a Mosantt, galeria de clínicas e consultórios em Rio Branco, suas salas, estrutura e avaliações de pacientes.",
      },
      { property: "og:title", content: "Mosantt — Galeria de Saúde em Rio Branco" },
      {
        property: "og:description",
        content: "Clínicas independentes, cuidado, design e atendimento 5 estrelas em Rio Branco.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: () => getSiteContent(),
  component: Index,
  errorComponent: () => (
    <div className="min-h-screen grid place-items-center bg-sand text-charcoal px-6 text-center">
      <p className="font-serif text-2xl">Não foi possível carregar o conteúdo. Recarregue a página.</p>
    </div>
  ),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center bg-sand text-charcoal">
      <p className="font-serif text-2xl">Página não encontrada</p>
    </div>
  ),
});

function Index() {
  const data = Route.useLoaderData();
  const s = { ...fallback, ...(data.settings ?? {}) };
  const salas: Sala[] = data.salas?.length ? data.salas : fallbackSalas;

  return (
    <div className="overflow-x-clip bg-sand text-charcoal selection:bg-oak/30">
      <section id="top" className="relative min-h-[100svh] w-full overflow-hidden text-sand">
        <motion.img
          src={s.hero_image_url}
          alt="Letreiro Mosantt em painel de madeira clara com palmeiras à frente"
          className="absolute inset-0 w-full h-full object-cover object-center will-change-transform"
          initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.12 }}
          animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }}
          transition={{
            clipPath: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
            scale: { duration: 2.4, ease: [0.22, 1, 0.36, 1] },
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/20 to-charcoal/70"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-transparent"
        />

        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 md:px-10 md:py-6"
        >
          <a href="#top" className="block">
            <img
              src={logoAsset.url}
              alt="Mosantt"
              className="h-9 w-auto brightness-0 invert opacity-90 transition-opacity hover:opacity-100 md:h-10"
            />
          </a>
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.25em] font-light text-sand/90">
            <a href="#espaco" className="hover:text-oak transition-colors">O Espaço</a>
            <a href="#tour" className="hover:text-oak transition-colors">Tour</a>
            <a href="#salas" className="hover:text-oak transition-colors">Salas</a>
            <a href="#avaliacoes" className="hover:text-oak transition-colors">Avaliações</a>
            <a href="#localizacao" className="hover:text-oak transition-colors">Localização</a>
          </div>
          <a
            href={s.whatsapp_url}
            className="inline-flex min-h-11 shrink-0 items-center border border-sand/40 px-4 text-[10px] uppercase tracking-[0.18em] text-sand transition-colors hover:bg-sand hover:text-charcoal md:hidden"
          >
            Agendar
          </a>
          <div className="col-span-2 -mx-1 flex min-w-0 gap-5 overflow-x-auto px-1 pb-1 text-[9px] uppercase tracking-[0.18em] text-sand/75 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
            <a href="#espaco" className="min-h-9 shrink-0 content-center">O Espaço</a>
            <a href="#tour" className="min-h-9 shrink-0 content-center">Tour</a>
            <a href="#salas" className="min-h-9 shrink-0 content-center">Salas</a>
            <a href="#avaliacoes" className="min-h-9 shrink-0 content-center">Avaliações</a>
            <a href="#localizacao" className="min-h-9 shrink-0 content-center">Localização</a>
          </div>
        </motion.nav>

        <div className="relative z-10 flex min-h-[calc(100svh-132px)] flex-col justify-end px-5 pb-8 pt-10 sm:pb-12 md:min-h-[calc(100vh-96px)] md:px-10 md:pb-20 md:pt-40">
          <motion.div
            className="max-w-7xl mx-auto w-full grid grid-cols-12 gap-6 items-end"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.55 } },
            }}
          >
            <motion.div
              className="col-span-12 lg:col-span-8"
              variants={{
                hidden: { y: 24, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <motion.span
                variants={{
                  hidden: { y: 12, opacity: 0 },
                  visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
                }}
                className="mb-4 block max-w-[28rem] text-[9px] uppercase leading-relaxed tracking-[0.25em] text-sand/75 md:mb-6 md:text-[11px] md:tracking-[0.35em]"
              >
                {s.hero_eyebrow}
              </motion.span>
              <h1 className="font-serif text-[2.75rem] leading-[0.94] text-sand drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl lg:text-8xl">
                {s.hero_title_line1} <br />
                <span className="italic">{s.hero_title_line2}</span>
              </h1>
            </motion.div>
            <motion.div
              className="col-span-12 min-w-0 lg:col-span-4 lg:border-l lg:border-sand/25 lg:pl-8"
              variants={{
                hidden: { y: 24, opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              <p className="max-w-sm text-sm font-light leading-relaxed text-sand/85 sm:text-base md:text-lg">
                {s.hero_subtitle}
              </p>
              <div className="mt-5 flex flex-wrap gap-3 md:mt-8">
                <a
                  href={s.whatsapp_url}
                  className="hidden min-h-12 items-center bg-sand px-7 text-[11px] uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-oak hover:text-sand sm:inline-flex md:tracking-[0.25em]"
                >
                  Agendar Visita
                </a>
                <a
                  href={s.instagram_url}
                  className="inline-flex min-h-12 items-center border border-sand/40 px-6 text-[10px] uppercase tracking-[0.2em] text-sand transition-colors hover:border-sand hover:bg-sand/10 md:px-7 md:text-[11px] md:tracking-[0.25em]"
                >
                  @mosantt
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-sand/60"
          >
            <span className="text-[10px] uppercase tracking-[0.35em]">Role</span>
            <span className="w-px h-10 bg-sand/40 animate-scroll-hint origin-top" />
          </motion.div>
        </div>
      </section>

      <section id="espaco" className="scroll-mt-4 bg-leaf px-5 py-16 text-sand sm:py-20 md:px-8 md:py-24">
        <div className="max-w-5xl mx-auto text-center">
          <div className="w-12 h-12 border border-sand/30 mx-auto mb-8 grid place-items-center">
            <span className="text-xs font-serif italic">tt</span>
          </div>
          <h2 className="mb-5 font-serif text-3xl leading-tight md:mb-6 md:text-4xl">{s.about_title}</h2>
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed opacity-80 md:text-lg">
            {s.about_text}
          </p>
        </div>
      </section>

      <section id="tour" className="scroll-mt-4 px-5 py-16 sm:py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-12 items-center gap-10">
          <div className="col-span-12 min-w-0 lg:col-span-5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-4 block">
              Conheça a Galeria
            </span>
            <h2 className="mb-5 font-serif text-4xl leading-[1.05] md:mb-6 md:text-5xl">{s.tour_title}</h2>
            <p className="text-base font-light leading-relaxed text-charcoal/70 max-w-md">
              {s.tour_text}
            </p>
            <div className="mt-8 flex flex-col gap-2 text-sm font-light text-charcoal/70">
              <span>· {salas.length || 5} salas privativas</span>
              <span>· Recepção e áreas de convivência</span>
              <span>· Estacionamento e segurança</span>
              <span>· Localização estratégica no Jardim de Alah</span>
            </div>
          </div>
          <div className="col-span-12 min-w-0 lg:col-span-7">
            <video
              src={s.tour_video_url}
              controls
              playsInline
              preload="metadata"
              className="mx-auto aspect-[9/16] w-full max-w-[32rem] bg-charcoal/5 object-cover shadow-2xl shadow-charcoal/10 md:aspect-[4/5] lg:max-w-none"
            >
              Seu navegador não suporta vídeo HTML5.
            </video>
          </div>
        </div>
      </section>

      <section id="salas" className="scroll-mt-4 bg-oak/5 px-5 py-16 sm:py-20 md:px-8 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 grid grid-cols-1 items-end gap-6 md:mb-16 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-4 block">
                Disponibilidade
              </span>
              <h2 className="font-serif text-4xl leading-tight md:text-5xl">
                Cinco salas, <span className="italic">um só endereço.</span>
              </h2>
            </div>
            <p className="text-sm font-light text-charcoal/60 max-w-xs">
              Salas prontas para profissionais de saúde e estética. Consulte disponibilidade e
              condições de locação.
            </p>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10 border border-charcoal/10">
            {salas.map((sala) => {
              const ocupada = sala.status === "Ocupada";
              return (
                <li key={sala.id} className="flex min-h-[220px] flex-col justify-between bg-sand p-6 sm:p-8 md:min-h-[240px]">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
                    <span className="font-serif text-5xl leading-none">{sala.numero}</span>
                    <span
                      className={
                        "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium " +
                        (ocupada ? "text-charcoal/60" : "text-leaf")
                      }
                    >
                      <span
                        className={"size-1.5 rounded-full " + (ocupada ? "bg-charcoal/40" : "bg-leaf")}
                      />
                      {sala.status}
                    </span>
                  </div>
                  <div className="mt-8">
                    {ocupada ? (
                      <>
                        <p className="text-[10px] uppercase tracking-widest text-oak font-semibold mb-2">
                          {sala.especialidade}
                        </p>
                        <h3 className="font-serif text-2xl leading-tight">{sala.ocupante}</h3>
                      </>
                    ) : (
                      <h3 className="font-serif text-2xl italic leading-tight">Sala disponível</h3>
                    )}
                    <p className="text-sm text-charcoal/60 mt-2 font-light">{sala.nota}</p>
                    {ocupada && (sala.instagram || sala.site || sala.whatsapp) && (
                      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.2em]">
                        {sala.instagram && (
                          <a
                            href={sala.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="text-charcoal/70 hover:text-oak transition-colors underline underline-offset-4 decoration-oak/40"
                          >
                            Instagram
                          </a>
                        )}
                        {sala.site && (
                          <a
                            href={sala.site}
                            target="_blank"
                            rel="noreferrer"
                            className="text-charcoal/70 hover:text-oak transition-colors underline underline-offset-4 decoration-oak/40"
                          >
                            Site
                          </a>
                        )}
                        {sala.whatsapp && (
                          <a
                            href={sala.whatsapp}
                            target="_blank"
                            rel="noreferrer"
                            className="text-charcoal/70 hover:text-oak transition-colors underline underline-offset-4 decoration-oak/40"
                          >
                            WhatsApp
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
            <li className="flex min-h-[220px] flex-col justify-between bg-charcoal p-6 text-sand sm:p-8 md:min-h-[240px]">
              <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold">
                Interessado?
              </span>
              <div>
                <h3 className="font-serif text-2xl leading-tight mb-4">
                  Fale sobre a locação de uma sala.
                </h3>
                <a
                  href={s.whatsapp_url}
                  className="text-xs uppercase tracking-widest underline underline-offset-8 decoration-oak/50 hover:text-oak transition-colors"
                >
                  Falar no WhatsApp →
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section id="avaliacoes" className="scroll-mt-4 bg-leaf px-5 py-16 text-sand sm:py-20 md:px-8 md:py-24">
        <div className="max-w-7xl mx-auto">
           <div className="mb-10 grid grid-cols-1 items-end gap-8 md:mb-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-4 block">
                Experiências reais
              </span>
              <h2 className="font-serif text-4xl md:text-5xl leading-[1.05]">
                Quem passa pela Mosantt, <span className="italic">recomenda.</span>
              </h2>
            </div>
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-end gap-4 sm:gap-6 lg:justify-end">
              <strong className="font-serif text-6xl font-normal leading-[0.75] md:text-8xl">5,0</strong>
              <div>
                <div className="text-oak text-lg tracking-[0.18em]" aria-label="5 de 5 estrelas">
                  ★★★★★
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.16em] text-sand/60 sm:text-xs sm:tracking-[0.2em]">9 avaliações no Google</p>
              </div>
            </div>
          </div>

          <ul className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {reviews.map((review) => (
              <li
                key={review.name}
                className="mb-4 break-inside-avoid border border-sand/15 bg-sand/5 p-5 sm:p-6 md:p-7"
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="text-oak text-xs tracking-[0.15em]" aria-hidden="true">★★★★★</div>
                  <span className="text-[10px] text-sand/45 whitespace-nowrap">{review.when}</span>
                </div>
                <blockquote className="font-serif text-xl leading-relaxed text-sand/90">
                  “{review.text}”
                </blockquote>
                <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-sand/55">{review.name}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-sand/15 pt-8">
            <p className="text-sm font-light text-sand/60">Avaliações compartilhadas por pacientes e visitantes.</p>
            <a
              href={s.maps_url}
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.2em] text-sand underline underline-offset-8 decoration-oak/60 hover:text-oak transition-colors"
            >
              Ver no Google →
            </a>
          </div>
        </div>
      </section>

      <footer id="localizacao" className="scroll-mt-4 bg-charcoal px-5 py-16 text-sand md:px-8 md:py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] min-w-0">
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-6 block">
              Onde Estamos
            </span>
            <h3 className="font-serif text-3xl md:text-4xl mb-6 max-w-2xl min-w-0 break-words">
              {s.address_line1}
              <br />
              {s.address_line2}
            </h3>
            <p className="text-sand/50 font-light mb-12 max-w-md">
              Um ponto estratégico de fácil acesso, com estacionamento privativo e segurança.
            </p>
            <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4 min-w-0">
              <a
                href={s.maps_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-fit items-center text-sm underline decoration-oak/30 underline-offset-8 transition-colors hover:text-oak"
              >
                Ver no Google Maps
              </a>
              <a
                href={s.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-fit items-center text-sm underline decoration-oak/30 underline-offset-8 transition-colors hover:text-oak"
              >
                Instagram @mosantt
              </a>
              <a
                href={s.whatsapp_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-fit items-center text-sm underline decoration-oak/30 underline-offset-8 transition-colors hover:text-oak"
              >
                WhatsApp
              </a>
            </div>
          </div>
          
          <div className="flex flex-col gap-8 min-w-0 lg:pl-12 lg:border-l lg:border-sand/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-3 block">
                Horário de Funcionamento
              </span>
              <p className="text-sand/80 font-light text-sm leading-relaxed">
                Segunda a sexta: 08:00 às 18:00<br />
                Sábado: 08:00 às 12:00
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-3 block">
                Contato Comercial
              </span>
              <p className="text-sand/80 font-light text-sm leading-relaxed">
                WhatsApp / Tel: (68) 99230-2967
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-3 block">
                Dados da Empresa
              </span>
              <p className="text-sand/50 font-light text-xs leading-relaxed">
                Razão Social: J M M & A M RABELO LTDA<br />
                CNPJ: 46.748.316/0001-67<br />
                Mosantt Saúde e Estética
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-sand/10 pt-8 text-center min-w-0 md:mt-20 md:flex-row md:pt-10 md:text-left">
          <a href="#top" className="block shrink-0">
            <img
              src={logoAsset.url}
              alt="Mosantt"
              className="h-8 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </a>
          <p className="text-[10px] uppercase tracking-[0.2em] text-sand/30 min-w-0">
            © {new Date().getFullYear()} Mosantt — Saúde e Estética.
          </p>
        </div>
      </footer>
    </div>
  );
}
