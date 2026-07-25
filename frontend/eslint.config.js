// import eslintConfigPrettier from 'eslint-config-prettier';

// export default [
//   // ... твои настройки для react/typescript
//   eslintConfigPrettier, // Должен быть последним!
// ];

import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint'; // 🌟 1. Обязательно импортируем парсер

export default [
  // ... ваши текущие настройки для react, если они есть

  // 🌟 2. Конфигурация, которая учит ESLint понимать TypeScript
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser, // Назначаем парсер для работы с типами и интерфейсами
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Здесь можно включить базовые правила TS, если они еще не включены:
      ...tseslint.configs.recommended.rules,
    },
  },

  // 🌟 3. Наше архитектурное правило FSD (теперь оно гарантированно сработает)
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                '**/pages/*/*/**',
                '**/entities/*/*/**',
                '**/features/*/*/**',
                '**/widgets/*/*/**',
              ],
              message:
                'Глубокие импорты запрещены методологией FSD! Разрешен импорт только из Public API (через index.ts модуля).',
            },
          ],
        },
      ],
    },
  },

  eslintConfigPrettier, // Остается самым последним
];
