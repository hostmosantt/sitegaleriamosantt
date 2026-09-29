import { createServerFn } from "@tanstack/react-start";

// Definitions matching our Firestore documents structure
export type SiteSettings = {
  hero_eyebrow: string;
  hero_title_line1: string;
  hero_title_line2: string;
  hero_subtitle: string;
  hero_image_url: string;
  about_title: string;
  about_text: string;
  tour_title: string;
  tour_text: string;
  tour_video_url: string;
  whatsapp_url: string;
  instagram_url: string;
  address_line1: string;
  address_line2: string;
  maps_url: string;
};

export type Sala = {
  id: string;
  numero: string;
  status: string;
  ocupante: string | null;
  especialidade: string | null;
  nota: string | null;
  instagram: string | null;
  site: string | null;
  whatsapp: string | null;
  ordem: number;
};

export const getSiteContent = createServerFn({ method: "GET" }).handler(async () => {
  try {
    // Dynamic import — firebase-admin never enters the client bundle
    const getAdmin = (await import("@/lib/firebase-admin")).default;
    const { adminDb, adminStorage } = await getAdmin();

    const settingsDoc = await adminDb.collection("site_settings").doc("main").get();
    const settings = settingsDoc.exists ? (settingsDoc.data() as SiteSettings) : null;

    const salasSnapshot = await adminDb.collection("salas").orderBy("ordem", "asc").get();
    const salas = salasSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    })) as Sala[];

    const resolve = async (value: string) => {
      if (!value.startsWith("site-media/")) return value;
      const path = value.slice("site-media/".length);
      try {
        const bucket = adminStorage.bucket();
        const file = bucket.file(path);
        const [url] = await file.getSignedUrl({
          action: "read",
          expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
        });
        return url;
      } catch (e) {
        console.error("Error generating signed url for", path, e);
        return value;
      }
    };

    const rawMedia = settings
      ? { hero_image_url: settings.hero_image_url, tour_video_url: settings.tour_video_url }
      : { hero_image_url: "", tour_video_url: "" };

    if (settings) {
      settings.hero_image_url = await resolve(settings.hero_image_url);
      settings.tour_video_url = await resolve(settings.tour_video_url);
    }

    return { settings: settings ?? null, salas: salas ?? [], rawMedia };
  } catch (e) {
    console.error("getSiteContent failed (Firebase Admin may not be configured):", e);
    return { settings: null, salas: [], rawMedia: { hero_image_url: "", tour_video_url: "" } };
  }
});

type SettingsInput = Partial<SiteSettings>;

export const updateSiteSettings = createServerFn({ method: "POST" })
  .validator((data: SettingsInput) => data)
  .handler(async ({ data }) => {
    const { requireFirebaseAuth } = await import("@/lib/auth-middleware");
    const getAdmin = (await import("@/lib/firebase-admin")).default;
    const { adminDb } = await getAdmin();
    await adminDb.collection("site_settings").doc("main").set(
      { ...data, updated_at: new Date().toISOString() },
      { merge: true }
    );
    return { ok: true };
  });

type SalaInput = {
  id: string;
  status: string;
  ocupante: string | null;
  especialidade: string | null;
  nota: string | null;
  instagram: string | null;
  site: string | null;
  whatsapp: string | null;
};

export const updateSala = createServerFn({ method: "POST" })
  .validator((data: SalaInput) => data)
  .handler(async ({ data }) => {
    const getAdmin = (await import("@/lib/firebase-admin")).default;
    const { adminDb } = await getAdmin();
    const { id, ...fields } = data;
    await adminDb.collection("salas").doc(id).set(
      { ...fields, updated_at: new Date().toISOString() },
      { merge: true }
    );
    return { ok: true };
  });

export const getIsAdmin = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  const getAdmin = (await import("@/lib/firebase-admin")).default;
  const { adminDb } = await getAdmin();
  const adminDoc = await adminDb.collection("admins").doc((context as any).userId).get();
  return { isAdmin: adminDoc.exists };
});
