import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://cristiancastillodev.github.io',
  base: '/portfolio-v2',
  integrations: [tailwind({
    applyBaseStyles: false, // We'll manage tailwind base directives in global.css
  })],
});
