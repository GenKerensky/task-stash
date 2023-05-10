import { defineConfig } from 'vite';
import suidPlugin from '@suid/vite-plugin';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [suidPlugin(), solidPlugin(), VitePWA({
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
