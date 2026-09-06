import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    proxy: {
      // Relative browser requests go to Express without adding CORS setup.
      "/api": `http://127.0.0.1:${process.env.PORT || 3001}`,
    },
  },
  build: {
    // Preserve earlier generated assets rather than automatically deleting them.
    emptyOutDir: false,
  },
});
