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
  lineBottom?: boolean;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onTabChange,
  lineBottom,
}) => {
  const line = lineBottom ? styles.borBot : '';
  return (
    <div className={`${styles.tabsList} ${line}`}>
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
};
