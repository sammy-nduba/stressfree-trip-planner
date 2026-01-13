// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
// Using Vercel serverless adapter for Vercel deployment
export default defineConfig({
  output: 'server',
  adapter: vercel({}),
  integrations: [react(), tailwind()],
  devToolbar: {
    enabled: false
  }
});