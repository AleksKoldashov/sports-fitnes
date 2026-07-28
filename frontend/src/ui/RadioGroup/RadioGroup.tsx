// src/shared/ui/radio-group/radio-group.tsx
import React from 'react';

import { Radio } from '../Radio/Radio';
import styles from './RadioGroup.module.scss'; // ваши стили для контейнера (например, flex-direction)

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  /*Имя группы, которое улетит в FormData */
  name: string;
  /*Список радио-кнопок */
  options: RadioOption[];
  /*Текущее выбранное значение */
  value: string;
  /* Колбэк для изменения стейта в React */
  onChange: (value: string) => void;
  /*Общий заголовок для группы (например, "График работы") */
  label?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  label,
}) => {
  // Перехватываем нативный onChange инпута и отдаем наружу чистую строку
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.groupContainer}>
      {label && <span className={styles.groupLabel}>{label}</span>}

      <div className={styles.optionsWrapper}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={handleInputChange}
            label={option.label}
          />
        ))}
      </div>
    </div>
  );
};
