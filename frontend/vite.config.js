import { defineConfig } from "vite";

export default defineConfig({
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: "https://arpi-to-do.netlify.app/",
    },
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: "index.html",
    },
  },
});
