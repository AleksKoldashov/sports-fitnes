import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClubMemberDto } from './dto/create-club_member.dto';
import { UpdateClubMemberDto } from './dto/update.club_member.dto';

@Injectable()
export class ClubMemberService {
  constructor(private prisma: PrismaService) {}

  async create(@Body() CreateClubMemberDto: CreateClubMemberDto) {
    return await this.prisma.clubMember.create({
      data: CreateClubMemberDto,
    });
  }

  async findAll() {
    return await this.prisma.clubMember.findMany();
  }
  async findOne(id: number) {
    const clubMember = await this.prisma.clubMember.findUnique({
      where: { id },
    });

    if (!clubMember) {
      throw new NotFoundException(`Пост с ID ${id} не найден`);
    }

    return clubMember;
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.clubMember.delete({
      where: { id },
    });
  }

  async update(id: number, updateClubMemberDto: UpdateClubMemberDto) {
    await this.findOne(id); // проверяем есть ли такой id

    return await this.prisma.clubMember.update({
      where: { id },
      data: updateClubMemberDto,
    });
  }
}
