import { defineConfig } from "vite";
import { resolve } from 'path';
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({

  plugins: [tailwindcss()],
});
