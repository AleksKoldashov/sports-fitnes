import { useContext } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  CircularProgress,
  Alert,
} from '@mui/material';
import { AdminPanelContex } from '@/pages/AdminPanel/context';
import { TableUI } from '@/shared/ui/Table/TableUI';

export const TrainersList = () => {
  const { testList, trainers, loading, error } = useContext(AdminPanelContex);
  console.log('testList', testList);

  if (loading)
    return <CircularProgress sx={{ mt: 4, display: 'block', mx: 'auto' }} />;
  if (error) return <Alert severity="error">{error}</Alert>;
  if (!trainers.length)
    return (
      <Typography variant="h4" gutterBottom>
        Список тренеров пуст
      </Typography>
    );
  return (
    <Container sx={{ mt: 4 }}>
      <TableUI tableList={trainers} />
      {/* <Typography variant="h4" gutterBottom>
        Наши тренеры
      </Typography>
      <Grid container spacing={3}>
        {trainers.map((trainer) => (
          <Grid item xs={12} sm={6} md={4} key={trainer.id}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">{trainer.name}</Typography>
                <Typography color="textSecondary">
                  {trainer.specialty}
                </Typography>
                <Typography variant="body2">
                  Опыт: {trainer.experience} лет
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid> */}
    </Container>
  );
};
