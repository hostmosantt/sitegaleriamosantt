import { i as updateSiteSettings, n as getSiteContent, r as updateSala, t as getIsAdmin } from "./site.functions-dWhbqUwp.js";
import { n as storage, t as auth } from "./firebase-C8tY7j5K.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, isRedirect, useNavigate, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { signOut } from "firebase/auth";
import { ref, uploadBytes } from "firebase/storage";
//#region node_modules/@tanstack/react-start/dist/esm/useServerFn.js
function useServerFn(serverFn) {
	const router = useRouter();
	return React.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
//#endregion
//#region src/routes/_authenticated/admin.tsx?tsr-split=component
function Field({ label, value, onChange, textarea }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "block text-[10px] uppercase tracking-[0.2em] text-charcoal/60",
		children: [label, textarea ? /* @__PURE__ */ jsx("textarea", {
			rows: 4,
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-2 w-full border border-charcoal/20 bg-white/60 px-4 py-3 text-sm normal-case tracking-normal text-charcoal outline-none focus:border-oak"
		}) : /* @__PURE__ */ jsx("input", {
			value,
			onChange: (e) => onChange(e.target.value),
			className: "mt-2 w-full border border-charcoal/20 bg-white/60 px-4 py-3 text-sm normal-case tracking-normal text-charcoal outline-none focus:border-oak"
		})]
	});
}
function AdminPage() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const fetchContent = useServerFn(getSiteContent);
	const fetchIsAdmin = useServerFn(getIsAdmin);
	const saveSettings = useServerFn(updateSiteSettings);
	const saveSala = useServerFn(updateSala);
	const adminQuery = useQuery({
		queryKey: ["is-admin"],
		queryFn: () => fetchIsAdmin()
	});
	const contentQuery = useQuery({
		queryKey: ["site-content-admin"],
		queryFn: () => fetchContent()
	});
	const [form, setForm] = useState(null);
	const [salas, setSalas] = useState([]);
	const [saving, setSaving] = useState(false);
	const [uploading, setUploading] = useState(null);
	useEffect(() => {
		if (contentQuery.data?.settings) {
			const { id: _id, updated_at: _u, ...rest } = contentQuery.data.settings;
			const raw = contentQuery.data.rawMedia;
			setForm({
				...rest,
				hero_image_url: raw?.hero_image_url || rest.hero_image_url,
				tour_video_url: raw?.tour_video_url || rest.tour_video_url
			});
		}
		if (contentQuery.data?.salas) setSalas(contentQuery.data.salas);
	}, [contentQuery.data]);
	async function handleSignOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await signOut(auth);
		navigate({
			to: "/auth",
			replace: true
		});
	}
	async function uploadMedia(file, field) {
		setUploading(field);
		try {
			const path = `${field === "hero_image_url" ? "hero" : "tour"}/${Date.now()}-${file.name.replace(/[^\w.\-]/g, "_")}`;
			const storageRef = ref(storage, `site-media/${path}`);
			await uploadBytes(storageRef, file);
			setForm((prev) => prev ? {
				...prev,
				[field]: `site-media/${path}`
			} : prev);
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
	async function handleSaveSala(sala) {
		try {
			await saveSala({ data: {
				id: sala.id,
				status: sala.status,
				ocupante: sala.ocupante,
				especialidade: sala.especialidade,
				nota: sala.nota,
				instagram: sala.instagram,
				site: sala.site,
				whatsapp: sala.whatsapp
			} });
			toast.success(`Sala ${sala.numero} salva.`);
			queryClient.invalidateQueries();
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Não foi possível salvar a sala.");
		}
	}
	if (adminQuery.data && !adminQuery.data.isAdmin) return /* @__PURE__ */ jsx("main", {
		className: "min-h-screen bg-sand text-charcoal grid place-items-center px-6 text-center",
		children: /* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsx("h1", {
				className: "font-serif text-3xl mb-3",
				children: "Sem permissão"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "text-sm text-charcoal/60 font-light mb-6",
				children: "Esta conta não tem acesso de administrador."
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: handleSignOut,
				className: "text-[10px] uppercase tracking-[0.2em] hover:text-oak",
				children: "Sair"
			})
		] })
	});
	return /* @__PURE__ */ jsx("main", {
		className: "min-h-screen bg-sand text-charcoal px-6 md:px-10 py-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-4xl mx-auto",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "flex flex-wrap items-end justify-between gap-4 mb-12",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
					className: "text-[10px] uppercase tracking-[0.3em] text-oak font-semibold",
					children: "Painel"
				}), /* @__PURE__ */ jsx("h1", {
					className: "font-serif text-4xl mt-2",
					children: "Editar o site"
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-6 text-[10px] uppercase tracking-[0.2em] text-charcoal/60",
					children: [/* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "hover:text-oak",
						children: "Ver site"
					}), /* @__PURE__ */ jsx("button", {
						onClick: handleSignOut,
						className: "hover:text-oak",
						children: "Sair"
					})]
				})]
			}), !form ? /* @__PURE__ */ jsx("p", {
				className: "text-sm text-charcoal/60",
				children: "Carregando..."
			}) : /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-12",
				children: [
					/* @__PURE__ */ jsxs("section", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "font-serif text-2xl",
								children: "Início (hero)"
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Linha superior",
								value: form.hero_eyebrow,
								onChange: (v) => setForm({
									...form,
									hero_eyebrow: v
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Título — 1ª linha",
								value: form.hero_title_line1,
								onChange: (v) => setForm({
									...form,
									hero_title_line1: v
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Título — 2ª linha (itálico)",
								value: form.hero_title_line2,
								onChange: (v) => setForm({
									...form,
									hero_title_line2: v
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Frase de apoio",
								textarea: true,
								value: form.hero_subtitle,
								onChange: (v) => setForm({
									...form,
									hero_subtitle: v
								})
							}),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-[10px] uppercase tracking-[0.2em] text-charcoal/60",
									children: "Foto do topo"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "file",
									accept: "image/*",
									onChange: (e) => {
										const file = e.target.files?.[0];
										if (file) uploadMedia(file, "hero_image_url");
									},
									className: "mt-2 block w-full text-xs"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-xs text-charcoal/50 break-all",
									children: form.hero_image_url
								}),
								uploading === "hero_image_url" && /* @__PURE__ */ jsx("p", {
									className: "text-xs text-oak",
									children: "Enviando..."
								})
							] })
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "font-serif text-2xl",
								children: "Sobre o espaço"
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Título",
								value: form.about_title,
								onChange: (v) => setForm({
									...form,
									about_title: v
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Texto",
								textarea: true,
								value: form.about_text,
								onChange: (v) => setForm({
									...form,
									about_text: v
								})
							})
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "font-serif text-2xl",
								children: "Tour em vídeo"
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Título",
								value: form.tour_title,
								onChange: (v) => setForm({
									...form,
									tour_title: v
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Texto",
								textarea: true,
								value: form.tour_text,
								onChange: (v) => setForm({
									...form,
									tour_text: v
								})
							}),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("span", {
									className: "text-[10px] uppercase tracking-[0.2em] text-charcoal/60",
									children: "Vídeo"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "file",
									accept: "video/*",
									onChange: (e) => {
										const file = e.target.files?.[0];
										if (file) uploadMedia(file, "tour_video_url");
									},
									className: "mt-2 block w-full text-xs"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-xs text-charcoal/50 break-all",
									children: form.tour_video_url
								}),
								uploading === "tour_video_url" && /* @__PURE__ */ jsx("p", {
									className: "text-xs text-oak",
									children: "Enviando..."
								})
							] })
						]
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "font-serif text-2xl",
								children: "Contato e endereço"
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Link do WhatsApp",
								value: form.whatsapp_url,
								onChange: (v) => setForm({
									...form,
									whatsapp_url: v
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Instagram",
								value: form.instagram_url,
								onChange: (v) => setForm({
									...form,
									instagram_url: v
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Endereço — linha 1",
								value: form.address_line1,
								onChange: (v) => setForm({
									...form,
									address_line1: v
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Endereço — linha 2",
								value: form.address_line2,
								onChange: (v) => setForm({
									...form,
									address_line2: v
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Link do Google Maps",
								value: form.maps_url,
								onChange: (v) => setForm({
									...form,
									maps_url: v
								})
							})
						]
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: handleSaveSettings,
						disabled: saving,
						className: "self-start bg-charcoal px-8 py-4 text-[11px] uppercase tracking-[0.25em] text-sand transition-colors hover:bg-oak disabled:opacity-50",
						children: saving ? "Salvando..." : "Salvar conteúdo"
					}),
					/* @__PURE__ */ jsxs("section", {
						className: "flex flex-col gap-8 border-t border-charcoal/10 pt-12",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "font-serif text-2xl",
							children: "Salas"
						}), salas.map((sala, idx) => /* @__PURE__ */ jsxs("div", {
							className: "border border-charcoal/10 p-6 flex flex-col gap-4 bg-white/40",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-serif text-3xl",
										children: sala.numero
									}), /* @__PURE__ */ jsxs("select", {
										value: sala.status,
										onChange: (e) => {
											const next = [...salas];
											next[idx] = {
												...sala,
												status: e.target.value
											};
											setSalas(next);
										},
										className: "border border-charcoal/20 bg-white/60 px-3 py-2 text-xs",
										children: [/* @__PURE__ */ jsx("option", {
											value: "Disponível",
											children: "Disponível"
										}), /* @__PURE__ */ jsx("option", {
											value: "Ocupada",
											children: "Ocupada"
										})]
									})]
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Nome do doutor",
									value: sala.ocupante ?? "",
									onChange: (v) => {
										const next = [...salas];
										next[idx] = {
											...sala,
											ocupante: v
										};
										setSalas(next);
									}
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Especialidade",
									value: sala.especialidade ?? "",
									onChange: (v) => {
										const next = [...salas];
										next[idx] = {
											...sala,
											especialidade: v
										};
										setSalas(next);
									}
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Descrição",
									textarea: true,
									value: sala.nota ?? "",
									onChange: (v) => {
										const next = [...salas];
										next[idx] = {
											...sala,
											nota: v
										};
										setSalas(next);
									}
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Instagram",
									value: sala.instagram ?? "",
									onChange: (v) => {
										const next = [...salas];
										next[idx] = {
											...sala,
											instagram: v
										};
										setSalas(next);
									}
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Site",
									value: sala.site ?? "",
									onChange: (v) => {
										const next = [...salas];
										next[idx] = {
											...sala,
											site: v
										};
										setSalas(next);
									}
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "WhatsApp",
									value: sala.whatsapp ?? "",
									onChange: (v) => {
										const next = [...salas];
										next[idx] = {
											...sala,
											whatsapp: v
										};
										setSalas(next);
									}
								}),
								/* @__PURE__ */ jsxs("button", {
									onClick: () => void handleSaveSala(sala),
									className: "self-start border border-charcoal/30 px-6 py-3 text-[10px] uppercase tracking-[0.25em] hover:border-oak hover:text-oak",
									children: ["Salvar sala ", sala.numero]
								})
							]
						}, sala.id))]
					})
				]
			})]
		})
	});
}
//#endregion
export { AdminPage as component };
