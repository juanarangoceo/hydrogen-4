import {defineConfig} from 'vite';
import {vitePlugin as remix} from '@remix-run/dev';
import {installGlobals} from '@remix-run/node';
import tsconfigPaths from 'vite-tsconfig-paths';
import {vercelPreset} from '@vercel/remix/vite';

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
});
