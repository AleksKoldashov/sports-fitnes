import { Tooltip } from '@/ui';
import { Button } from '@/ui/Button';
import { Card } from '@/ui/Card';
import { Flex } from '@/ui/Flex';
import { FormField } from '@/ui/FormField';
import { Input } from '@/ui/Input';
import { Modal } from '@/ui/Modal';
import { Textarea } from '@/ui/Textarea';
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
    <Flex
      direction="column"
      gap="16"
      style={{ padding: '24px', width: '1000px' }}
    >
      <Button onClick={() => setIsOpen(true)}>Редактировать вес</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Текущие замеры"
        footerContent={footerButtons} // Передаем кнопки в футер
      >
        <Input
          label="Введите ваш новый вес (кг)"
          type="number"
          placeholder="75"
        />
      </Modal>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showFooter={false} // НИЖНИЙ СЕРЫЙ БЛОК ПОЛНОСТЬЮ ИСЧЕЗНЕТ
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginTop: '12px' }}>
            Опускайтесь до параллели с полом, не отрывайте пятки.
          </p>
        </div>
      </Modal>

      <Card variant="dark" style={{ width: '400px', padding: '24px' }}>
        <Flex direction="column" gap="16" max>
          <h3>Завершение тренировки</h3>

          <FormField label="Заметки о тренировке (самочувствие, веса)">
            <Textarea
              placeholder="Например: В третьем подходе жима штанги увеличил вес до 65кг. Пульс в норме..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </FormField>
          <Tooltip text="ghjsdkfajshd">
            <Button variant="filled" max>
              Сохранить в дневник
            </Button>
          </Tooltip>
        </Flex>
      </Card>
    </Flex>
  );
};
