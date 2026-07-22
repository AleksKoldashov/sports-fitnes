import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import {
  generateAvatarUrl,
  generateRandomClubMember,
  generateRandomHR,
  generateRandomManager,
  generateRandomTrainer,
  generateRandomUser,
} from '../../src/common/utils/faker.util';

const prisma = new PrismaClient();

// Конфигурация
const USERS_COUNT = 30; // членов клуба
const TRAINERS_COUNT = 5;
const MANAGERS_COUNT = 2;
const HR_COUNT = 1;

async function main() {
  console.log('🌱 Начинаем сидирование фейковых данных...');

  // 1. Получаем справочники
  const positions = await prisma.position.findMany();
  const grades = await prisma.grade.findMany();

  // 2. Создаём 30 клубных участников
  console.log(`📝 Создаём ${USERS_COUNT} клубных участников...`);
  const clubMembersData = [];
  for (let i = 0; i < USERS_COUNT; i++) {
    const userData = generateRandomUser();
    const clubMemberData = generateRandomClubMember();
    const hashedPassword = await bcrypt.hash('password123', 10);

    // рандомное число от 1000 - 2000
    const randomNumber = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: 'CLUB_MEMBER',
        clubMember: {
          create: {
            ...clubMemberData,
            avatarUrl: generateAvatarUrl(`${i + randomNumber}`),
          },
        },
      },
    });
    clubMembersData.push(user);
  }
  console.log(`✅ Создано ${clubMembersData.length} участников`);

  // 3. Создаём 5 тренеров
  console.log(`📝 Создаём ${TRAINERS_COUNT} тренеров...`);
  const trainerPosition = positions.find((p) => p.role === 'TRAINER');
  const trainerGrade = grades.find((g) => g.name === 'Middle');

  if (!trainerPosition || !trainerGrade) {
    throw new Error(
      '❌ Не найдена должность или грейд для тренера. Сначала запусти `npx ts-node prisma/seed.ts`',
    );
  }

  const trainersData = [];
  for (let i = 0; i < TRAINERS_COUNT; i++) {
    const trainerData = generateRandomTrainer();
    const userData = generateRandomUser();
    const hashedPassword = await bcrypt.hash('password123', 10);

    // Генерируем корпоративную почту
    const corporateEmail = `${trainerData.firstName.toLowerCase()}.${trainerData.lastName.toLowerCase()}@sports-fit.ru`;

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: 'TRAINER',
        employee: {
          create: {
            firstName: trainerData.firstName,
            lastName: trainerData.lastName,
            patronymic: trainerData.patronymic,
            phone: trainerData.phone,
            specialty: trainerData.specialty,
            positionId: trainerPosition.id,
            gradeId: trainerGrade.id,
            corporateEmail: corporateEmail,
            hireDate: new Date(),
            isActive: true,
            avatarUrl: generateAvatarUrl(`${i + 2000}`),
            workSchedule: {
              type: 'FLEXIBLE',
              days: {
                monday: { start: '08:00', end: '16:00', isDayOff: false },
                tuesday: { start: '10:00', end: '18:00', isDayOff: false },
                wednesday: { start: '09:00', end: '17:00', isDayOff: false },
                thursday: { start: '08:00', end: '16:00', isDayOff: false },
                friday: { start: '09:00', end: '13:00', isDayOff: false },
                saturday: { start: '00:00', end: '00:00', isDayOff: true },
                sunday: { start: '00:00', end: '00:00', isDayOff: true },
              },
            },
          },
        },
      },
    });
    trainersData.push(user);
  }
  console.log(`✅ Создано ${trainersData.length} тренеров`);

  // 4. Создаём 2 менеджеров
  console.log(`📝 Создаём ${MANAGERS_COUNT} менеджеров...`);
  const managerPosition = positions.find((p) => p.role === 'MANAGER');
  const managerGrade = grades.find((g) => g.name === 'Senior');

  if (!managerPosition || !managerGrade) {
    throw new Error('❌ Не найдена должность или грейд для менеджера');
  }

  const managersData = [];
  for (let i = 0; i < MANAGERS_COUNT; i++) {
    const managerData = generateRandomManager();
    const userData = generateRandomUser();
    const hashedPassword = await bcrypt.hash('password123', 10);

    const corporateEmail = `${managerData.firstName.toLowerCase()}.${managerData.lastName.toLowerCase()}@sports-fit.ru`;

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        role: 'MANAGER',
        employee: {
          create: {
            firstName: managerData.firstName,
            lastName: managerData.lastName,
            patronymic: managerData.patronymic,
            phone: managerData.phone,
            department: managerData.department,
            positionId: managerPosition.id,
            gradeId: managerGrade.id,
            corporateEmail: corporateEmail,
            hireDate: new Date(),
            isActive: true,
            avatarUrl: generateAvatarUrl(`${i + 3000}`),
            workSchedule: {
              type: 'FIXED',
              startTime: '09:00',
              endTime: '18:00',
            },
          },
        },
      },
    });
    managersData.push(user);
  }
  console.log(`✅ Создано ${managersData.length} менеджеров`);

  // 5. Создаём 1 HR
  console.log(`📝 Создаём ${HR_COUNT} HR...`);
  const hrPosition = positions.find((p) => p.role === 'HR');
  const hrGrade = grades.find((g) => g.name === 'Middle');

  if (!hrPosition || !hrGrade) {
    throw new Error('❌ Не найдена должность или грейд для HR');
  }

  const hrData = generateRandomHR();
  const userData = generateRandomUser();
  const hashedPassword = await bcrypt.hash('password123', 10);

  const corporateEmail = `${hrData.firstName.toLowerCase()}.${hrData.lastName.toLowerCase()}@sports-fit.ru`;

  await prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      role: 'HR',
      employee: {
        create: {
          firstName: hrData.firstName,
          lastName: hrData.lastName,
          patronymic: hrData.patronymic,
          phone: hrData.phone,
          positionId: hrPosition.id,
          gradeId: hrGrade.id,
          corporateEmail: corporateEmail,
          hireDate: new Date(),
          isActive: true,
          avatarUrl: generateAvatarUrl(`${4023}`),
          workSchedule: {
            type: 'FIXED',
            startTime: '09:00',
            endTime: '18:00',
          },
        },
      },
    },
  });
  console.log(`✅ Создан HR`);

  console.log('🌱 Сидирование фейковых данных завершено!');

  // 6. Выводим статистику
  console.log('\n📊 Статистика:');
  console.log(`  👥 Клубные участники: ${USERS_COUNT}`);
  console.log(`  🧑‍🏫 Тренеры: ${TRAINERS_COUNT}`);
  console.log(`  📊 Менеджеры: ${MANAGERS_COUNT}`);
  console.log(`  📋 HR: ${HR_COUNT}`);
  console.log(`\n🔑 Пароль для всех: "password123"`);
  console.log(`📸 Аватарки сгенерированы через https://picsum.photos`);
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
