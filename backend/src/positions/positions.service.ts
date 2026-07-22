import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-position.dto';

@Injectable()
export class PositionsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePositionDto) {
    const existing = await this.prisma.position.findUnique({
      where: { name: dto.name },
    });

    if (existing) {
      throw new ConflictException(`Должность "${dto.name}" уже существует`);
    }

    return this.prisma.position.create({
      data: dto,
    });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async findAll() {
    return this.prisma.position.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: number) {
    const position = await this.prisma.position.findUnique({
      where: { id },
    });

    if (!position) {
      throw new NotFoundException('Должность не найдена');
    }

    return position;
  }

  async update(id: number, dto: UpdatePositionDto) {
    await this.findOne(id);

    return this.prisma.position.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.position.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
