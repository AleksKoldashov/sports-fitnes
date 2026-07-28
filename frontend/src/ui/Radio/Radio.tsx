import React from 'react';
import styles from './Radio.module.scss';

interface RadioProps {
  value: string;
  checked: boolean;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
}

export const Radio: React.FC<RadioProps> = ({
  value,
  checked,
  name,
  onChange,
  label,
}) => (
  <label className={styles.wrapper}>
    <input
      type="radio"
      name={name}
      className={styles.hiddenInput}
      checked={checked}
      onChange={onChange}
      value={value}
    />
    <div className={styles.circle} />
    {label && <span style={{ fontSize: '14px' }}>{label}</span>}
  </label>
);
