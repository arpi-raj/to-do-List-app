import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    cors: {
      // the origin you will be accessing via browser
      origin: 'https://to-do-list-app-yjan.onrender.com',
    },
  },
  build: {
    // generate .vite/manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: 'index.html',
    },
  },
})