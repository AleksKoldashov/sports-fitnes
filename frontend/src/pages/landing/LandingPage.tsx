import { Button, Flex } from '@/ui';
import { Footer } from '@/widgets/Footer';
import { Header } from '@/widgets/Header';
import { useState } from 'react';

export const LandingPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notes, setNotes] = useState('');

  // Контент для футера собираем отдельно
  const footerButtons = (
    <>
      <Button variant="outlined" onClick={() => setIsOpen(false)}>
        Отмена
      </Button>
      <Button variant="filled" onClick={() => alert('Сохранено')}>
        Сохранить вес
      </Button>
    </>
  );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. Хедер — теперь он жестко растянут на 100% ширины контентной зоны */}
      <div style={{ width: '100%', boxSizing: 'border-box' }}>
        <Header />
      </div>

      {/* 2. Центральная контентная часть */}
      <Flex
        direction="column"
        gap="16"
        style={{
          padding: '24px',
          width: '100%',
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          boxSizing: 'border-box',
        }}
      >
        <Button variant="filled">Сохранить вес</Button>
      </Flex>

      {/* 3. Футер */}
      <div style={{ width: '100%', boxSizing: 'border-box' }}>
        <Footer />
      </div>
    </div>
  );
};
