import { n as createMiddleware, o as getRequest } from "./server-3_X_dCWM.js";
createMiddleware({ type: "function" }).server(async ({ next }) => {
	const { getApps, initializeApp, cert } = await import("firebase-admin/app");
	const { getAuth } = await import("firebase-admin/auth");
	if (!getApps().length) try {
		const serviceAccountStr = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
		if (serviceAccountStr) initializeApp({ credential: cert(JSON.parse(serviceAccountStr)) });
		else initializeApp();
	} catch (e) {
		console.error("Failed to initialize Firebase Admin in middleware", e);
	}
	const request = getRequest();
	if (!request?.headers) throw new Error("Unauthorized: No request headers available");
	const authHeader = request.headers.get("authorization");
	if (!authHeader) throw new Error("Unauthorized: No authorization header provided");
	if (!authHeader.startsWith("Bearer ")) throw new Error("Unauthorized: Only Bearer tokens are supported");
	const token = authHeader.replace("Bearer ", "");
	if (!token) throw new Error("Unauthorized: No token provided");
	try {
		const decodedToken = await getAuth().verifyIdToken(token);
		return next({ context: {
			userId: decodedToken.uid,
			claims: decodedToken
		} });
	} catch (error) {
		console.error("Firebase auth verification error:", error);
		throw new Error("Unauthorized: Invalid token");
	}
});
//#endregion
export {};
