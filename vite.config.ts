import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: { host: "::", port: 8080 },
  plugins: [
    tsConfigPaths(),
    tanstackStart({
      server: {
        entry: "server",
      },
    }),
    nitro({ 
      preset: "vercel",
      // @ts-ignore: O TypeScript do plugin bloqueia a tipagem, mas o motor do Nitro aceita isto nativamente
      externals: {
        inline: ["tslib"]
      }
    }),
    viteReact(),
    tailwindcss(),
  ],
});