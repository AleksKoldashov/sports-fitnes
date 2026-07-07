import React from 'react';
import styles from './Skeleton.module.scss';

export const Skeleton: React.FC<{
  width?: string;
  height?: string;
  borderRadius?: string;
}> = ({ width, height = '20px', borderRadius }) => (
  <div className={styles.skeleton} style={{ width, height, borderRadius }} />
);
