import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Input } from '../Input';
import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  /** Текст подписи над компонентом */
  label?: string;
  /** Текст-подсказка внутри поля ввода */
  placeholder?: string;
  /** Список всех доступных вариантов для выбора */
  options: SelectOption[];
  /** Значение текущей выбранной опции (value) */
  value: string;
  /** Колбэк при выборе новой опции */
  onChange: (value: string) => void;
}

/**
 * Компонент `Select` — умный выпадающий список с возможностью фильтрации и поиска на лету.
 * Отлично подходит для больших списков (выбор упражнений, городов, тренеров).
 */
export const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Выберите из списка...',
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Находим объект текущей выбранной опции, чтобы отобразить её текст в инпуте
  const selectedOption = options.find((opt) => opt.value === value);

  // Синхронизируем текст в поле ввода с выбранной опцией при её изменении
  useEffect(() => {
    if (selectedOption) {
      setSearchQuery(selectedOption.label);
    } else {
      setSearchQuery('');
    }
  }, [selectedOption, value]);

  // Фильтруем список опций на основе того, что ввёл пользователь в поиск
  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  // Закрытие выпадающего списка при клике вовне
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        // Если пользователь ничего не выбрал и ушёл, возвращаем текст старого значения
        setSearchQuery(selectedOption ? selectedOption.label : '');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedOption]);

  const handleOptionClick = (optionValue: string, optionLabel: string) => {
    onChange(optionValue);
    setSearchQuery(optionLabel);
    setIsOpen(false);
  };

  return (
    <div className={styles.selectWrapper} ref={containerRef}>
      {label && <span className={styles.label}>{label}</span>}

      <div className={styles.inputContainer}>
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          style={{ paddingRight: '36px' }} // Оставляем место для стрелочки справа
        />
        {/* Интерактивная стрелочка-индикатор */}
        <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}>
          ▼
        </span>
      </div>

      {/* Выпадающий список */}
      {isOpen && (
        <div className={styles.dropdown}>
          {filteredOptions.length === 0 ? (
            <div className={styles.noOptions}>Ничего не найдено</div>
          ) : (
            filteredOptions.map((option) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  className={`${styles.option} ${isSelected ? styles.selected : ''}`}
                  onClick={() => handleOptionClick(option.value, option.label)}
                >
                  {option.label}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
