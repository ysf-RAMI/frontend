import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Set this to "/" if your app is deployed at the root of the domain
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
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV), // Use this instead of hardcoding "development"
  },
  build: {
    outDir: "dist", // Output directory for the build
    assetsDir: "assets", // Directory for assets (CSS, images, etc.)
    emptyOutDir: true, // Ensure the output directory is emptied before building
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]", // Naming convention for assets
        entryFileNames: "assets/[name].[hash].js", // Naming convention for JS files
      },
    },
  },
  server: {
    port: 3000, // Port for the development server
    open: true, // Automatically open the app in the browser
  },
});
