import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve, relative, sep } from "path";

const publicDir = resolve(__dirname, "public");

export default defineConfig({
  plugins: [
    {
      name: "next-static-image-imports",
      enforce: "pre",
      load(id) {
        if (id.startsWith(publicDir + sep) && /\.(png|jpe?g|svg|webp|avif|gif|ico)$/.test(id)) {
          // Match Next's import shape; the production build verifies hashed URLs.
          const src = "/" + relative(publicDir, id).split(sep).join("/");
          return `export default ${JSON.stringify({ src })};`;
        }
      },
    },
    react(),
  ],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.js"],
    globals: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
});
