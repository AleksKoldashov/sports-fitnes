import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'filled' | 'outlined' | 'clear';
export type ButtonSize = 'm' | 'l';

/**
 * Пропсы универсального UI-компонента Button
 */
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Визуальный стиль кнопки:
   * - 'filled': сплошная фиолетовая заливка (основное действие)
   * - 'outlined': прозрачная с фиолетовой рамкой (второстепенное действие)
   * - 'clear': без фона и рамок (минималистичные клики/иконки)
   */
  variant?: ButtonVariant;
  /** Размер кнопки: 'm' (компактная для карточек) или 'l' (крупная для форм) */
  size?: ButtonSize;
  /** Если true, кнопка растянется на 100% ширины своего контейнера */
  max?: boolean;
  /** Текст или иконка внутри кнопки */
  children: React.ReactNode;
}

/**
 * Компонент `Button` — базовая кнопка для совершения действий.
 * Автоматически поддерживает все стандартные HTML-атрибуты (onClick, disabled и др.).
 *
 * @example
 * ```tsx
 * <Button variant="filled" size="l" max onClick={handleStart}>
 *   Начать тренировку
 * </Button>
 * ```
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const {
    variant = 'filled',
    size = 'm',
    max,
    className,
    disabled,
    children,
    ...otherProps
  } = props;

  // Динамически собираем классы на основе пропсов
  const buttonClasses = [
    styles.button,
    styles[`variant${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`size${size.toUpperCase()}`],
    max && styles.max,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} disabled={disabled} {...otherProps}>
      {children}
    </button>
  );
};
