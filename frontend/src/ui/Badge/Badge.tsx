import React from 'react';
import styles from './Badge.module.scss';

interface BadgeProps {
  variant?: 'success' | 'error' | 'primary';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'primary',
  children,
}) => <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
