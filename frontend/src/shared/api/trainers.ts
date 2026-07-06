import { API_URL } from './const';

export const trainersApi = {
  // Получить всех
  getAll: async () => {
    const response = await fetch(`${API_URL}/trainers`);
    if (!response.ok) throw new Error('Ошибка при загрузке тренеров');
    return response.json();
  },

  // Получить по ID
  getById: async (id: number) => {
    const response = await fetch(`${API_URL}/trainers/${id}`);
    if (!response.ok) throw new Error('Тренер не найден');
    return response.json();
  },

  // Создать нового
  create: async (data: {
    name: string;
    specialty: string;
    experience: number;
  }) => {
    const response = await fetch(`${API_URL}/trainers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Ошибка при создании тренера');
    return response.json();
  },
};
