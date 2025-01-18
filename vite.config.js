import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const vitConfig = {
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
};

if (process.env.NODE_ENV === "production") {
  vitConfig.base = "/RealEstate-Frontend/";
}

// https://vitejs.dev/config/
export default defineConfig(vitConfig);
