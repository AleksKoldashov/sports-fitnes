"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('🌱 Начинаем сидирование...');
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
    const hashedPassword = await bcrypt.hash('admin123', 10);
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
    console.log(`   Имя: ${director.director?.firstName} ${director.director?.lastName}`);
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
//# sourceMappingURL=seed.js.map