import { AdminPanelContex } from '@/pages/AdminPanel/context';
import { FormUI } from '@/shared/ui/Form/Form';
import { TableUI } from '@/shared/ui/Table/TableUI';
import { Typography } from '@mui/material';
import { useContext } from 'react';

export const TabelListSportsmen = () => {
  const { loading, error, sportsmens, addSportsmen } =
    useContext(AdminPanelContex);
  if (error)
    return (
      <Typography variant="h4" gutterBottom>
        Список тренеров пуст
      </Typography>
    );
  return (
    <>
      <FormUI callback={addSportsmen} />
      {sportsmens.length && <TableUI tableList={sportsmens} />}
    </>
  );
};
