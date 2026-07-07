import React, { InputHTMLAttributes, useId } from 'react';
import styles from './Input.module.scss';

/**
 * Пропсы универсального UI-компонента Input
 */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Текст подписи (лейбл) над полем ввода */
  label?: string;
  /** Текст ошибки. Если передан, поле окрасится в красный цвет */
  error?: string;
}

/**
 * Компонент `Input` — универсальное поле ввода текста, чисел или паролей.
 * Поддерживает автогенерацию ID для связки лейбла с инпутом и вывод ошибок.
 *
 * @example
 * ```tsx
 * <Input
 *   label="Вес снаряда (кг)"
 *   type="number"
 *   placeholder="Например: 60"
 *   value={weight}
 *   onChange={(e) => setWeight(e.target.value)}
 * />
 * ```
 */
export const Input: React.FC<InputProps> = (props) => {
  const { label, error, className, disabled, ...otherProps } = props;

  // Генерируем уникальный ID для связки label и input (полезно для доступности)
  const generatedId = useId();

  // Собираем классы для самого тега input
  const inputClasses = [styles.inputField, error && styles.error, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label htmlFor={generatedId} className={styles.label}>
          {label}
        </label>
      )}

      <input
        id={generatedId}
        className={inputClasses}
        disabled={disabled}
        {...otherProps}
      />

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
