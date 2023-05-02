import { defineConfig } from 'vite';
import suidPlugin from '@suid/vite-plugin';
import solidPlugin from 'vite-plugin-solid';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [suidPlugin(), solidPlugin(), VitePWA({registerType: 'autoUpdate', 
  injectRegister: 'inline',
  devOptions: {
    enabled: true,
  }})],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
});
