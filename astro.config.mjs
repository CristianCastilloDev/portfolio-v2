import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
  site: isGitHubActions ? 'https://cristiancastillodev.github.io' : undefined,
  base: isGitHubActions ? '/portfolio-v2' : '/',
  integrations: [tailwind({
    applyBaseStyles: false, // We'll manage tailwind base directives in global.css
  })],
});
