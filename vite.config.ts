import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    host: true // Allows external access
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Better import paths
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'recharts'] // Better performance
  }
});