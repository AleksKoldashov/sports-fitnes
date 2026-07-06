import { Injectable } from '@nestjs/common';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrainersService {
  constructor(private prisma: PrismaService) {}

  create(createTrainerDto: CreateTrainerDto) {
    return this.prisma.trainer.create({
      data: createTrainerDto,
    });
  }

  findAll() {
    return this.prisma.trainer.findMany();
  }
}
