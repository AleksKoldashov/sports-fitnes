import { useContext, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import { trainersApi } from '@/shared/api/trainers';
import { AdminPanelContex } from '@/pages/AdminPanel/context';
import { ITrainer } from '@/shared/api/types';

interface TrainerFormProps {
  onTrainerAdded: () => void; // Функция для обновления списка после добавления
}

export const TrainerForm = ({ onTrainerAdded }: TrainerFormProps) => {
  const { addTrainer } = useContext(AdminPanelContex);
  const [formData, setFormData] = useState<ITrainer>({
    name: '',
    specialty: '',
    experience: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTrainer(formData);
    setFormData({ name: '', specialty: '', experience: 0 });
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Добавить тренера
      </Typography>
      <div className="font-bold ">Готово </div>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Имя"
            fullWidth
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <TextField
            label="Специализация"
            fullWidth
            required
            value={formData.specialty}
            onChange={(e) =>
              setFormData({ ...formData, specialty: e.target.value })
            }
          />
          <TextField
            label="Опыт (лет)"
            type="number"
            fullWidth
            required
            value={formData.experience}
            onChange={(e) =>
              setFormData({ ...formData, experience: Number(e.target.value) })
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Сохранить
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};
