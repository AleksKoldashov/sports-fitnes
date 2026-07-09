import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Начинаем сидирование...');

  // 1. Проверяем, есть ли уже директор
  const existingDirector = await prisma.user.findFirst({
    where: { role: 'DIRECTOR' },
    include: { director: true },
  });

  if (existingDirector) {
    console.log(`✅ Директор уже существует: ${existingDirector.email}`);
    console.log('   Сидирование пропущено.');
    return;
  }

  console.log('👤 Создаём директора...');

  // 2. Хешируем пароль
  const hashedPassword = await bcrypt.hash('admin123', 10);

  // 3. Создаём пользователя с ролью DIRECTOR и профиль Director
  const director = await prisma.user.create({
    data: {
      email: 'director@club.ru',
      password: hashedPassword,
      role: 'DIRECTOR',
      director: {
        create: {
          firstName: 'Алексей',
          lastName: 'Иванов',
          patronymic: 'Сергеевич',
        },
      },
    },
    include: {
      director: true,
    },
  });

  console.log('✅ Директор успешно создан:');
  console.log(`   ID: ${director.id}`);
  console.log(`   Email: ${director.email}`);
  console.log(`   Пароль: admin123`);
  console.log(`   Роль: ${director.role}`);
  console.log(
    `   Имя: ${director.director?.firstName} ${director.director?.lastName}`,
  );

  console.log('🌱 Сидирование завершено.');
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при сидировании:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
