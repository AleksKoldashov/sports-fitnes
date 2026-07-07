import React from 'react';
import styles from './FormField.module.scss';

interface FormFieldProps {
  /** Текст подписи над полем */
  label?: string;
  /** Текст ошибки. Если передан, отобразится под полем */
  error?: string;
  /** Кастомный класс для внешней обертки */
  className?: string;
  /** Само поле ввода (Input, Select и т.д.) */
  children: React.ReactNode;
}

/**
 * Компонент `FormField` — легкая UI-обертка для элементов форм.
 * Использует нативную HTML-связку через обертку в тег <label>.
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  className,
  children,
}) => {
  const wrapperClasses = [styles.fieldWrapper, className]
    .filter(Boolean)
    .join(' ');

  return (
    // Обертка в label автоматически связывает текст с инпутом внутри при клике
    <label className={wrapperClasses}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.controlContainer}>{children}</div>

      {error && <span className={styles.errorMessage}>{error}</span>}
    </label>
  );
};
