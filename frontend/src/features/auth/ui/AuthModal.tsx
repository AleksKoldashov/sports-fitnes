// src/features/AuthByEmail/ui/AuthModal/AuthModal.tsx
import { Button, Flex, Input, Modal, Tabs, Typography } from '@/ui';
import React, { useState } from 'react';
import { useLogin, useRegister } from '../hooks';
import { LOGIN_USER, REGIST_USER, TABS_ITEM } from './const';
import { AuthModalProps } from './types';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('e', e.currentTarget);

    const formData = new FormData(e.currentTarget);

    // Достаем значения по атрибуту name
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    console.log({ email, password });

    loginMutation.mutate({ email, password });

    onClose();
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('e', e.currentTarget);

    const formData = new FormData(e.currentTarget);

    // Достаем значения по атрибуту name
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const firstName = formData.get('name') as string;
    const lastName = formData.get('famili') as string;
    const patronymic = formData.get('lastName') as string;
    const ageNum = formData.get('age') as string;
    console.log({ email, password });

    const age = +ageNum;

    registerMutation.mutate({
      email,
      password,
      firstName,
      lastName,
      patronymic,
      age,
    });

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
          <form onSubmit={handleRegister}>
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

              {LOGIN_USER.map(({ type, placeholder, label, id, name }) => (
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
                Войти
              </Button>
            </Flex>
          </form>
        )}
      </Flex>
    </Modal>
  );
};
