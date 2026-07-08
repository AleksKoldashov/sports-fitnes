import { Avatar, Flex, Typography } from '@/ui';
import React, { useState } from 'react';
import styles from './Sidebar.module.scss';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

export const Sidebar: React.FC = () => {
  // Локальное состояние для эмуляции переключения страниц (в будущем замените на React Router)
  const [activeTab, setActiveTab] = useState('dashboard');

  // Пункты меню вашего фитнес-приложения
  const navigationItems: NavItem[] = [
    { id: 'dashboard', label: 'Главная', icon: '📊' },
    { id: 'workouts', label: 'Тренировки', icon: '💪' },
    { id: 'nutrition', label: 'План питания', icon: '🍏' },
    { id: 'analytics', label: 'Статистика', icon: '📈' },
    { id: 'settings', label: 'Настройки', icon: '⚙️' },
  ];

  return (
    <aside className={styles.sidebar}>
      {/* 1. ВЕРХНИЙ БЛОК: БРЕНДИНГ */}
      <div className={styles.logoSection}>
        <Flex direction="row" gap="8" align="center">
          <span style={{ fontSize: '24px' }}>⚡</span>
          <Typography
            tag="h2"
            size="20"
            style={{ fontWeight: 800, letterSpacing: '-0.5px' }}
          >
            SPORTS-FIT
          </Typography>
        </Flex>
      </div>

      {/* 2. ЦЕНТРАЛЬНЫЙ БЛОК: НАВИГАЦИЯ */}
      <nav className={styles.navLinks}>
        {navigationItems.map((item) => {
          const isItemActive = activeTab === item.id;
          const linkClasses = `${styles.linkItem} ${isItemActive ? styles.active : ''}`;

          return (
            <div
              key={item.id}
              className={linkClasses}
              onClick={() => setActiveTab(item.id)}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          );
        })}
      </nav>

      {/* 3. НИЖНИЙ БЛОК: ПРОФИЛЬ АТЛЕТА */}
      <div className={styles.profileSection}>
        <Flex direction="row" gap="12" align="center" max>
          <Avatar initials="АК" />
          <Flex direction="column" align="start" gap="4">
            <Typography size="14" tag="p" style={{ fontWeight: 700 }}>
              Алекс К.
            </Typography>
            <Typography size="12" tag="span">
              Атлет / Профи
            </Typography>
          </Flex>
        </Flex>
      </div>
    </aside>
  );
};
