import React from 'react';
import styles from './Tabs.module.scss';

export interface TabItem {
  id: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onTabChange: (id: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ items, activeId, onTabChange }) => (
  <div className={styles.tabsList}>
    {items.map((tab) => (
      <button
        key={tab.id}
        className={`${styles.tabBtn} ${tab.id === activeId ? styles.active : ''}`}
        onClick={() => onTabChange(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);
