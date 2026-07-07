import React from 'react';
import styles from './ProgressBar.module.scss';

export const ProgressBar: React.FC<{ value: number }> = ({ value }) => (
  <div className={styles.track}>
    <div
      className={styles.line}
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);
