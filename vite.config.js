import {defineConfig} from 'vite';
import {vitePlugin as remix} from '@remix-run/dev';
import {installGlobals} from '@remix-run/node';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import {vercelPreset} from '@vercel/remix/vite';

installGlobals();

export default defineConfig({
  plugins: [
    tailwindcss(),
    remix({
      presets: [vercelPreset()],
    }),
    tsconfigPaths(),
  ],
  build: {
    // Allow a strict Content-Security-Policy
    // withtout inlining assets as base64:
    assetsInlineLimit: 0,
    minify: false,
    cssMinify: false,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  ssr: {
    noExternal: true
  }
});
