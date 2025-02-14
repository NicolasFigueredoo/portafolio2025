// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
      },
    },
  },
  output: 'static',
  site: 'https://github.com/NicolasFigueredoo/portafolio2025',  // Defínelo aquí, no dentro de `build`
  server: {
    host: true,
    port: 4321,
    toolbar: false, // Desactiva la barra de herramientas de desarrollo
  },
});
