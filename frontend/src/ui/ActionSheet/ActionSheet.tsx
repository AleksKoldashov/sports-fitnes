import React from 'react';
import { Typography } from '../Typography';
import styles from './ActionSheet.module.scss';

export interface ActionSheetItem {
  /** Уникальный идентификатор действия */
  id: string;
  /** Текст на кнопке */
  label: string;
  /** Флаг опасного действия (выделит кнопку красным цветом) */
  destructive?: boolean;
  /** Колбэк при клике на это действие */
  onClick: () => void;
}

interface ActionSheetProps {
  /** Флаг видимости меню */
  isOpen: boolean;
  /** Функция закрытия меню */
  onClose: () => void;
  /** Необязательный заголовок/описание над кнопками */
  title?: string;
  /** Массив элементов-кнопок действий */
  actions: ActionSheetItem[];
}

/**
 * Компонент `ActionSheet` — всплывающее снизу контекстное меню действий.
 * Адаптировано под мобильные жесты и клики на десктопе.
 */
export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  title,
  actions,
}) => {
  if (!isOpen) return null;

  // Закрытие при клике строго по темной подложке
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.sheet}>
        <div className={styles.dragHandle} />

        {title && (
          <div className={styles.title}>
            <Typography size="14" tag="p">
              {title}
            </Typography>
          </div>
        )}

        {/* Список основных действий */}
        {actions.map((item) => {
          const btnClasses = [
            styles.actionButton,
            item.destructive && styles.destructive,
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <button
              key={item.id}
              className={btnClasses}
              onClick={() => {
                item.onClick();
                onClose(); // Автоматически закрываем панель после выбора действия
              }}
            >
              {item.label}
            </button>
          );
        })}

        {/* Фиксированная кнопка Отмена */}
        <button className={styles.cancelButton} onClick={onClose}>
          Отмена
        </button>
      </div>
    </div>
  );
};
