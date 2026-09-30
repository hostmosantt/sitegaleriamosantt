import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./server-3_X_dCWM.js";
//#region node_modules/@tanstack/start-server-core/dist/esm/createServerRpc.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
//#region src/lib/site.functions.ts?tss-serverfn-split
var getSiteContent_createServerFn_handler = createServerRpc({
	id: "6ec6b4bfc2dfcb6a389505f167baeacfb39cd74edd77bcf1a7706c9cbe7a6a1a",
	name: "getSiteContent",
	filename: "src/lib/site.functions.ts"
}, (opts) => getSiteContent.__executeServer(opts));
var getSiteContent = createServerFn({ method: "GET" }).handler(getSiteContent_createServerFn_handler, async () => {
	try {
		const getAdmin = (await import("./firebase-admin-DIFiFQ0G.js")).default;
		const { adminDb, adminStorage } = await getAdmin();
		const settingsDoc = await adminDb.collection("site_settings").doc("main").get();
		const settings = settingsDoc.exists ? settingsDoc.data() : null;
		const salas = (await adminDb.collection("salas").orderBy("ordem", "asc").get()).docs.map((doc) => ({
			id: doc.id,
			...doc.data()
		}));
		const resolve = async (value) => {
			if (!value.startsWith("site-media/")) return value;
			const path = value.slice(11);
			try {
				const [url] = await adminStorage.bucket().file(path).getSignedUrl({
					action: "read",
					expires: Date.now() + 6048e5
				});
				return url;
			} catch (e) {
				console.error("Error generating signed url for", path, e);
				return value;
			}
		};
		const rawMedia = settings ? {
			hero_image_url: settings.hero_image_url,
			tour_video_url: settings.tour_video_url
		} : {
			hero_image_url: "",
			tour_video_url: ""
		};
		if (settings) {
			settings.hero_image_url = await resolve(settings.hero_image_url);
			settings.tour_video_url = await resolve(settings.tour_video_url);
		}
		return {
			settings: settings ?? null,
			salas: salas ?? [],
			rawMedia
		};
	} catch (e) {
		console.error("getSiteContent failed (Firebase Admin may not be configured):", e);
		return {
			settings: null,
			salas: [],
			rawMedia: {
				hero_image_url: "",
				tour_video_url: ""
			}
		};
	}
});
var updateSiteSettings_createServerFn_handler = createServerRpc({
	id: "6c716f752d97f0b78c5666bf4d953e7f4130b1775527e18023feeed9a6e059a7",
	name: "updateSiteSettings",
	filename: "src/lib/site.functions.ts"
}, (opts) => updateSiteSettings.__executeServer(opts));
var updateSiteSettings = createServerFn({ method: "POST" }).validator((data) => data).handler(updateSiteSettings_createServerFn_handler, async ({ data }) => {
	const { requireFirebaseAuth } = await import("./auth-middleware-VS-H7vWR.js");
	const getAdmin = (await import("./firebase-admin-DIFiFQ0G.js")).default;
	const { adminDb } = await getAdmin();
	await adminDb.collection("site_settings").doc("main").set({
		...data,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}, { merge: true });
	return { ok: true };
});
var updateSala_createServerFn_handler = createServerRpc({
	id: "4a244bfab04e8db441a63f69224b92def0fb55af5128ac8c1e444548f9846dfc",
	name: "updateSala",
	filename: "src/lib/site.functions.ts"
}, (opts) => updateSala.__executeServer(opts));
var updateSala = createServerFn({ method: "POST" }).validator((data) => data).handler(updateSala_createServerFn_handler, async ({ data }) => {
	const getAdmin = (await import("./firebase-admin-DIFiFQ0G.js")).default;
	const { adminDb } = await getAdmin();
	const { id, ...fields } = data;
	await adminDb.collection("salas").doc(id).set({
		...fields,
		updated_at: (/* @__PURE__ */ new Date()).toISOString()
	}, { merge: true });
	return { ok: true };
});
var getIsAdmin_createServerFn_handler = createServerRpc({
	id: "cd0ee8bfabba6cd606c866753c08e7868ccdcd6b05ef7465c6027015e943e7d1",
	name: "getIsAdmin",
	filename: "src/lib/site.functions.ts"
}, (opts) => getIsAdmin.__executeServer(opts));
var getIsAdmin = createServerFn({ method: "GET" }).handler(getIsAdmin_createServerFn_handler, async ({ context }) => {
	const getAdmin = (await import("./firebase-admin-DIFiFQ0G.js")).default;
	const { adminDb } = await getAdmin();
	return { isAdmin: (await adminDb.collection("admins").doc(context.userId).get()).exists };
});
//#endregion
export { getIsAdmin_createServerFn_handler, getSiteContent_createServerFn_handler, updateSala_createServerFn_handler, updateSiteSettings_createServerFn_handler };
