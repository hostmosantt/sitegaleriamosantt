import { jsx } from "react/jsx-runtime";
//#region src/routes/index.tsx?tsr-split=errorComponent
var SplitErrorComponent = () => /* @__PURE__ */ jsx("div", {
	className: "min-h-screen grid place-items-center bg-sand text-charcoal px-6 text-center",
	children: /* @__PURE__ */ jsx("p", {
		className: "font-serif text-2xl",
		children: "Não foi possível carregar o conteúdo. Recarregue a página."
	})
});
//#endregion
export { SplitErrorComponent as errorComponent };
