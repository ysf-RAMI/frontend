import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/", // Set this to "/" if your app is deployed at the root of the domain
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
    open: true, // Automatically open the app in the browser
  },
});
