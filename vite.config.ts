import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@router": path.resolve(__dirname, "./src/router"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
    },
  },
  plugins: [react(), svgr()],
});
