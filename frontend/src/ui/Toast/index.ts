// 1. Импортируем дефолтный объект стилей
import toastStyles from './Toast.module.scss';

// 2. Экспортируем наши компоненты и типы
export { Toast } from './Toast';
export type { ToastType } from './Toast';

// 3. Корректно экспортируем объект со стилями наружу
export { toastStyles };
