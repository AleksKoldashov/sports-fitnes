import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        employee: {
          include: {
            position: true,
            grade: true,
          },
        },
        clubMember: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const { id, email, role, createdAt, updatedAt } = user;

    const profilUser = {
      id,
      email,
      role,
      createdAt,
      updatedAt,
    };

    // Если пользователь — сотрудник
    if (user.employee) {
      return {
        ...profilUser,
        person_card: {
          ...user.employee,
          position: user.employee.position?.name,
          grade: user.employee.grade?.name,
        },
      };
    }

    // Если пользователь — клубный участник
    if (user.clubMember) {
      return {
        ...profilUser,
        person_card: user.clubMember,
      };
    }

    return profilUser;
  }
}
