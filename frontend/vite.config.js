// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/portal-de-vendas/', // <<-- substitua pelo nome do repo no GitHub
  plugins: [react()],
});
