import suidPlugin from '@suid/vite-plugin';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';
import { VitePWA } from 'vite-plugin-pwa';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  define: {
    global: {},
  },
  plugins: [
    suidPlugin(),
    solidPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'inline',
      devOptions: {
        enabled: false,
      },
    }),
    eslint({ include: ['./src/**/*.ts', './src/**/*.tsx'] }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
