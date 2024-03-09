import { fileURLToPath, URL } from "node:url";
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
    }),
    handlebars({
      partialDirectory: resolve("./src/partials"),
    }),
  ],
  root: "src",
  build: {
    outDir: "../dist",
  },
  publicDir: "../public",
});
