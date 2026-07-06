import { Module } from '@nestjs/common';
import { TrainersService } from './trainers.service';
import { TrainersController } from './trainers.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Проверь путь

@Module({
  imports: [PrismaModule], // Добавляем импорт модуля базы
  controllers: [TrainersController],
  providers: [TrainersService],
})
export class TrainersModule {}
