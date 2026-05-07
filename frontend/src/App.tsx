import { Button, Container, Typography, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Загрузка...');

  useEffect(() => {
    fetch('http://localhost:3000') // Запрос к нашему NestJS
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(() => setMessage('Ошибка связи с бэкендом'));
  }, []);
  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        MUI + Vite + React 18
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button variant="contained" color="primary" endIcon={<SendIcon />}>
          Отправить
        </Button>
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>
          Удалить
        </Button>
      </Stack>
      <h1>Фитнес Клуб</h1>
      <p>
        Ответ от сервера: <strong>{message}</strong>
      </p>
    </Container>
  );
}

export default App;
