import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { AdsClick } from "@mui/icons-material";

export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure this is correct for your deployment path
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
  define: {
    "process.env.NODE_ENV": '"development"',
  },
  build: {
    outDir: "/dist",
  },
});
