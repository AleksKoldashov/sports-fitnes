// import { PrismaClient } from '@prisma/client';
// import * as bcrypt from 'bcrypt';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('🌱 Начинаем сидирование...');

//   // 1. Проверяем, есть ли уже директор
//   const existingDirector = await prisma.user.findFirst({
//     where: { role: 'DIRECTOR' },
//     include: { director: true },
//   });

//   if (existingDirector) {
//     console.log(`✅ Директор уже существует: ${existingDirector.email}`);
//     console.log('   Сидирование пропущено.');
//     return;
//   }

//   console.log('👤 Создаём директора...');

//   // 2. Хешируем пароль
//   const hashedPassword = await bcrypt.hash('admin123', 10);

//   // 3. Создаём пользователя с ролью DIRECTOR и профиль Director
//   const director = await prisma.user.create({
//     data: {
//       email: 'director@club.ru',
//       password: hashedPassword,
//       role: 'DIRECTOR',
//       director: {
//         create: {
//           firstName: 'Алексей',
//           lastName: 'Иванов',
//           patronymic: 'Сергеевич',
//         },
//       },
//     },
//     include: {
//       director: true,
//     },
//   });

//   console.log('✅ Директор успешно создан:');
//   console.log(`   ID: ${director.id}`);
//   console.log(`   Email: ${director.email}`);
//   console.log(`   Пароль: admin123`);
//   console.log(`   Роль: ${director.role}`);
//   console.log(
//     `   Имя: ${director.director?.firstName} ${director.director?.lastName}`,
//   );

//   console.log('🌱 Сидирование завершено.');
// }

// main()
//   .catch((e) => {
//     console.error('❌ Ошибка при сидировании:', e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
import { PrismaClient, Role } from '@prisma/client'; // <-- импортируем enum
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем сидирование...');

  // 1. Создаём типы документов
  const documentTypes = [
    { name: 'Паспорт', isRequired: true },
    { name: 'СНИЛС', isRequired: true },
    { name: 'ИНН', isRequired: true },
    { name: 'Договор', isRequired: true },
    { name: 'Заявление', isRequired: false },
  ];

  for (const type of documentTypes) {
    await prisma.documentType.upsert({
      where: { name: type.name },
      update: {},
      create: type,
    });
  }
  console.log('✅ Типы документов созданы');

  // 2. Создаём грейды
  const grades = [
    { name: 'Junior', baseSalary: 50000, bonusRate: 0.05 },
    { name: 'Middle', baseSalary: 80000, bonusRate: 0.1 },
    { name: 'Senior', baseSalary: 120000, bonusRate: 0.15 },
    { name: 'Lead', baseSalary: 150000, bonusRate: 0.2 },
  ];

  for (const grade of grades) {
    await prisma.grade.upsert({
      where: { name: grade.name },
      update: {},
      create: grade,
    });
  }
  console.log('✅ Грейды созданы');

  // 3. Создаём должности (с явным указанием типа Role)
  const positions: {
    name: string;
    role: Role; // <-- явно указываем тип Role
    ratePerTraining?: number;
    salesCommission?: number;
  }[] = [
    { name: 'Директор', role: Role.DIRECTOR },
    { name: 'Кадровик (HR)', role: Role.HR },
    { name: 'Старший тренер', role: Role.TRAINER, ratePerTraining: 1500 },
    { name: 'Тренер по йоге', role: Role.TRAINER, ratePerTraining: 1200 },
    { name: 'Тренер по кроссфиту', role: Role.TRAINER, ratePerTraining: 1200 },
    { name: 'Менеджер по продажам', role: Role.MANAGER, salesCommission: 0.05 },
  ];

  for (const pos of positions) {
    await prisma.position.upsert({
      where: { name: pos.name },
      update: {},
      create: pos,
    });
  }
  console.log('✅ Должности созданы');

  // 4. Создаём директора
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const directorPosition = await prisma.position.findUnique({
    where: { name: 'Директор' },
  });
  const leadGrade = await prisma.grade.findUnique({
    where: { name: 'Lead' },
  });

  const directorUser = await prisma.user.create({
    data: {
      email: 'director@sports-fit.ru',
      password: hashedPassword,
      role: 'DIRECTOR',
    },
  });

  await prisma.employee.create({
    data: {
      userId: directorUser.id,
      firstName: 'Алексей',
      lastName: 'Иванов',
      patronymic: 'Сергеевич',
      positionId: directorPosition.id,
      gradeId: leadGrade.id,
      corporateEmail: 'director@sports-fit.ru',
      hireDate: new Date(),
      isActive: true,
      workSchedule: {
        type: 'FIXED',
        startTime: '09:00',
        endTime: '18:00',
      },
    },
  });

  console.log('✅ Директор создан: director@sports-fit.ru / admin123');
  console.log('🌱 Сидирование завершено!');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
