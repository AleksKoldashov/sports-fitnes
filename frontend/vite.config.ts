import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
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
});
