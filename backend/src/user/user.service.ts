import { Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        clubMember: true,
        trainer: true,
        hr: true,
        director: true,
      },
    });
    const person = {
      [Role.DIRECTOR]: user.director,
      [Role.CLUB_MEMBER]: user.clubMember,
      [Role.HR]: user.hr,
      [Role.MANAGER]: user.trainer,
      [Role.TRAINER]: user.trainer,
    };
    // // Преобразуем в DTO и автоматически исключаем password
    // return plainToInstance(UserResponseDto, user);
    const { id, email, role, createdAt, updatedAt } = user;

    const profilUser = {
      id,
      email,
      role,
      createdAt,
      updatedAt,
    };
    return { ...profilUser, person_card: person[role] };
  }
}
