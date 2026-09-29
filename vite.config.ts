import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

const firebaseAdminPackages = [
  "firebase-admin",
  "firebase-admin/app",
  "firebase-admin/auth",
  "firebase-admin/firestore",
  "firebase-admin/storage",
  "google-auth-library",
  "google-logging-utils",
  "gcp-metadata",
  "@google-cloud/firestore",
  "@google-cloud/storage",
  "google-gax",
];

export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tanstackStart(),
    tailwindcss(),
    react(),
  ],
  server: {
    port: 3000
  },
  ssr: {
    // These are CJS/Node-only packages — externalize from SSR bundle
    // so Vite's module runner uses the real Node require() for them.
    external: firebaseAdminPackages,
  },
  optimizeDeps: {
    // Exclude firebase-admin packages from client-side pre-bundling entirely.
    exclude: firebaseAdminPackages,
  },
});
