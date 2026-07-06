import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClubMemberDto } from './dto/create-club_member.dto';

@Injectable()
export class ClubMemberService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.clubMember.findMany();
  }

  async create(@Body() CreateClubMemberDto: CreateClubMemberDto) {
    return await this.prisma.clubMember.create({
      data: CreateClubMemberDto,
    });
  }
}
