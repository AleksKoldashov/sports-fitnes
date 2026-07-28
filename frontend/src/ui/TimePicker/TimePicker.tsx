import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './TimePicker.module.scss';

interface TimePickerProps {
  /** Значение времени в формате "HH:MM" */
  value?: string;
  /** Функция изменения времени */
  onChange: (time: string) => void;
  /** Текст подписи (лейбл) */
  label?: string;
  /** Текст подсказки */
  placeholder?: string;
  /** Ошибка */
  error?: string;
  /** Шаг выбора минут (например: 5, 10, 15, 30) */
  minuteStep?: number;
  /** Отключение компонента */
  disabled?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value = '',
  onChange,
  label,
  placeholder = '--:--',
  error,
  minuteStep = 5, // По умолчанию шаг 5 минут для удобства фитнес-расписания
  disabled,
}) => {
  const generatedId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Парсим текущее значение "HH:MM"
  const [hours, minutes] = value ? value.split(':') : ['', ''];

  // Генерируем массивы часов (00-23) и минут с заданным шагом
  const hoursArray = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, '0'),
  );
  const minutesArray = Array.from({ length: 60 / minuteStep }, (_, i) =>
    String(i * minuteStep).padStart(2, '0'),
  );

  // Логика клика вне компонента для закрытия окна
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectHour = (selectedHour: string) => {
    const currentMinute = minutes || '00';
    onChange(`${selectedHour}:${currentMinute}`);
  };

  const handleSelectMinute = (selectedMinute: string) => {
    const currentHour = hours || '09'; // Значение по умолчанию, если часы еще не выбраны
    onChange(`${currentHour}:${selectedMinute}`);
  };

  const controlClasses = [
    styles.inputField,
    error && styles.error,
    isOpen && styles.isOpen,
    !value && styles.placeholder,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.timePickerWrapper} ref={containerRef}>
      {label && (
        <label htmlFor={generatedId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputControl}>
        <button
          id={generatedId}
          type="button"
          disabled={disabled}
          className={controlClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {value || placeholder}
        </button>

        {/* Иконка часов */}
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>

        {/* Выпадающий список выбора */}
        {isOpen && (
          <div className={styles.dropdown}>
            {/* Колонка Часов */}
            <div className={styles.column}>
              {hoursArray.map((h) => (
                <button
                  key={h}
                  type="button"
                  className={[styles.timeButton, hours === h && styles.selected]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleSelectHour(h)}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Колонка Минут */}
            <div className={styles.column}>
              {minutesArray.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={[
                    styles.timeButton,
                    minutes === m && styles.selected,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleSelectMinute(m)}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
