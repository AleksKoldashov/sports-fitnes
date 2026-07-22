import { faker } from '@faker-js/faker';
import { Role } from '@prisma/client';

export const generateRandomUser = () => ({
  email: faker.internet.email(),
  password: 'password123',
  role: 'CLUB_MEMBER' as Role,
});

export const generateRandomClubMember = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  patronymic: faker.person.middleName(),
  age: faker.number.int({ min: 18, max: 70 }),
  phone: faker.phone.number(),
  vk: `vk.com/${faker.internet.username()}`,
  telegram: `@${faker.internet.username()}`,
  fitnessLevel: faker.helpers.arrayElement([
    'BEGINNER',
    'INTERMEDIATE',
    'ADVANCED',
    'PRO',
  ]),
  nutritionPlan: faker.lorem.sentence({ min: 3, max: 10 }),
  membershipStatus: faker.helpers.arrayElement(['TRIAL', 'ACTIVE', 'EXPIRED']),
  membershipExpiresAt: faker.date.future({ years: 1 }),
});

export const generateRandomTrainer = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  patronymic: faker.person.middleName(),
  specialty: faker.helpers.arrayElement([
    'Йога',
    'Кроссфит',
    'Бокс',
    'Каратэ',
    'Пилатес',
    'Фитнес',
    'Стретчинг',
    'MMA',
    'Тайский бокс',
    'Бодибилдинг',
    'Зумба',
    'Спортивная йога',
  ]),
  experience: faker.number.int({ min: 1, max: 20 }),
  phone: faker.phone.number(),
});

export const generateRandomManager = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  patronymic: faker.person.middleName(),
  department: faker.helpers.arrayElement([
    'Продажи',
    'Маркетинг',
    'Администрация',
    'Клиентский сервис',
  ]),
  phone: faker.phone.number(),
});

export const generateRandomHR = () => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  patronymic: faker.person.middleName(),
  phone: faker.phone.number(),
  isActive: true,
});

export const generateAvatarUrl = (seed: string) => {
  // настоящие аватары
  return `https://i.pravatar.cc/200?img=${seed}`;
  // мультяшные
  // return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
};
