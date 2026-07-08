import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr()],
  test: {
    globals: true, // Позволяет не импортировать describe, expect, it в каждом файле
    environment: 'jsdom', // Среда для тестирования компонентов
    setupFiles: './src/setupTests.ts', // Файл инициализации (создадим следующим шагом)
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // Включаем быстрый и современный API Sass
      } as any,
    },
  },
  server: {
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
