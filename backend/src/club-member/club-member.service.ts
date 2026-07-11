import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClubMemberService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        clubMember: {
          include: {
            trainer: {
              select: {
                firstName: true,
                lastName: true,
                specialty: true,
              },
            },
          },
        },
      },
    });

    if (!user || !user.clubMember) {
      throw new NotFoundException('Профиль не найден');
    }

    const { clubMember } = user;

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: clubMember.firstName,
      lastName: clubMember.lastName,
      patronymic: clubMember.patronymic,
      age: clubMember.age,
      phone: clubMember.phone,
      vk: clubMember.vk,
      telegram: clubMember.telegram,
      fitnessLevel: clubMember.fitnessLevel,
      nutritionPlan: clubMember.nutritionPlan,
      membershipStatus: clubMember.membershipStatus,
      membershipExpiresAt: clubMember.membershipExpiresAt,
      trainerId: clubMember.trainerId,
      trainerName: clubMember.trainer
        ? `${clubMember.trainer.firstName} ${clubMember.trainer.lastName}`
        : null,
    };
  }
}
