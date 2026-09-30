import { doc, getDoc, collection, query, orderBy, getDocs, setDoc } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "./firebase";

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

const baseSalas: Sala[] = [
  { id: "sala-1", numero: "01", status: "Disponível", ocupante: null, especialidade: null, nota: null, instagram: null, site: null, whatsapp: null, ordem: 1 },
  { id: "sala-2", numero: "02", status: "Disponível", ocupante: null, especialidade: null, nota: null, instagram: null, site: null, whatsapp: null, ordem: 2 },
  { id: "sala-3", numero: "03", status: "Disponível", ocupante: null, especialidade: null, nota: null, instagram: null, site: null, whatsapp: null, ordem: 3 },
  { id: "sala-4", numero: "04", status: "Disponível", ocupante: null, especialidade: null, nota: null, instagram: null, site: null, whatsapp: null, ordem: 4 },
  { id: "sala-5", numero: "05", status: "Ocupada", ocupante: "Studio ALS", especialidade: "Dr. Alison Mota - Invisalign doctor", nota: "Odontologia integrada", instagram: "https://instagram.com/dralisonmota", site: "https://dr-alison-prototipo.web.app", whatsapp: null, ordem: 5 },
];

export async function getSiteContent() {
  try {
    const settingsRef = doc(db, "site_settings", "main");
    const settingsSnap = await getDoc(settingsRef);
    const settings = settingsSnap.exists() ? (settingsSnap.data() as SiteSettings) : null;

    const salasRef = collection(db, "salas");
    const salasSnap = await getDocs(salasRef);
    
    const fetchedSalas = salasSnap.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Sala[];

    const salas = baseSalas.map(baseSala => {
      const found = fetchedSalas.find(s => s.id === baseSala.id);
      return found ? { ...baseSala, ...found } : baseSala;
    });

    const resolveUrl = async (value: string) => {
      if (!value.startsWith("site-media/")) return value;
      try {
        const fileRef = ref(storage, value);
        return await getDownloadURL(fileRef);
      } catch (e) {
        console.error("Error generating url for", value, e);
        return value;
      }
    };

    const rawMedia = settings
      ? { hero_image_url: settings.hero_image_url, tour_video_url: settings.tour_video_url }
      : { hero_image_url: "", tour_video_url: "" };

    if (settings) {
      settings.hero_image_url = await resolveUrl(settings.hero_image_url);
      settings.tour_video_url = await resolveUrl(settings.tour_video_url);
    }

    return { settings: settings ?? null, salas: salas ?? [], rawMedia };
  } catch (e) {
    console.error("getSiteContent failed:", e);
    return { settings: null, salas: [], rawMedia: { hero_image_url: "", tour_video_url: "" } };
  }
}

export async function updateSiteSettings({ data }: { data: Partial<SiteSettings> }) {
  if (!auth.currentUser) throw new Error("Unauthorized");
  await setDoc(doc(db, "site_settings", "main"), { ...data, updated_at: new Date().toISOString() }, { merge: true });
  return { ok: true };
}

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

export async function updateSala({ data }: { data: SalaInput }) {
  if (!auth.currentUser) throw new Error("Unauthorized");
  const { id, ...fields } = data;
  await setDoc(doc(db, "salas", id), { ...fields, updated_at: new Date().toISOString() }, { merge: true });
  return { ok: true };
}

export async function getIsAdmin() {
  if (!auth.currentUser) return { isAdmin: false };
  try {
    const adminDoc = await getDoc(doc(db, "admins", auth.currentUser.uid));
    return { isAdmin: adminDoc.exists() };
  } catch {
    return { isAdmin: false };
  }
}
