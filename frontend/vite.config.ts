import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), tailwindcss()],
  test: {
    globals: true, // Позволяет не импортировать describe, expect, it в каждом файле
    environment: 'jsdom', // Среда для тестирования компонентов
    setupFiles: './src/setupTests.ts', // Файл инициализации (создадим следующим шагом)
  },
});
