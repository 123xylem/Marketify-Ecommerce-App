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
  envDir: "../",
  cacheDir: "node_modules/.vite_cache",
});

// export default defineConfig({
//   cacheDir: "node_modules/.vite_cache",
//   plugins: [react()],
//   envDir: "../",
// });
