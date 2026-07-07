import React, { useEffect } from 'react';
import styles from './Toast.module.scss';

export type ToastType = 'success' | 'error' | 'warning';

interface ToastProps {
  /** Уникальное сообщение внутри уведомления */
  message: string;
  /** Обязательный вид тоста, определяющий его цвет и иконку */
  type: ToastType;
  /** Колбэк закрытия (срабатывает автоматически или по клику на крестик) */
  onClose: () => void;
  /** Время жизни тоста в миллисекундах. По умолчанию 3000мс (3 секунды) */
  duration?: number;
}

/**
 * Компонент `Toast` — всплывающее сервисное уведомление.
 * Поддерживает три встроенных вида: 'success', 'error', 'warning'.
 */
export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 3000,
}) => {
  // Автоматический таймер закрытия уведомления
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  // Маппинг системных иконок для каждого вида тоста
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
    }
  };

  // Динамически собираем класс вида, например: styles.typeSuccess
  const toastClasses = [
    styles.toast,
    styles[`type${type.charAt(0).toUpperCase() + type.slice(1)}`],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={toastClasses}>
      <span className={styles.icon}>{getIcon()}</span>
      <span className={styles.message}>{message}</span>
      <button
        className={styles.closeBtn}
        onClick={onClose}
        aria-label="Закрыть"
      >
        ✕
      </button>
    </div>
  );
};
