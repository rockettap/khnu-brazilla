import { resolve } from "node:path";

import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 70,
      },
      jpeg: {
        quality: 70,
      },
      jpg: {
        quality: 70,
      },
      webp: {
        quality: 70,
      },
    }),
    handlebars({
      partialDirectory: resolve("./src/partials"),
    }),
  ],
  root: "src",
  base: "/khnu-brazilla/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "./src/index.html"),
        dashboard: resolve(__dirname, "./src/dashboard/index.html"),
        products: resolve(__dirname, "./src/products/index.html"),
        basket: resolve(__dirname, "./src/basket/index.html"),
      },
    },
  },
  publicDir: "../public",
});
