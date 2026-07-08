// src/features/AuthByEmail/ui/AuthModal/AuthModal.tsx
import { Button, Flex, Input, Modal, Tabs, Typography } from '@/ui';
import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TABS_ITEM = [
  { id: '1', label: 'Регистрация' },
  { id: '2', label: 'Войти' },
];

const REGIST_USER = [
  {
    id: 1,
    type: 'email',
    placeholder: 'alex@fit.com',
    label: 'Email',
    name: 'email',
  },
  {
    id: 2,
    type: 'password',
    placeholder: '••••••••',
    label: 'Пароль',
    name: 'password',
  },
  {
    id: 3,
    type: 'password',
    placeholder: '••••••••',
    label: 'Повторите пароль',
    name: 'repedPass',
  },
  { id: 4, type: 'text', placeholder: 'Иван', label: 'Имя', name: 'name' },
  {
    id: 5,
    type: 'text',
    placeholder: 'Иванович',
    label: 'Отчество',
    name: 'lastName',
  },
  {
    id: 6,
    type: 'text',
    placeholder: 'Иванов',
    label: 'Фамилия',
    name: 'famili',
  },
  { id: 7, type: 'number', placeholder: '22', label: 'Возраст', name: 'age' },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('e', e.currentTarget);

    const formData = new FormData(e.currentTarget);

    // Достаем значения по атрибуту name
    const email = formData.get('email');
    const password = formData.get('password');

    console.log({ email, password });

    // Логика запроса к бэкенду через React Query (QueryProvider)
    // alert('Авторизация...');
    onClose();
  };

  const [tab, setTab] = useState('1');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showHeader={false}
      showFooter={false}
    >
      <Flex direction="column" gap="16">
        <Tabs items={TABS_ITEM} activeId={tab} onTabChange={setTab} />
        {tab === '1' && (
          <form onSubmit={handleLogin}>
            <Flex direction="column" gap="16" max>
              <Typography size="14" style={{ color: '#64748b' }}>
                Заполните форму чтобы зарегестрироваться
              </Typography>
              {REGIST_USER.map(({ type, placeholder, label, id, name }) => (
                <Input
                  type={type}
                  placeholder={placeholder}
                  label={label}
                  required
                  key={id}
                  name={name}
                />
              ))}
              <Button variant="filled" type="submit" max>
                Зарегестрироваться
              </Button>
            </Flex>
          </form>
        )}

        {tab === '2' && (
          <form onSubmit={handleLogin}>
            <Flex direction="column" gap="16" max>
              <Typography size="14" style={{ color: '#64748b' }}>
                Введите ваши данные.
              </Typography>

              <Input
                type="email"
                placeholder="alex@fit.com"
                label="Email"
                required
              />
              <Input
                type="password"
                placeholder="••••••••"
                label="Пароль"
                required
              />

              <Button variant="filled" type="submit" max>
                Войти
              </Button>
            </Flex>
          </form>
        )}
      </Flex>
    </Modal>
  );
};
