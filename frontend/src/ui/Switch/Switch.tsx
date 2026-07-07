import React from 'react';
import styles from './Switch.module.scss';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => (
  <label className={styles.wrapper}>
    <input
      type="checkbox"
      className={styles.hiddenInput}
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <div className={styles.track}>
      <div className={styles.handle} />
    </div>
    {label && (
      <span style={{ fontSize: '14px', fontWeight: 500 }}>{label}</span>
    )}
  </label>
);
