import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Делает модуль доступным во всем приложении без повторных импортов
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Разрешаем другим модулям использовать этот сервис
})
export class PrismaModule {}
