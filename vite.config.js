import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import inject from "@rollup/plugin-inject";

export default defineConfig({
  plugins: [
    inject({
      $: "jquery",
      jQuery: "jquery",
    }),
    tailwindcss(),
  ],
});
