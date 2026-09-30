import { t as auth } from "./firebase-C8tY7j5K.js";
import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { signInWithEmailAndPassword } from "firebase/auth";
//#region src/routes/auth.tsx?tsr-split=component
function AuthPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	async function handleSubmit(e) {
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
	return /* @__PURE__ */ jsx("main", {
		className: "min-h-screen bg-sand text-charcoal flex items-center justify-center px-6",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "font-serif text-3xl mb-2",
					children: "Painel Mosantt"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "text-sm text-charcoal/60 font-light mb-8",
					children: "Entre para editar o site."
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: handleSubmit,
					className: "flex flex-col gap-4",
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "text-[10px] uppercase tracking-[0.25em] text-charcoal/60",
							children: ["E-mail", /* @__PURE__ */ jsx("input", {
								type: "email",
								required: true,
								value: email,
								onChange: (e) => setEmail(e.target.value),
								className: "mt-2 w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm tracking-normal normal-case text-charcoal outline-none focus:border-oak"
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "text-[10px] uppercase tracking-[0.25em] text-charcoal/60",
							children: ["Senha", /* @__PURE__ */ jsx("input", {
								type: "password",
								required: true,
								minLength: 6,
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "mt-2 w-full border border-charcoal/20 bg-transparent px-4 py-3 text-sm tracking-normal normal-case text-charcoal outline-none focus:border-oak"
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: loading,
							className: "mt-2 bg-charcoal px-6 py-3.5 text-[11px] uppercase tracking-[0.25em] text-sand transition-colors hover:bg-oak disabled:opacity-50",
							children: loading ? "Aguarde..." : "Entrar"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 flex justify-end text-[10px] uppercase tracking-[0.2em] text-charcoal/50",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "hover:text-oak",
						children: "Voltar ao site"
					})
				})
			]
		})
	});
}
//#endregion
export { AuthPage as component };
