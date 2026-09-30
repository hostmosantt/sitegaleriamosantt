import { n as Route } from "./router-CEftVibs.js";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
var mosantt_logo_png_asset_default = {
	version: 1,
	asset_id: "c3046c17-86ad-476f-a33d-cc9990124095",
	project_id: "7ff07f21-1e7f-4b00-b150-ed9105675004",
	url: "/__l5e/assets-v1/c3046c17-86ad-476f-a33d-cc9990124095/mosantt-logo.png",
	r2_key: "a/v1/7ff07f21-1e7f-4b00-b150-ed9105675004/c3046c17-86ad-476f-a33d-cc9990124095/mosantt-logo.png",
	original_filename: "mosantt-logo.png",
	size: 116758,
	content_type: "image/png",
	created_at: "2026-09-09T21:29:54Z"
};
//#endregion
//#region src/routes/index.tsx?tsr-split=component
var reviews = [
	{
		name: "William Cavalcante",
		when: "6 meses atrás",
		text: "Local maravilhoso e com ótimo atendimento, além de ser muito aconchegante. Tem profissionais de excelência e, em especial, o dentista Alison, que se destaca por ser atencioso, profissional e educado. Super recomendo!"
	},
	{
		name: "Sirineia Sirineia",
		when: "6 meses atrás",
		text: "Gostaria de parabenizar a clínica pelo excelente trabalho que vem realizando. É notável o compromisso com a qualidade, a dedicação da equipe e o cuidado em oferecer sempre o melhor aos clientes. Destaco também o importante papel da clínica com as pessoas que têm deficiência, promovendo cuidado e respeito."
	},
	{
		name: "Júlia Ezitio",
		when: "1 ano atrás",
		text: "Já conhecia a antiga clínica em que o Dr. Alison atende, e a nova está lindíssima. Amei, sem falar no atendimento, que está excelente. Estou há quase três anos com o Alison e ele sempre foi atencioso e paciente."
	},
	{
		name: "Diego Gomes",
		when: "6 meses atrás",
		text: "Lugar aconchegante, calmo e bastante agradável."
	},
	{
		name: "Pedro Lucas",
		when: "6 meses atrás",
		text: "Lugar incrível, aconchegante e com ótimo atendimento."
	},
	{
		name: "Joellytton Nogueira",
		when: "6 meses atrás",
		text: "Melhor atendimento da cidade."
	},
	{
		name: "Michel Rocha Barbeiro",
		when: "2 semanas atrás",
		text: "Atendimento perfeito desde a recepção até o serviço. Mudou minha percepção sobre ir ao dentista!"
	},
	{
		name: "Gelcimar Souza",
		when: "6 meses atrás",
		text: "Um lindo espaço, muito acolhedor, e o atendimento é de excelência!"
	}
];
var fallback = {
	hero_eyebrow: "Galeria de Saúde · Rio Branco — AC",
	hero_title_line1: "Saúde em sua",
	hero_title_line2: "melhor forma.",
	hero_subtitle: "Um ecossistema de clínicas independentes unidas pelo design, bem-estar e excelência técnica.",
	hero_image_url: "/assets/mosantt-hero.jpg",
	about_title: "Um novo conceito em Rio Branco",
	about_text: "A Galeria Mosantt é um espaço que reúne saúde, odontologia, estética e bem-estar em um ambiente sofisticado, acolhedor e pensado para proporcionar uma experiência diferenciada. Um conceito que conecta profissionais, serviços e pessoas em um só lugar, com cuidado, conforto e excelência em cada detalhe.",
	tour_title: "Uma visita guiada ao espaço.",
	tour_text: "Percorra o edifício e entenda como a Mosantt funciona: salas independentes, áreas comuns compartilhadas, recepção, estacionamento privativo e uma atmosfera pensada para acolher pacientes e profissionais.",
	tour_video_url: "/assets/mosantt-tour.mp4",
	whatsapp_url: "https://wa.me/5568992302967",
	instagram_url: "https://instagram.com/mosantt",
	address_line1: "Estr. Dias Martins, 1303",
	address_line2: "Jardim de Alah, Rio Branco — AC, 69915-526",
	maps_url: "https://www.google.com/maps/search/?api=1&query=Estrada+Dias+Martins+1303+Jardim+de+Alah+Rio+Branco"
};
var fallbackSalas = [{
	id: "sala-3",
	numero: "03",
	status: "Ocupada",
	ocupante: "Drª. Nayra Damasceno Sampaio",
	especialidade: "RAVIVVARE",
	nota: null,
	instagram: null,
	site: null,
	whatsapp: null,
	ordem: 1
}, {
	id: "sala-5",
	numero: "05",
	status: "Ocupada",
	ocupante: "Dr. Alison Mota",
	especialidade: "Studio ALS Odontologia Integrada",
	nota: "Invisalign Doctor",
	instagram: null,
	site: null,
	whatsapp: null,
	ordem: 2
}];
function Index() {
	const data = Route.useLoaderData();
	const s = {
		...fallback,
		...data.settings ?? {}
	};
	const salas = data.salas?.length ? data.salas : fallbackSalas;
	return /* @__PURE__ */ jsxs("div", {
		className: "overflow-x-clip bg-sand text-charcoal selection:bg-oak/30",
		children: [
			/* @__PURE__ */ jsxs("section", {
				id: "top",
				className: "relative min-h-[100svh] w-full overflow-hidden text-sand",
				children: [
					/* @__PURE__ */ jsx(motion.img, {
						src: s.hero_image_url,
						alt: "Letreiro Mosantt em painel de madeira clara com palmeiras à frente",
						className: "absolute inset-0 w-full h-full object-cover object-center will-change-transform",
						initial: {
							clipPath: "inset(0 0 100% 0)",
							scale: 1.12
						},
						animate: {
							clipPath: "inset(0 0 0% 0)",
							scale: 1
						},
						transition: {
							clipPath: {
								duration: 1.6,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							scale: {
								duration: 2.4,
								ease: [
									.22,
									1,
									.36,
									1
								]
							}
						}
					}),
					/* @__PURE__ */ jsx("div", {
						"aria-hidden": true,
						className: "absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/20 to-charcoal/70"
					}),
					/* @__PURE__ */ jsx("div", {
						"aria-hidden": true,
						className: "absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-transparent"
					}),
					/* @__PURE__ */ jsxs(motion.nav, {
						initial: {
							y: -20,
							opacity: 0
						},
						animate: {
							y: 0,
							opacity: 1
						},
						transition: {
							duration: .7,
							delay: .35,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						className: "relative z-20 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-5 md:px-10 md:py-6",
						children: [
							/* @__PURE__ */ jsx("a", {
								href: "#top",
								className: "block",
								children: /* @__PURE__ */ jsx("img", {
									src: mosantt_logo_png_asset_default.url,
									alt: "Mosantt",
									className: "h-9 w-auto brightness-0 invert opacity-90 transition-opacity hover:opacity-100 md:h-10"
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "hidden md:flex gap-8 text-[11px] uppercase tracking-[0.25em] font-light text-sand/90",
								children: [
									/* @__PURE__ */ jsx("a", {
										href: "#espaco",
										className: "hover:text-oak transition-colors",
										children: "O Espaço"
									}),
									/* @__PURE__ */ jsx("a", {
										href: "#tour",
										className: "hover:text-oak transition-colors",
										children: "Tour"
									}),
									/* @__PURE__ */ jsx("a", {
										href: "#salas",
										className: "hover:text-oak transition-colors",
										children: "Salas"
									}),
									/* @__PURE__ */ jsx("a", {
										href: "#avaliacoes",
										className: "hover:text-oak transition-colors",
										children: "Avaliações"
									}),
									/* @__PURE__ */ jsx("a", {
										href: "#localizacao",
										className: "hover:text-oak transition-colors",
										children: "Localização"
									})
								]
							}),
							/* @__PURE__ */ jsx("a", {
								href: s.whatsapp_url,
								className: "inline-flex min-h-11 shrink-0 items-center border border-sand/40 px-4 text-[10px] uppercase tracking-[0.18em] text-sand transition-colors hover:bg-sand hover:text-charcoal md:hidden",
								children: "Agendar"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "col-span-2 -mx-1 flex min-w-0 gap-5 overflow-x-auto px-1 pb-1 text-[9px] uppercase tracking-[0.18em] text-sand/75 [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden",
								children: [
									/* @__PURE__ */ jsx("a", {
										href: "#espaco",
										className: "min-h-9 shrink-0 content-center",
										children: "O Espaço"
									}),
									/* @__PURE__ */ jsx("a", {
										href: "#tour",
										className: "min-h-9 shrink-0 content-center",
										children: "Tour"
									}),
									/* @__PURE__ */ jsx("a", {
										href: "#salas",
										className: "min-h-9 shrink-0 content-center",
										children: "Salas"
									}),
									/* @__PURE__ */ jsx("a", {
										href: "#avaliacoes",
										className: "min-h-9 shrink-0 content-center",
										children: "Avaliações"
									}),
									/* @__PURE__ */ jsx("a", {
										href: "#localizacao",
										className: "min-h-9 shrink-0 content-center",
										children: "Localização"
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative z-10 flex min-h-[calc(100svh-132px)] flex-col justify-end px-5 pb-8 pt-10 sm:pb-12 md:min-h-[calc(100vh-96px)] md:px-10 md:pb-20 md:pt-40",
						children: [/* @__PURE__ */ jsxs(motion.div, {
							className: "max-w-7xl mx-auto w-full grid grid-cols-12 gap-6 items-end",
							initial: "hidden",
							animate: "visible",
							variants: {
								hidden: { opacity: 0 },
								visible: {
									opacity: 1,
									transition: {
										staggerChildren: .14,
										delayChildren: .55
									}
								}
							},
							children: [/* @__PURE__ */ jsxs(motion.div, {
								className: "col-span-12 lg:col-span-8",
								variants: {
									hidden: {
										y: 24,
										opacity: 0
									},
									visible: {
										y: 0,
										opacity: 1,
										transition: {
											duration: .9,
											ease: [
												.22,
												1,
												.36,
												1
											]
										}
									}
								},
								children: [/* @__PURE__ */ jsx(motion.span, {
									variants: {
										hidden: {
											y: 12,
											opacity: 0
										},
										visible: {
											y: 0,
											opacity: 1,
											transition: { duration: .6 }
										}
									},
									className: "mb-4 block max-w-[28rem] text-[9px] uppercase leading-relaxed tracking-[0.25em] text-sand/75 md:mb-6 md:text-[11px] md:tracking-[0.35em]",
									children: s.hero_eyebrow
								}), /* @__PURE__ */ jsxs("h1", {
									className: "font-serif text-[2.75rem] leading-[0.94] text-sand drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl lg:text-8xl",
									children: [
										s.hero_title_line1,
										" ",
										/* @__PURE__ */ jsx("br", {}),
										/* @__PURE__ */ jsx("span", {
											className: "italic",
											children: s.hero_title_line2
										})
									]
								})]
							}), /* @__PURE__ */ jsxs(motion.div, {
								className: "col-span-12 min-w-0 lg:col-span-4 lg:border-l lg:border-sand/25 lg:pl-8",
								variants: {
									hidden: {
										y: 24,
										opacity: 0
									},
									visible: {
										y: 0,
										opacity: 1,
										transition: {
											duration: .9,
											ease: [
												.22,
												1,
												.36,
												1
											]
										}
									}
								},
								children: [/* @__PURE__ */ jsx("p", {
									className: "max-w-sm text-sm font-light leading-relaxed text-sand/85 sm:text-base md:text-lg",
									children: s.hero_subtitle
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-5 flex flex-wrap gap-3 md:mt-8",
									children: [/* @__PURE__ */ jsx("a", {
										href: s.whatsapp_url,
										className: "hidden min-h-12 items-center bg-sand px-7 text-[11px] uppercase tracking-[0.2em] text-charcoal transition-colors hover:bg-oak hover:text-sand sm:inline-flex md:tracking-[0.25em]",
										children: "Agendar Visita"
									}), /* @__PURE__ */ jsx("a", {
										href: s.instagram_url,
										className: "inline-flex min-h-12 items-center border border-sand/40 px-6 text-[10px] uppercase tracking-[0.2em] text-sand transition-colors hover:border-sand hover:bg-sand/10 md:px-7 md:text-[11px] md:tracking-[0.25em]",
										children: "@mosantt"
									})]
								})]
							})]
						}), /* @__PURE__ */ jsxs(motion.div, {
							initial: { opacity: 0 },
							animate: { opacity: 1 },
							transition: {
								delay: 2,
								duration: .8
							},
							className: "hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 text-sand/60",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] uppercase tracking-[0.35em]",
								children: "Role"
							}), /* @__PURE__ */ jsx("span", { className: "w-px h-10 bg-sand/40 animate-scroll-hint origin-top" })]
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				id: "espaco",
				className: "scroll-mt-4 bg-leaf px-5 py-16 text-sand sm:py-20 md:px-8 md:py-24",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-5xl mx-auto text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "w-12 h-12 border border-sand/30 mx-auto mb-8 grid place-items-center",
							children: /* @__PURE__ */ jsx("span", {
								className: "text-xs font-serif italic",
								children: "tt"
							})
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mb-5 font-serif text-3xl leading-tight md:mb-6 md:text-4xl",
							children: s.about_title
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto max-w-2xl text-base font-light leading-relaxed opacity-80 md:text-lg",
							children: s.about_text
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "tour",
				className: "scroll-mt-4 px-5 py-16 sm:py-20 md:px-8 md:py-24",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-7xl grid-cols-12 items-center gap-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "col-span-12 min-w-0 lg:col-span-5",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-4 block",
								children: "Conheça a Galeria"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mb-5 font-serif text-4xl leading-[1.05] md:mb-6 md:text-5xl",
								children: s.tour_title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-base font-light leading-relaxed text-charcoal/70 max-w-md",
								children: s.tour_text
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-8 flex flex-col gap-2 text-sm font-light text-charcoal/70",
								children: [
									/* @__PURE__ */ jsxs("span", { children: [
										"· ",
										salas.length || 5,
										" salas privativas"
									] }),
									/* @__PURE__ */ jsx("span", { children: "· Recepção e áreas de convivência" }),
									/* @__PURE__ */ jsx("span", { children: "· Estacionamento e segurança" }),
									/* @__PURE__ */ jsx("span", { children: "· Localização estratégica no Jardim de Alah" })
								]
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "col-span-12 min-w-0 lg:col-span-7",
						children: /* @__PURE__ */ jsx("video", {
							src: s.tour_video_url,
							controls: true,
							playsInline: true,
							preload: "metadata",
							className: "mx-auto aspect-[9/16] w-full max-w-[32rem] bg-charcoal/5 object-cover shadow-2xl shadow-charcoal/10 md:aspect-[4/5] lg:max-w-none",
							children: "Seu navegador não suporta vídeo HTML5."
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "salas",
				className: "scroll-mt-4 bg-oak/5 px-5 py-16 sm:py-20 md:px-8 md:py-24",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-10 grid grid-cols-1 items-end gap-6 md:mb-16 md:grid-cols-[minmax(0,1fr)_auto]",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-4 block",
								children: "Disponibilidade"
							}), /* @__PURE__ */ jsxs("h2", {
								className: "font-serif text-4xl leading-tight md:text-5xl",
								children: ["Cinco salas, ", /* @__PURE__ */ jsx("span", {
									className: "italic",
									children: "um só endereço."
								})]
							})]
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm font-light text-charcoal/60 max-w-xs",
							children: "Salas prontas para profissionais de saúde e estética. Consulte disponibilidade e condições de locação."
						})]
					}), /* @__PURE__ */ jsxs("ul", {
						className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10 border border-charcoal/10",
						children: [salas.map((sala) => {
							const ocupada = sala.status === "Ocupada";
							return /* @__PURE__ */ jsxs("li", {
								className: "flex min-h-[220px] flex-col justify-between bg-sand p-6 sm:p-8 md:min-h-[240px]",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-serif text-5xl leading-none",
										children: sala.numero
									}), /* @__PURE__ */ jsxs("span", {
										className: "inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-medium " + (ocupada ? "text-charcoal/60" : "text-leaf"),
										children: [/* @__PURE__ */ jsx("span", { className: "size-1.5 rounded-full " + (ocupada ? "bg-charcoal/40" : "bg-leaf") }), sala.status]
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "mt-8",
									children: [
										ocupada ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("p", {
											className: "text-[10px] uppercase tracking-widest text-oak font-semibold mb-2",
											children: sala.especialidade
										}), /* @__PURE__ */ jsx("h3", {
											className: "font-serif text-2xl leading-tight",
											children: sala.ocupante
										})] }) : /* @__PURE__ */ jsx("h3", {
											className: "font-serif text-2xl italic leading-tight",
											children: "Sala disponível"
										}),
										/* @__PURE__ */ jsx("p", {
											className: "text-sm text-charcoal/60 mt-2 font-light",
											children: sala.nota
										}),
										ocupada && (sala.instagram || sala.site || sala.whatsapp) && /* @__PURE__ */ jsxs("div", {
											className: "mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.2em]",
											children: [
												sala.instagram && /* @__PURE__ */ jsx("a", {
													href: sala.instagram,
													target: "_blank",
													rel: "noreferrer",
													className: "text-charcoal/70 hover:text-oak transition-colors underline underline-offset-4 decoration-oak/40",
													children: "Instagram"
												}),
												sala.site && /* @__PURE__ */ jsx("a", {
													href: sala.site,
													target: "_blank",
													rel: "noreferrer",
													className: "text-charcoal/70 hover:text-oak transition-colors underline underline-offset-4 decoration-oak/40",
													children: "Site"
												}),
												sala.whatsapp && /* @__PURE__ */ jsx("a", {
													href: sala.whatsapp,
													target: "_blank",
													rel: "noreferrer",
													className: "text-charcoal/70 hover:text-oak transition-colors underline underline-offset-4 decoration-oak/40",
													children: "WhatsApp"
												})
											]
										})
									]
								})]
							}, sala.id);
						}), /* @__PURE__ */ jsxs("li", {
							className: "flex min-h-[220px] flex-col justify-between bg-charcoal p-6 text-sand sm:p-8 md:min-h-[240px]",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] uppercase tracking-[0.3em] text-oak font-semibold",
								children: "Interessado?"
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-serif text-2xl leading-tight mb-4",
								children: "Fale sobre a locação de uma sala."
							}), /* @__PURE__ */ jsx("a", {
								href: s.whatsapp_url,
								className: "text-xs uppercase tracking-widest underline underline-offset-8 decoration-oak/50 hover:text-oak transition-colors",
								children: "Falar no WhatsApp →"
							})] })]
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "avaliacoes",
				className: "scroll-mt-4 bg-leaf px-5 py-16 text-sand sm:py-20 md:px-8 md:py-24",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-10 grid grid-cols-1 items-end gap-8 md:mb-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-4 block",
								children: "Experiências reais"
							}), /* @__PURE__ */ jsxs("h2", {
								className: "font-serif text-4xl md:text-5xl leading-[1.05]",
								children: ["Quem passa pela Mosantt, ", /* @__PURE__ */ jsx("span", {
									className: "italic",
									children: "recomenda."
								})]
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-[auto_minmax(0,1fr)] items-end gap-4 sm:gap-6 lg:justify-end",
								children: [/* @__PURE__ */ jsx("strong", {
									className: "font-serif text-6xl font-normal leading-[0.75] md:text-8xl",
									children: "5,0"
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "text-oak text-lg tracking-[0.18em]",
									"aria-label": "5 de 5 estrelas",
									children: "★★★★★"
								}), /* @__PURE__ */ jsx("p", {
									className: "mt-2 text-[10px] uppercase tracking-[0.16em] text-sand/60 sm:text-xs sm:tracking-[0.2em]",
									children: "9 avaliações no Google"
								})] })]
							})]
						}),
						/* @__PURE__ */ jsx("ul", {
							className: "columns-1 md:columns-2 lg:columns-3 gap-4",
							children: reviews.map((review) => /* @__PURE__ */ jsxs("li", {
								className: "mb-4 break-inside-avoid border border-sand/15 bg-sand/5 p-5 sm:p-6 md:p-7",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between gap-4 mb-6",
										children: [/* @__PURE__ */ jsx("div", {
											className: "text-oak text-xs tracking-[0.15em]",
											"aria-hidden": "true",
											children: "★★★★★"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-sand/45 whitespace-nowrap",
											children: review.when
										})]
									}),
									/* @__PURE__ */ jsxs("blockquote", {
										className: "font-serif text-xl leading-relaxed text-sand/90",
										children: [
											"“",
											review.text,
											"”"
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-6 text-[10px] uppercase tracking-[0.2em] text-sand/55",
										children: review.name
									})
								]
							}, review.name))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-sand/15 pt-8",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-light text-sand/60",
								children: "Avaliações compartilhadas por pacientes e visitantes."
							}), /* @__PURE__ */ jsx("a", {
								href: s.maps_url,
								target: "_blank",
								rel: "noreferrer",
								className: "text-xs uppercase tracking-[0.2em] text-sand underline underline-offset-8 decoration-oak/60 hover:text-oak transition-colors",
								children: "Ver no Google →"
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("footer", {
				id: "localizacao",
				className: "scroll-mt-4 bg-charcoal px-5 py-16 text-sand md:px-8 md:py-20",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr] min-w-0",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-6 block",
								children: "Onde Estamos"
							}),
							/* @__PURE__ */ jsxs("h3", {
								className: "font-serif text-3xl md:text-4xl mb-6 max-w-2xl min-w-0 break-words",
								children: [
									s.address_line1,
									/* @__PURE__ */ jsx("br", {}),
									s.address_line2
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-sand/50 font-light mb-12 max-w-md",
								children: "Um ponto estratégico de fácil acesso, com estacionamento privativo e segurança."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-4 min-w-0",
								children: [
									/* @__PURE__ */ jsx("a", {
										href: s.maps_url,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex min-h-11 w-fit items-center text-sm underline decoration-oak/30 underline-offset-8 transition-colors hover:text-oak",
										children: "Ver no Google Maps"
									}),
									/* @__PURE__ */ jsx("a", {
										href: s.instagram_url,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex min-h-11 w-fit items-center text-sm underline decoration-oak/30 underline-offset-8 transition-colors hover:text-oak",
										children: "Instagram @mosantt"
									}),
									/* @__PURE__ */ jsx("a", {
										href: s.whatsapp_url,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex min-h-11 w-fit items-center text-sm underline decoration-oak/30 underline-offset-8 transition-colors hover:text-oak",
										children: "WhatsApp"
									})
								]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col gap-8 min-w-0 lg:pl-12 lg:border-l lg:border-sand/10",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-3 block",
								children: "Horário de Funcionamento"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-sand/80 font-light text-sm leading-relaxed",
								children: [
									"Segunda a sexta: 08:00 às 18:00",
									/* @__PURE__ */ jsx("br", {}),
									"Sábado: 08:00 às 12:00"
								]
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-3 block",
								children: "Contato Comercial"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sand/80 font-light text-sm leading-relaxed",
								children: "WhatsApp / Tel: (68) 99230-2967"
							})] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
								className: "text-[10px] uppercase tracking-[0.3em] text-oak font-semibold mb-3 block",
								children: "Dados da Empresa"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-sand/50 font-light text-xs leading-relaxed",
								children: [
									"Razão Social: J M M & A M RABELO LTDA",
									/* @__PURE__ */ jsx("br", {}),
									"CNPJ: 46.748.316/0001-67",
									/* @__PURE__ */ jsx("br", {}),
									"Mosantt Saúde e Estética"
								]
							})] })
						]
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-6 border-t border-sand/10 pt-8 text-center min-w-0 md:mt-20 md:flex-row md:pt-10 md:text-left",
					children: [/* @__PURE__ */ jsx("a", {
						href: "#top",
						className: "block shrink-0",
						children: /* @__PURE__ */ jsx("img", {
							src: mosantt_logo_png_asset_default.url,
							alt: "Mosantt",
							className: "h-8 w-auto brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
						})
					}), /* @__PURE__ */ jsxs("p", {
						className: "text-[10px] uppercase tracking-[0.2em] text-sand/30 min-w-0",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" Mosantt — Saúde e Estética."
						]
					})]
				})]
			})
		]
	});
}
//#endregion
export { Index as component };
