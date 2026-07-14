import { Avatar, Flex, Loader, Typography } from '@/ui';
import React, { useState } from 'react';

import { useProfile } from '@/features/user';

import { NAVIGATION, PROFIL } from '@/shared/constants/navigation.constants';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';

export const Sidebar: React.FC = () => {
  // Локальное состояние для эмуляции переключения страниц (в будущем замените на React Router)
  const { data, isLoading, error } = useProfile();

  const [activeTab, setActiveTab] = useState('dashboard');

  const navigate = useNavigate();

  const handleTab = (path: string) => {
    setActiveTab(path);
    navigate(path);
  };

  if (!data) return null;

  if (isLoading) return <Loader />;

  if (error) return <>{error.message}</>;

  console.log('data', data);

  const { firstName, patronymic } = data.person_card;

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
        {NAVIGATION[data.role].map((item) => {
          const isItemActive = activeTab === item.path;
          const linkClasses = `${styles.linkItem} ${isItemActive ? styles.active : ''}`;
          return (
            <div
              key={item.path}
              className={linkClasses}
              onClick={() => handleTab(item.path)}
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
              {firstName}
              {patronymic}
            </Typography>
            <Typography size="12" tag="span">
              {PROFIL[data.role]}/ Профи
            </Typography>
          </Flex>
        </Flex>
      </div>
    </aside>
  );
};
