import React, { TextareaHTMLAttributes } from 'react';
import styles from './Textarea.module.scss';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Флаг ошибки для подсветки рамки красным цветом */
  error?: string;
}

/**
 * Компонент `Textarea` — многострочное поле ввода для заметок, комментариев и описаний.
 * Поддерживает нативный вертикальный ресайз и интеграцию с FormField.
 */
export const Textarea: React.FC<TextareaProps> = ({
  className,
  error,
  disabled,
  rows = 4, // По умолчанию отображаем 4 строки текста в высоту
  ...otherProps
}) => {
  const textareaClasses = [
    styles.textareaField,
    error && styles.error,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <textarea
      className={textareaClasses}
      disabled={disabled}
      rows={rows}
      {...otherProps}
    />
  );
};
