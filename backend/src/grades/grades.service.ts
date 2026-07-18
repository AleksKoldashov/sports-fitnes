import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateGradeDto) {
    const existing = await this.prisma.grade.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException(`Грейд "${dto.name}" уже существует`);
    }

    return this.prisma.grade.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.grade.findMany({
      where: { isActive: true },
      orderBy: { baseSalary: 'asc' },
    });
  }

  async findOne(id: number) {
    const grade = await this.prisma.grade.findUnique({
      where: { id },
    });

    if (!grade) {
      throw new NotFoundException('Грейд не найден');
    }

    return grade;
  }

  async update(id: number, dto: UpdateGradeDto) {
    await this.findOne(id);

    return this.prisma.grade.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.grade.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
