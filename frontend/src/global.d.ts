declare module '*.css';

// Поддержка SVG как обычной строки/URL-пути
declare module '*.svg' {
  const content: string;
  export default content;
}

// Попутно можно добавить и обычные картинки, чтобы не ругалось в будущем
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.gif';
