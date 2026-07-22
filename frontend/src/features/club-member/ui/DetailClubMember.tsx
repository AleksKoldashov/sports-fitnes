import { texts } from '@/shared';
import { converterDate } from '@/shared/lib/time';
import { Button, Modal } from '@/ui';
import { useState } from 'react';
import { IClubMember } from '../types';

interface IDetailClubMember {
  clubMember: IClubMember;
}

export const DetailClubMember = ({ clubMember }: IDetailClubMember) => {
  const { name, email, membershipExpiresAt } = clubMember;
  const [isOpen, setIsOpen] = useState(false);
  console.log('clubMember', clubMember);

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
        <div>{email}</div>
        <div>{converterDate(membershipExpiresAt)}</div>
      </Modal>
    </>
  );
};
