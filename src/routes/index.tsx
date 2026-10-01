import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
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
  hero_image_url: "/assets/mosantt-hero.webp",
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
  maps_url: "https://www.google.com/maps/place/Mosantt+%7C+Galeria+de+Sa%C3%BAde+e+est%C3%A9tica+%7C+Rio+Branco/@-9.961057,-67.854059,16z/data=!4m15!1m8!3m7!1s0x917f8c20df93a57b:0x5f27f9f1328090f5!2sEstr.+Dias+Martins,+1303+-+Jardim+Primavera,+Rio+Branco+-+AC,+69915-526,+Brasil!3b1!8m2!3d-9.9610574!4d-67.854059!16s%2Fg%2F11hbgpl0vy!3m5!1s0x917f8d002ecf3b03:0xe507fab3e21c399a!8m2!3d-9.9610574!4d-67.854059!16s%2Fg%2F11mcjtgkyk?hl=pt-BR&entry=ttu&g_ep=EgoyMDI2MDkyOC4wIKXMDSoASAFQAw%3D%3D",
};

// fallbackSalas is no longer needed since getSiteContent handles default rooms

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
    links: [
      { rel: "preload", as: "image", href: "/assets/mosantt-hero.webp" }
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
  const s = { ...fallback, ...data.settings };
  const salas: Sala[] = data.salas ?? [];

  const videoRef = useRef<HTMLVideoElement>(null);
  const [fading, setFading] = useState(false);

  return (
    <div className="overflow-x-clip bg-sand text-charcoal selection:bg-oak/30">
      <section id="top" className="relative min-h-[100svh] w-full overflow-hidden text-sand flex flex-col">
        {/* Video Background */}
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          poster={s.hero_image_url}
          className="absolute inset-0 w-full h-full object-cover object-center will-change-transform bg-charcoal pointer-events-none"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ scale: { duration: 2.4, ease: [0.22, 1, 0.36, 1] } }}
          style={{ opacity: fading ? 0 : 1, transition: "opacity 1.2s ease-in-out" }}
          onCanPlay={(e) => {
            e.currentTarget.playbackRate = 0.85;
          }}
          onTimeUpdate={(e) => {
            const vid = e.currentTarget;
            if (!fading && vid.duration && vid.duration - vid.currentTime <= 1.2) {
              setFading(true);
            }
          }}
          onEnded={(e) => {
            const vid = e.currentTarget;
            vid.currentTime = 0;
            void vid.play();
            // Using a slight timeout before fading in ensures the seek operation is complete
            // and frame is rendered, avoiding a flicker of the end frame.
            setTimeout(() => setFading(false), 50);
          }}
        >
          <source src="/assets/hero%20galeria%20mosantt.mp4" type="video/mp4" />
        </motion.video>

        {/* Overlays for contrast */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/50"
        />

        <div className="relative z-20 flex flex-1 flex-col justify-between px-5 pb-8 pt-6 md:px-10 md:pb-16 md:pt-8">
          {/* Top Navbar */}
          <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between gap-4"
          >
            <a href="#top" className="block shrink-0">
              <img
                src="/assets/favicon.png"
                alt="Mosantt"
                className="h-10 md:h-12 w-auto transition-transform hover:scale-105 drop-shadow-md"
              />
            </a>
            
            {/* Desktop Links */}
            <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-[0.25em] font-medium text-sand/90">
              <a href="#espaco" className="hover:text-oak transition-colors drop-shadow-sm">O Espaço</a>
              <a href="#tour" className="hover:text-oak transition-colors drop-shadow-sm">Tour</a>
              <a href="#salas" className="hover:text-oak transition-colors drop-shadow-sm">Salas</a>
              <a href="#avaliacoes" className="hover:text-oak transition-colors drop-shadow-sm">Avaliações</a>
              <a href="#localizacao" className="hover:text-oak transition-colors drop-shadow-sm">Localização</a>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden gap-3">
              <a
                href={s.whatsapp_url}
                className="flex h-10 items-center rounded-full bg-sand px-5 text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal transition-transform active:scale-95 shadow-lg"
              >
                Agendar
              </a>
            </div>
          </motion.nav>

          {/* Main Hero Content - Bottom Heavy for Mobile Reachability */}
          <motion.div
            className="w-full max-w-7xl mx-auto flex flex-col gap-5 mt-auto"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
            }}
          >
            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } }}>
              <span className="mb-3 block text-[10px] uppercase leading-relaxed tracking-[0.3em] text-sand/80 font-bold drop-shadow-md md:mb-5 md:text-xs md:tracking-[0.4em]">
                {s.hero_eyebrow}
              </span>
              <h1 className="font-serif text-[3.25rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-sand drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                {s.hero_title_line1} <br />
                <span className="italic text-sand/95">{s.hero_title_line2}</span>
              </h1>
            </motion.div>
            
            <motion.div variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } }}>
              <p className="max-w-[18rem] sm:max-w-md text-base sm:text-lg font-light leading-relaxed text-sand/90 drop-shadow-md">
                {s.hero_subtitle}
              </p>
              
              {/* Primary CTAs */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <a
                  href={s.whatsapp_url}
                  className="flex h-14 w-full sm:w-auto items-center justify-center rounded-2xl bg-sand px-8 text-xs font-bold uppercase tracking-[0.2em] text-charcoal transition-all hover:bg-oak hover:text-sand shadow-xl shadow-black/20 active:scale-95"
                >
                  Agendar Visita
                </a>
                <a
                  href={s.instagram_url}
                  className="flex h-14 w-full sm:w-auto items-center justify-center rounded-2xl border border-sand/40 bg-black/20 backdrop-blur-md px-8 text-xs font-bold uppercase tracking-[0.2em] text-sand transition-all hover:border-sand hover:bg-black/40 active:scale-95"
                >
                  @mosantt
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-sand/60"
          >
            <span className="text-[10px] uppercase tracking-[0.35em]">Role</span>
            <span className="w-px h-10 bg-sand/40 animate-scroll-hint origin-top" />
          </motion.div>
      </section>

      <section id="espaco" className="scroll-mt-4 bg-leaf px-5 py-24 text-sand sm:py-32 md:px-8">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Símbolo */}
          <div className="mx-auto mb-8 flex justify-center">
            <img src="/assets/favicon.png" alt="Mosantt" loading="lazy" className="h-12 md:h-14 w-auto drop-shadow-sm" />
          </div>

          {/* Header */}
          <span className="mb-6 block text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-sand/70 drop-shadow-sm">
            Galeria Mosantt
          </span>

          {/* Title */}
          <h2 className="mb-10 font-serif text-4xl leading-[1.1] md:text-5xl lg:text-6xl text-sand drop-shadow-sm">
            Mais que um espaço.<br />
            <span className="italic text-sand/90">Uma experiência de cuidado.</span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto max-w-3xl text-xs md:text-sm uppercase tracking-[0.2em] font-bold text-sand/80 leading-relaxed">
            Saúde <span className="mx-2 text-sand/30 font-light">·</span> Odontologia <span className="mx-2 text-sand/30 font-light">·</span> Bem-estar
          </p>
        </div>
      </section>

      <section id="tour" className="scroll-mt-4 px-5 py-16 sm:py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-12 items-center gap-10">
          <div className="col-span-1 min-w-0 lg:col-span-5">
            <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-4 block">
              Conheça a Galeria
            </span>
            <h2 className="mb-5 font-serif text-4xl leading-[1.05] md:mb-6 md:text-5xl">{s.tour_title}</h2>
            <p className="text-base md:text-lg font-light leading-relaxed text-charcoal/70 max-w-lg">
              {s.tour_text}
            </p>
            <div className="mt-8 flex flex-col gap-3 md:gap-4 text-base md:text-lg font-light text-charcoal/70">
              <span className="flex items-center gap-2">
                <span className="h-px w-4 bg-oak/60"></span> {salas.length || 5} consultórios de alto padrão
              </span>
              <span className="flex items-center gap-2">
                <span className="h-px w-4 bg-oak/60"></span> Recepção sofisticada e áreas de estar
              </span>
              <span className="flex items-center gap-2">
                <span className="h-px w-4 bg-oak/60"></span> Estacionamento privativo e segurança
              </span>
              <span className="flex items-center gap-2">
                <span className="h-px w-4 bg-oak/60"></span> Localização estratégica no Jardim de Alah
              </span>
            </div>
          </div>
          <div className="col-span-1 min-w-0 lg:col-span-7">
            <video
              src={s.tour_video_url}
              controls
              playsInline
              preload="metadata"
              className="mx-auto aspect-[9/16] w-full max-w-[32rem] bg-charcoal/5 object-cover shadow-2xl shadow-charcoal/10 md:aspect-[4/5] lg:max-w-none"
            >
              <track kind="captions" />
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
            <p className="text-base md:text-lg font-light text-charcoal/60 max-w-sm md:max-w-md leading-relaxed">
              Espaços projetados para elevar o padrão do seu atendimento. Consulte as condições exclusivas de locação.
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
                        <p className="text-[10px] md:text-xs uppercase tracking-widest text-oak font-semibold mb-2 md:mb-3">
                          {sala.especialidade}
                        </p>
                        <h3 className="font-serif text-2xl md:text-3xl leading-tight">{sala.ocupante}</h3>
                      </>
                    ) : (
                      <h3 className="font-serif text-2xl md:text-3xl italic leading-tight">Sala disponível</h3>
                    )}
                    <p className="text-base md:text-lg text-charcoal/60 mt-2 font-light">{sala.nota}</p>
                    {(sala.instagram || sala.site || sala.whatsapp) && (
                      <div className="mt-5 flex flex-wrap gap-2 text-[9px] uppercase tracking-[0.15em] font-medium">
                        {sala.site && (
                          <a
                            href={sala.site}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-8 items-center rounded-full border border-charcoal/20 px-4 text-charcoal/80 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-sand"
                          >
                            Acessar site
                          </a>
                        )}
                        {sala.instagram && (
                          <a
                            href={sala.instagram}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-8 items-center rounded-full border border-charcoal/20 px-4 text-charcoal/80 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-sand"
                          >
                            Instagram
                          </a>
                        )}
                        {sala.whatsapp && (
                          <a
                            href={sala.whatsapp}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-8 items-center rounded-full border border-charcoal/20 px-4 text-charcoal/80 transition-colors hover:border-charcoal hover:bg-charcoal hover:text-sand"
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
                Deseja fazer parte?
              </span>
              <div>
                <h3 className="font-serif text-3xl md:text-4xl leading-tight mb-4 md:mb-6">
                  Traga seu consultório para a Mosantt.
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

          <ul className="flex overflow-x-auto snap-x snap-mandatory pb-6 -mx-5 px-5 gap-4 md:gap-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0 md:block md:columns-2 lg:columns-3">
            {reviews.map((review) => (
              <li
                key={review.name}
                className="w-[85vw] min-w-[85vw] sm:w-[400px] sm:min-w-[400px] shrink-0 snap-center md:w-auto md:min-w-0 md:mb-4 md:break-inside-avoid border border-sand/15 bg-sand/5 p-5 sm:p-6 md:p-7"
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
            <p className="text-base font-light text-sand/60">Avaliações compartilhadas por pacientes e visitantes.</p>
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
                className="inline-flex min-h-11 w-fit items-center text-base underline decoration-oak/30 underline-offset-8 transition-colors hover:text-oak"
              >
                Ver no Google Maps
              </a>
              <a
                href={s.instagram_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-fit items-center text-base underline decoration-oak/30 underline-offset-8 transition-colors hover:text-oak"
              >
                Instagram @mosantt
              </a>
              <a
                href={s.whatsapp_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 w-fit items-center text-base underline decoration-oak/30 underline-offset-8 transition-colors hover:text-oak"
              >
                WhatsApp
              </a>
            </div>
            
            <div className="mt-10 w-full max-w-md aspect-[4/3] sm:aspect-[16/7] rounded border border-sand/10 overflow-hidden relative grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <iframe
                title="Mapa de localização da Galeria Mosantt"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(s.address_line1 + " " + s.address_line2)}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            </div>
          </div>
          
          <div className="flex flex-col gap-8 min-w-0 lg:pl-12 lg:border-l lg:border-sand/10">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-3 block">
                Horário de Funcionamento
              </span>
              <p className="text-sand/80 font-light text-base leading-relaxed">
                Segunda a sexta: 08:00 às 18:00<br />
                Sábado: 08:00 às 12:00
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-3 block">
                Contato Comercial
              </span>
              <p className="text-sand/80 font-light text-base leading-relaxed">
                WhatsApp / Tel: (68) 99230-2967
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-3 block">
                Dados da Empresa
              </span>
              <p className="text-sand/50 font-light text-sm leading-relaxed">
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
              src="/assets/favicon.png"
              alt="Mosantt"
              loading="lazy"
              className="h-10 w-auto hover:scale-105 transition-transform"
            />
          </a>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex gap-4 text-[10px] uppercase tracking-[0.15em] font-medium">
              <Link to="/termos" className="text-sand/40 hover:text-sand transition-colors">Termos de Uso</Link>
              <Link to="/privacidade" className="text-sand/40 hover:text-sand transition-colors">Privacidade</Link>
            </div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-sand/30 min-w-0">
              © {new Date().getFullYear()} Mosantt — Saúde e Estética.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
