import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Controller('trainers')
export class TrainersController {
  constructor(private prisma: PrismaService) {}

  @Post()
  create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.prisma.trainer.create({
      data: createTrainerDto,
    });
  }

  @Get()
  findAll() {
    return this.prisma.trainer.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prisma.trainer.findUnique({
      where: { id: +id },
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.prisma.trainer.update({
      where: { id: +id },
      data: updateTrainerDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prisma.trainer.delete({
      where: { id: +id },
    });
  }
}
