import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  cacheDir: "node_modules/.vite_cache",
  server: {
    host: "0.0.0.0", // This makes Vite listen on all network interfaces
    port: 5173,
    strictPort: true,
    allowedHosts: ["marketify.com", "localhost", "127.0.0.1"],
  },
});
