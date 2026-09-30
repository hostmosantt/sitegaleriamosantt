//#region src/lib/firebase-admin.ts
async function getAdminModules() {
	const { initializeApp, getApps, cert, getApp } = await import("firebase-admin/app");
	const { getFirestore } = await import("firebase-admin/firestore");
	const { getAuth } = await import("firebase-admin/auth");
	const { getStorage } = await import("firebase-admin/storage");
	if (!getApps().length) {
		const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
		if (serviceAccountStr) try {
			initializeApp({ credential: cert(JSON.parse(serviceAccountStr)) });
		} catch (e) {
			console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_JSON:", e);
			try {
				initializeApp();
			} catch {}
		}
		else try {
			initializeApp();
		} catch (e) {
			console.error("Firebase Admin SDK could not initialize (no credentials):", e);
		}
	}
	return {
		adminDb: getFirestore(),
		adminAuth: getAuth(),
		adminStorage: getStorage()
	};
}
//#endregion
export { getAdminModules as default };
