import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const uploadsDir = path.join(process.cwd(), 'uploads');
  const employeesDir = path.join(uploadsDir, 'employees');
  const membersDir = path.join(uploadsDir, 'members');
  const tempDir = path.join(uploadsDir, 'temp');
  const productsDir = path.join(uploadsDir, 'products');

  // Создаём все папки
  try {
    [uploadsDir, employeesDir, membersDir, tempDir, productsDir].forEach(
      (dir) => {
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
          console.log(`📁 Папка ${dir} создана`);
        }
      },
    );
  } catch (error) {
    console.error('❌ Ошибка при создании папок:', error);
    process.exit(1);
  }
  // Раздаём статику
  app.useStaticAssets(uploadsDir, {
    prefix: '/uploads/',
  });

  await app.listen(3000);
  console.log('🚀 Сервер запущен на http://localhost:3000');
}
bootstrap();
