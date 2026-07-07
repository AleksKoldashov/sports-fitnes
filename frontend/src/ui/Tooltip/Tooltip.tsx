import React from 'react';
import styles from './Tooltip.module.scss';

export type TooltipPosition = 'top' | 'bottom';

interface TooltipProps {
  /** Текст подсказки, который появится при наведении */
  text: string;
  /** Расположение подсказки относительно элемента: 'top' (сверху) или 'bottom' (снизу) */
  position?: TooltipPosition;
  /** Элемент интерфейса (кнопка, иконка), на который пользователь будет наводить мышь */
  children: React.ReactNode;
}

/**
 * Компонент `Tooltip` — всплывающая текстовая подсказка при наведении мыши (hover).
 * Используется исключительно для чтения коротких пояснений к иконкам или кнопкам.
 */
export const Tooltip: React.FC<TooltipProps> = ({
  text,
  position = 'top',
  children,
}) => {
  // Выбираем класс направления
  const bubbleClasses = [
    styles.bubble,
    position === 'bottom' ? styles.positionBottom : styles.positionTop,
  ].join(' ');

  return (
    <div className={styles.tooltipWrapper}>
      {children}
      <span className={bubbleClasses}>{text}</span>
    </div>
  );
};
