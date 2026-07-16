import { Employee } from '@/features/employees/types';
import { texts } from '@/shared';
import { Button, Modal } from '@/ui';
import { useState } from 'react';

interface IDetailEmployee {
  employee: Employee;
}

export const DetailEmployee = (props: IDetailEmployee) => {
  const { name, createdAt, details } = props.employee;

  const [isOpen, setIsOpen] = useState(false);

  console.log(props.employee);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{texts.button.details}</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        showHeader={false}
        showFooter={false}
      >
        <div>{name}</div>
        <div>{createdAt}</div>
        <div>{details?.email}</div>
      </Modal>
    </>
  );
};
