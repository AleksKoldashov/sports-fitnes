import { useAuthStore, useLogout } from '@/features/auth';
import { AuthModal } from '@/features/auth/ui/AuthModal';
import { Button, Flex, Typography } from '@/ui';
import { NotificationBell } from '@/ui/NotificationBell/NotificationBell';
// import Profil from '@shared/assets/icons/profil.svg?react';
import { useState } from 'react';
// import styles from './Header.module.scss';

interface IHeader {
  onClickBell?: () => void;
}

export const Header = ({ onClickBell }: IHeader) => {
  const { isAuthenticated } = useAuthStore();
  const logout = useLogout();

  const [isOpen, setOpen] = useState(false);

  const handleOpenModalAuth = () => {
    if (isAuthenticated) {
      setOpen(false);
      logout();
      console.log('работает');

      return;
    }

    setOpen(true);
  };
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
      <NotificationBell count={4} onClickBell={onClickBell} />
      <Button onClick={handleOpenModalAuth}>
        {isAuthenticated ? <>Выйти</> : <>Войти</>}
      </Button>
      <AuthModal isOpen={isOpen} onClose={() => setOpen(false)} />
    </Flex>
  );
};
