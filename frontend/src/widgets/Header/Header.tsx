import { AuthModal } from '@/features/auth/AuthByEmail/AuthModal';
import { Flex, Typography } from '@/ui';
import Profil from '@shared/assets/icons/profil.svg?react';
import { useState } from 'react';
import styles from './Header.module.scss';

export const Header = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <Flex
      justify="between"
      align="center"
      style={{ height: '100%', padding: '0 24px' }}
    >
      <Typography size="14" style={{ fontWeight: 600, color: '#64748b' }}>
        🔍 Поиск по упражнениям и планам питания...
      </Typography>
      <Typography size="14" style={{ fontWeight: 600 }}>
        Текущая дата: {new Date().toLocaleDateString('ru-RU')}
      </Typography>
      <Profil
        onClick={() => {
          setOpen(true);
        }}
        className={styles.profilIcon}
      />
      <AuthModal isOpen={isOpen} onClose={() => setOpen(false)} />
    </Flex>
  );
};
