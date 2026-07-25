import { Avatar, Flex, Loader, Typography } from '@/ui';
import React from 'react';

import { useProfile } from '@/entities/profile';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { NAVIGATION, PROFIL } from './config/navigation';

export const Sidebar: React.FC = () => {
  const { data, isLoading, isError, error } = useProfile();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  if (!data) return null;

  if (isLoading) return <Loader />;

  if (isError) return <>{error?.message}</>;

  const { firstName, patronymic } = data.person_card;

  const currentRole = data.role;

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
        {NAVIGATION[currentRole].map((item) => {
          const isItemActive =
            pathname === item.path || pathname.startsWith(`${item.path}/`);
          const linkClasses = `${styles.linkItem} ${isItemActive ? styles.active : ''}`;
          return (
            <div
              key={item.path}
              className={linkClasses}
              onClick={() => navigate(item.path)}
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
