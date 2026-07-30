import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './TimePicker.module.scss';

interface TimePickerProps {
  /** Имя поля для отправки внутри HTML-формы */
  name?: string;
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
  /** Минимально допустимое время в формате "HH:MM" (например, "07:00") */
  minTime?: string;
  /** Максимально допустимое время в формате "HH:MM" (например, "23:00") */
  maxTime?: string;
  /** Отключение компонента */
  disabled?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  name,
  value = '',
  onChange,
  label,
  placeholder = '--:--',
  error,
  minuteStep = 5,
  minTime = '00:00',
  maxTime = '23:59',
  disabled,
}) => {
  const generatedId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Парсим текущее выбранное значение
  const [selectedHour, selectedMinute] = value ? value.split(':') : ['', ''];

  // Парсим границы доступного диапазона
  const [minH, minM] = minTime.split(':').map(Number);
  const [maxH, maxM] = maxTime.split(':').map(Number);

  // Генерируем доступные часы
  const hoursArray = Array.from({ length: 24 }, (_, i) =>
    String(i).padStart(2, '0'),
  ).filter((h) => {
    const hourNum = Number(h);
    return hourNum >= minH && hourNum <= maxH;
  });

  // Динамически генерируем минуты
  const getAvailableMinutes = () => {
    const allMinutes = Array.from({ length: 60 / minuteStep }, (_, i) =>
      String(i * minuteStep).padStart(2, '0'),
    );

    if (!selectedHour) return allMinutes;

    const hourNum = Number(selectedHour);

    return allMinutes.filter((m) => {
      const minuteNum = Number(m);
      if (hourNum === minH && minuteNum < minM) return false;
      if (hourNum === maxH && minuteNum > maxM) return false;
      return true;
    });
  };

  // Клик вне компонента для закрытия
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

  const handleSelectHour = (h: string) => {
    const currentMinuteNum = Number(selectedMinute || '00');
    const hourNum = Number(h);
    let validMinute = selectedMinute || '00';

    if (hourNum === minH && currentMinuteNum < minM) {
      validMinute = String(minM).padStart(2, '0');
    } else if (hourNum === maxH && currentMinuteNum > maxM) {
      validMinute = String(maxM).padStart(2, '0');
    }

    onChange(`${h}:${validMinute}`);
  };

  const handleSelectMinute = (m: string) => {
    const currentHour = selectedHour || hoursArray[0] || '00';
    onChange(`${currentHour}:${m}`);
  };

  const controlClasses = [
    styles.inputField,
    error && styles.error,
    isOpen && styles.isOpen,
    !value && styles.placeholder,
  ]
    .filter(Boolean)
    .join(' ');

  const minutesArray = getAvailableMinutes();

  return (
    <div className={styles.timePickerWrapper} ref={containerRef}>
      {label && (
        <label htmlFor={generatedId} className={styles.label}>
          {label}
        </label>
      )}

      <div className={styles.inputControl}>
        {/* Скрытый инпут, который нативно передает значение в HTML-форму */}
        {name && (
          <input type="hidden" name={name} value={value} disabled={disabled} />
        )}

        <button
          id={generatedId}
          type="button"
          disabled={disabled}
          className={controlClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {value || placeholder}
        </button>

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

        {isOpen && (
          <div className={styles.dropdown}>
            {/* Часы */}
            <div className={styles.column}>
              {hoursArray.map((h) => (
                <button
                  key={h}
                  type="button"
                  className={[
                    styles.timeButton,
                    selectedHour === h && styles.selected,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={() => handleSelectHour(h)}
                >
                  {h}
                </button>
              ))}
            </div>

            {/* Минуты */}
            <div className={styles.column}>
              {minutesArray.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={[
                    styles.timeButton,
                    selectedMinute === m && styles.selected,
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
