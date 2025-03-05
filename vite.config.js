import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "@mui/material",
      "@mui/icons-material",
      "framer-motion",
      "react-bootstrap",
    ],
    exclude: ["react/jsx-runtime"],
  },
  build: {
    outDir: "dist",
  },
  server: {
    open: true,
    historyApiFallback: true,
  },
});
