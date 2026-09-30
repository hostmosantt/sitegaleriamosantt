import { a as getServerFnById, i as TSS_SERVER_FUNCTION, r as createServerFn } from "./server-3_X_dCWM.js";
//#region node_modules/@tanstack/start-server-core/dist/esm/createSsrRpc.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/site.functions.ts
var getSiteContent = createServerFn({ method: "GET" }).handler(createSsrRpc("6ec6b4bfc2dfcb6a389505f167baeacfb39cd74edd77bcf1a7706c9cbe7a6a1a"));
var updateSiteSettings = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("6c716f752d97f0b78c5666bf4d953e7f4130b1775527e18023feeed9a6e059a7"));
var updateSala = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("4a244bfab04e8db441a63f69224b92def0fb55af5128ac8c1e444548f9846dfc"));
var getIsAdmin = createServerFn({ method: "GET" }).handler(createSsrRpc("cd0ee8bfabba6cd606c866753c08e7868ccdcd6b05ef7465c6027015e943e7d1"));
//#endregion
export { updateSiteSettings as i, getSiteContent as n, updateSala as r, getIsAdmin as t };
