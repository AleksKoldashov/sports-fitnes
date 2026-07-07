/// <reference types="vite/client" />

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

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
