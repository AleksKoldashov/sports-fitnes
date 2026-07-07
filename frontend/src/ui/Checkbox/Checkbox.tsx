import React from 'react';
import styles from './Checkbox.module.scss';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
}) => (
  <label className={styles.wrapper}>
    <input
      type="checkbox"
      className={styles.hiddenInput}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <div className={styles.box}>✓</div>
    {label && <span className={styles.label}>{label}</span>}
  </label>
);
