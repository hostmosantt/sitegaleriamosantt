import { jsx } from "react/jsx-runtime";
//#region src/routes/index.tsx?tsr-split=notFoundComponent
var SplitNotFoundComponent = () => /* @__PURE__ */ jsx("div", {
	className: "min-h-screen grid place-items-center bg-sand text-charcoal",
	children: /* @__PURE__ */ jsx("p", {
		className: "font-serif text-2xl",
		children: "Página não encontrada"
	})
});
//#endregion
export { SplitNotFoundComponent as notFoundComponent };
