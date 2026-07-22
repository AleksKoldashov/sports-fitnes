// import { COLUMNS_CLUB_MEMBERS } from '../const';

import { Table } from '@/ui';
import { COLUMNS_CLUB_MEMBERS } from '../config/table';
import { IClubMemberResponse } from '../types';

export const ClubMemberTable = ({ data, pagination }: IClubMemberResponse) => {
  console.log('data', data);
  console.log('data', pagination);
  return (
    <>
      <Table
        columns={COLUMNS_CLUB_MEMBERS}
        data={data}
        rowKey={(clubMember) => clubMember.id}
      />
    </>
  );
};
