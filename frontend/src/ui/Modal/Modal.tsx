import React, { useEffect } from 'react';
import styles from './Modal.module.scss';

interface ModalProps {
  /** Флаг видимости модального окна */
  isOpen: boolean;
  /** Функция закрытия окна (срабатывает при клике на крестик или оверлей) */
  onClose: () => void;
  /** Текст заголовка в хедере */
  title?: string;

  /** Включить/выключить верхний блок (Хедер). По умолчанию true */
  showHeader?: boolean;
  /** Включить/выключить центральный блок (Бади). По умолчанию true */
  showBody?: boolean;
  /** Включить/выключить нижний блок (Футер). По умолчанию true */
  showFooter?: boolean;

  /** Содержимое центрального блока (Тело модалки) */
  children?: React.ReactNode;
  /** Содержимое нижнего блока (Кнопки действий в футере) */
  footerContent?: React.ReactNode;
}

/**
 * Компонент `Modal` — универсальное трехблочное модальное окно.
 * Позволяет независимо включать/выключать Хедер, Бади и Футер.
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = 'Внимание',
  showHeader = true,
  showBody = true,
  showFooter = true,
  children,
  footerContent,
}) => {
  // Блокируем прокрутку основного сайта на заднем плане, пока модалка открыта
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.window}>
        {/* БЛОК 1: ХЕДЕР (Заголовок + Крестик) */}
        {showHeader && (
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            <button
              className={styles.closeButton}
              onClick={onClose}
              aria-label="Закрыть"
            >
              ✕
            </button>
          </div>
        )}

        {/* БЛОК 2: БАДИ (Контент) */}
        {showBody && <div className={styles.body}>{children}</div>}

        {/* БЛОК 3: ФУТЕР (Кнопки) */}
        {showFooter && footerContent && (
          <div className={styles.footer}>{footerContent}</div>
        )}
      </div>
    </div>
  );
};
