import React, { useEffect, useRef, useState } from 'react';
import styles from './Popover.module.scss';

interface PopoverProps {
  /** Элемент, на который кликают (например, кнопка или иконка настройки) */
  trigger: React.ReactNode;
  /** Контент, который появится внутри всплывающего окна */
  children: React.ReactNode;
  /** Кастомный класс для панели поповера (опционально) */
  panelClassName?: string;
}

/**
 * Компонент `Popover` — всплывающая панель, открывающаяся по клику на триггер.
 * Автоматически отслеживает клики вовне для закрытия окна.
 *
 * @example
 * ```tsx
 * <Popover trigger={<button>Открыть меню</button>}>
 *   <div style={{ padding: '8px' }}>Контент меню</div>
 * </Popover>
 * ```
 */
export const Popover: React.FC<PopoverProps> = ({
  trigger,
  children,
  panelClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  const togglePopover = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Механизм закрытия поповера при клике на любое другое место экрана
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div className={styles.popoverContainer} ref={popoverRef}>
      {/* Кнопка-активатор */}
      <div className={styles.trigger} onClick={togglePopover}>
        {trigger}
      </div>

      {/* Всплывающая панель */}
      {isOpen && (
        <div className={`${styles.panel} ${panelClassName || ''}`}>
          {children}
        </div>
      )}
    </div>
  );
};
