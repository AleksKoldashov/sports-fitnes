import React, { useEffect, useId, useRef, useState } from 'react';
import styles from './DatePicker.module.scss';

interface DatePickerProps {
  /** Выбранная дата */
  value?: Date;
  /** Функция изменения даты */
  onChange: (date: Date) => void;
  /** Текст подписи (лейбл) */
  label?: string;
  /** Текст подсказки */
  placeholder?: string;
  /** Ошибка */
  error?: string;
  /** Отключение компонента */
  disabled?: boolean;
}

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MONTHS = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Выберите дату',
  error,
  disabled,
}) => {
  const generatedId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  // Состояние текущего отображаемого месяца/года в календаре
  const [viewDate, setViewDate] = useState(() => value || new Date());

  const currentYear = viewDate.getFullYear();
  const currentMonth = viewDate.getMonth();

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

  // Синхронизация внутреннего календаря, если внешняя дата изменилась
  useEffect(() => {
    if (value) setViewDate(value);
  }, [value]);

  // Генерация дней для текущего месяца
  const getDaysInMonth = () => {
    const days = [];
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    // Получаем день недели первого числа (0 - ВС, 1 - ПН... переводим в формат ПН=0, ВС=6)
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    // Пустые ячейки в начале месяца для смещения
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }

    // Все дни месяца
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      days.push(new Date(currentYear, currentMonth, i));
    }

    return days;
  };

  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleSelectDay = (date: Date) => {
    onChange(date);
    setIsOpen(false);
  };

  // Проверка совпадения дней
  const isSameDay = (date1: Date | undefined, date2: Date) => {
    if (!date1) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Форматирование даты для вывода в инпут (ДД.ММ.ГГГГ)
  const formatInputDate = (date?: Date) => {
    if (!date) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${day}.${month}.${date.getFullYear()}`;
  };

  const buttonClasses = [
    styles.inputField,
    error && styles.error,
    isOpen && styles.isOpen,
    !value && styles.placeholder,
  ]
    .filter(Boolean)
    .join(' ');

  const days = getDaysInMonth();
  const today = new Date();

  return (
    <div className={styles.datePickerWrapper} ref={containerRef}>
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
          className={buttonClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
        >
          {value ? formatInputDate(value) : placeholder}
        </button>

        {/* Простая иконка календаря */}
        <svg
          className={styles.icon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>

        {/* Выпадающий календарь */}
        {isOpen && (
          <div className={styles.dropdown}>
            <div className={styles.header}>
              <button
                type="button"
                className={styles.navButton}
                onClick={handlePrevMonth}
              >
                &larr;
              </button>
              <span>{`${MONTHS[currentMonth]} ${currentYear}`}</span>
              <button
                type="button"
                className={styles.navButton}
                onClick={handleNextMonth}
              >
                &rarr;
              </button>
            </div>

            <div className={styles.grid}>
              {WEEK_DAYS.map((day) => (
                <div key={day} className={styles.weekDay}>
                  {day}
                </div>
              ))}

              {days.map((date, index) => {
                if (!date) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className={`${styles.cell} ${styles.empty}`}
                    />
                  );
                }

                const dayClasses = [
                  styles.cell,
                  isSameDay(today, date) && styles.today,
                  isSameDay(value, date) && styles.selected,
                ]
                  .filter(Boolean)
                  .join(' ');

                return (
                  <button
                    key={date.toISOString()}
                    type="button"
                    className={dayClasses}
                    onClick={() => handleSelectDay(date)}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};
