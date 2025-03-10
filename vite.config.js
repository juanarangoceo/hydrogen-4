import {defineConfig} from 'vite';
import {hydrogen} from '@shopify/hydrogen/vite';
import {oxygen} from '@shopify/mini-oxygen/vite';
import {vitePlugin as remix} from '@remix-run/dev';
import {installGlobals} from '@remix-run/node';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';
import {vercelPreset} from '@vercel/remix/vite';

installGlobals();

export default defineConfig({
  plugins: [
    tailwindcss(),
    hydrogen(),
    oxygen(),
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
    noExternal: true,
    optimizeDeps: {
      /**
       * Include dependencies here if they throw CJS<>ESM errors.
       * For example, for the following error:
       *
       * > ReferenceError: module is not defined
       * >   at /Users/.../node_modules/example-dep/index.js:1:1
       *
       * Include 'example-dep' in the array below.
       * @see https://vitejs.dev/config/dep-optimization-options
       */
      include: [],
    },
  },
});
