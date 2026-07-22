import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ClubMemberService {
  constructor(private prisma: PrismaService) {}

  // ============================================
  // ПОЛУЧЕНИЕ ПРОФИЛЯ
  // ============================================
  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        clubMember: true,
      },
    });

    if (!user || !user.clubMember) {
      throw new NotFoundException('Профиль не найден');
    }

    const { clubMember } = user;

    // ✅ Получаем данные тренера отдельно
    let trainerName = null;
    if (clubMember.trainerId) {
      const trainer = await this.prisma.employee.findUnique({
        where: { id: clubMember.trainerId },
        select: { firstName: true, lastName: true, specialty: true },
      });
      if (trainer) {
        trainerName = `${trainer.firstName} ${trainer.lastName}`;
      }
    }

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
      trainerName: trainerName,
    };
  }
  // ============================================
  // ОБНОВЛЕНИЕ ПРОФИЛЯ
  // ============================================
  async updateProfile(
    currentUserId: number,
    currentUserRole: Role,
    dto: UpdateProfileDto,
  ) {
    let targetUserId = currentUserId;

    if (
      dto.userId &&
      (currentUserRole === 'TRAINER' ||
        currentUserRole === 'HR' ||
        currentUserRole === 'DIRECTOR')
    ) {
      targetUserId = dto.userId;
    }

    if (dto.userId && currentUserRole === 'CLUB_MEMBER') {
      throw new ForbiddenException(
        'Вы не можете изменять профиль другого пользователя',
      );
    }

    const user = await this.prisma.user.findUnique({
      where: { id: targetUserId },
      include: { clubMember: true },
    });

    if (!user || !user.clubMember) {
      throw new NotFoundException('Профиль не найден');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, fitnessLevel, nutritionPlan, ...userEditableFields } = dto;
    const updateData: any = { ...userEditableFields };

    if (currentUserRole === 'CLUB_MEMBER') {
      if (fitnessLevel || nutritionPlan) {
        throw new ForbiddenException(
          'Только тренер может изменять уровень подготовки и план питания',
        );
      }
    }

    if (
      currentUserRole === 'TRAINER' ||
      currentUserRole === 'HR' ||
      currentUserRole === 'DIRECTOR'
    ) {
      // ✅ Исправляем: ищем тренера в Employee
      if (currentUserRole === 'TRAINER') {
        const trainer = await this.prisma.employee.findUnique({
          where: { userId: currentUserId },
          select: { id: true },
        });

        if (!trainer) {
          throw new NotFoundException('Тренер не найден');
        }

        if (user.clubMember.trainerId !== trainer.id) {
          throw new ForbiddenException(
            'Вы можете изменять профиль только закреплённых за вами участников',
          );
        }
      }

      if (fitnessLevel) updateData.fitnessLevel = fitnessLevel;
      if (nutritionPlan) updateData.nutritionPlan = nutritionPlan;
    }

    const updated = await this.prisma.clubMember.update({
      where: { userId: targetUserId },
      data: updateData,
    });

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: updated.firstName,
      lastName: updated.lastName,
      patronymic: updated.patronymic,
      age: updated.age,
      phone: updated.phone,
      vk: updated.vk,
      telegram: updated.telegram,
      fitnessLevel: updated.fitnessLevel,
      nutritionPlan: updated.nutritionPlan,
      membershipStatus: updated.membershipStatus,
      membershipExpiresAt: updated.membershipExpiresAt,
      trainerId: updated.trainerId,
    };
  }

  // ============================================
  // ЗАКРЕПЛЕНИЕ УЧАСТНИКА ЗА ТРЕНЕРОМ
  // ============================================
  async assignTrainer(trainerUserId: number, clubMemberId: number) {
    // ✅ Исправляем: ищем тренера в Employee
    const trainer = await this.prisma.employee.findUnique({
      where: { userId: trainerUserId },
    });

    if (!trainer) {
      throw new NotFoundException('Тренер не найден');
    }

    const updated = await this.prisma.clubMember.update({
      where: { id: clubMemberId },
      data: {
        trainerId: trainer.id,
      },
    });

    return {
      message: 'Тренер успешно закреплён за участником',
      clubMemberId: updated.id,
      trainerId: updated.trainerId,
    };
  }

  // ============================================
  // СПИСОК УЧАСТНИКОВ ТРЕНЕРА
  // ============================================
  async getMyClubMembers(trainerUserId: number) {
    const trainer = await this.prisma.employee.findUnique({
      where: { userId: trainerUserId },
      select: { id: true },
    });

    if (!trainer) {
      throw new NotFoundException('Тренер не найден');
    }

    const clubMembers = await this.prisma.clubMember.findMany({
      where: {
        trainerId: trainer.id,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    return clubMembers.map((member) => ({
      id: member.id,
      userId: member.userId,
      email: member.user.email,
      firstName: member.firstName,
      lastName: member.lastName,
      patronymic: member.patronymic,
      age: member.age,
      phone: member.phone,
      fitnessLevel: member.fitnessLevel,
      nutritionPlan: member.nutritionPlan,
      membershipStatus: member.membershipStatus,
    }));
  }

  // ============================================
  // ВСЕ УЧАСТНИКИ (HR и директор)
  // ============================================
  async getAllMembers(
    query: {
      search?: string;
      fitnessLevel?: string;
      membershipStatus?: string;
      limit: number;
      offset: number;
    },
    currentUserRole: Role,
  ) {
    if (currentUserRole !== 'HR' && currentUserRole !== 'DIRECTOR') {
      throw new ForbiddenException('Нет доступа к списку всех участников');
    }

    const whereCondition: any = {};

    if (query.search) {
      whereCondition.OR = [
        { firstName: { contains: query.search, mode: 'insensitive' } },
        { lastName: { contains: query.search, mode: 'insensitive' } },
        { user: { email: { contains: query.search, mode: 'insensitive' } } },
      ];
    }

    if (query.fitnessLevel) {
      whereCondition.fitnessLevel = query.fitnessLevel;
    }

    if (query.membershipStatus) {
      whereCondition.membershipStatus = query.membershipStatus;
    }

    const take = Number(query.limit) || 1000;
    const skip = Number(query.offset) || 0;

    const [members, totalCount] = await Promise.all([
      this.prisma.clubMember.findMany({
        where: whereCondition,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              role: true,
            },
          },
          // ✅ Исправляем: trainer → employee
          trainer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.clubMember.count({ where: whereCondition }),
    ]);

    return {
      data: members.map((member) => ({
        id: member.id,
        userId: member.userId,
        email: member.user.email,
        role: member.user.role,
        firstName: member.firstName,
        lastName: member.lastName,
        patronymic: member.patronymic,
        age: member.age,
        phone: member.phone,
        vk: member.vk,
        telegram: member.telegram,
        fitnessLevel: member.fitnessLevel,
        nutritionPlan: member.nutritionPlan,
        membershipStatus: member.membershipStatus,
        membershipExpiresAt: member.membershipExpiresAt,
        trainerId: member.trainerId,
        trainerName: member.trainer
          ? `${member.trainer.firstName} ${member.trainer.lastName}`
          : null,
        avatarUrl: member.avatarUrl,
        name: `${member.firstName} ${member.lastName}`,
      })),
      pagination: {
        total: totalCount,
        limit: take,
        offset: skip,
        hasMore: skip + take < totalCount,
      },
    };
  }

  // ============================================
  // ДЕТАЛЬНАЯ ИНФОРМАЦИЯ ОБ УЧАСТНИКЕ
  // ============================================
  async getMemberById(
    memberId: number,
    currentUserId: number,
    currentUserRole: Role,
  ) {
    const member = await this.prisma.clubMember.findUnique({
      where: { id: memberId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
          },
        },
        // ✅ Исправляем: trainer → employee
        trainer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            specialty: true,
          },
        },
      },
    });

    if (!member) {
      throw new NotFoundException('Участник не найден');
    }

    if (currentUserRole === 'CLUB_MEMBER' && member.userId !== currentUserId) {
      throw new ForbiddenException('Нет доступа к этому профилю');
    }

    // ✅ Исправляем: ищем тренера в Employee
    if (currentUserRole === 'TRAINER') {
      const trainer = await this.prisma.employee.findUnique({
        where: { userId: currentUserId },
        select: { id: true },
      });

      if (!trainer || member.trainerId !== trainer.id) {
        throw new ForbiddenException(
          'Вы можете просматривать только закреплённых за вами участников',
        );
      }
    }

    return {
      id: member.id,
      userId: member.userId,
      email: member.user.email,
      role: member.user.role,
      firstName: member.firstName,
      lastName: member.lastName,
      patronymic: member.patronymic,
      age: member.age,
      phone: member.phone,
      vk: member.vk,
      telegram: member.telegram,
      fitnessLevel: member.fitnessLevel,
      nutritionPlan: member.nutritionPlan,
      membershipStatus: member.membershipStatus,
      membershipExpiresAt: member.membershipExpiresAt,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt,
      trainerId: member.trainerId,
      trainerName: member.trainer
        ? `${member.trainer.firstName} ${member.trainer.lastName}`
        : null,
      trainerSpecialty: member.trainer?.specialty || null,
    };
  }

  // ============================================
  // СТАТИСТИКА УЧАСТНИКА
  // ============================================
  async getMemberStats(
    memberId: number,
    currentUserId: number,
    currentUserRole: Role,
  ) {
    const member = await this.prisma.clubMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      throw new NotFoundException('Участник не найден');
    }

    if (currentUserRole === 'CLUB_MEMBER' && member.userId !== currentUserId) {
      throw new ForbiddenException('Нет доступа к статистике этого участника');
    }

    // ✅ Исправляем: ищем тренера в Employee
    if (currentUserRole === 'TRAINER') {
      const trainer = await this.prisma.employee.findUnique({
        where: { userId: currentUserId },
        select: { id: true },
      });

      if (!trainer || member.trainerId !== trainer.id) {
        throw new ForbiddenException(
          'Вы можете просматривать статистику только своих участников',
        );
      }
    }

    const [totalEvents, completedEvents, attendanceStats] = await Promise.all([
      this.prisma.eventParticipant.count({
        where: { clubMemberId: memberId },
      }),
      this.prisma.eventParticipant.count({
        where: {
          clubMemberId: memberId,
          event: { status: 'COMPLETED' },
        },
      }),
      this.prisma.eventParticipant.groupBy({
        by: ['attendance'],
        where: {
          clubMemberId: memberId,
          event: { status: 'COMPLETED' },
        },
        _count: { attendance: true },
      }),
    ]);

    const attendanceMap: Record<string, number> = {
      PRESENT: 0,
      ABSENT: 0,
      LATE: 0,
      NOT_MARKED: 0,
    };

    attendanceStats.forEach((stat) => {
      if (stat.attendance) {
        attendanceMap[stat.attendance] = stat._count.attendance;
      }
    });

    const markedCount =
      attendanceMap.PRESENT + attendanceMap.ABSENT + attendanceMap.LATE;
    const attendanceRate =
      markedCount > 0
        ? Math.round((attendanceMap.PRESENT / markedCount) * 100)
        : 0;

    return {
      memberId: member.id,
      name: `${member.firstName} ${member.lastName}`,
      statistics: {
        totalTrainings: totalEvents,
        completedTrainings: completedEvents,
        attendance: {
          present: attendanceMap.PRESENT,
          absent: attendanceMap.ABSENT,
          late: attendanceMap.LATE,
          notMarked: attendanceMap.NOT_MARKED,
          attendanceRate: `${attendanceRate}%`,
        },
      },
    };
  }

  // ============================================
  // СМЕНА СТАТУСА АБОНЕМЕНТА
  // ============================================
  async updateMembership(
    memberId: number,
    dto: UpdateMembershipDto,
    currentUserRole: Role,
  ) {
    if (currentUserRole !== 'HR' && currentUserRole !== 'DIRECTOR') {
      throw new ForbiddenException(
        'Только HR или директор могут изменять статус абонемента',
      );
    }

    const member = await this.prisma.clubMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      throw new NotFoundException('Участник не найден');
    }

    const updated = await this.prisma.clubMember.update({
      where: { id: memberId },
      data: {
        membershipStatus: dto.status,
        membershipExpiresAt: dto.expiresAt ? new Date(dto.expiresAt) : null,
      },
    });

    return {
      message: 'Статус абонемента обновлён',
      clubMemberId: updated.id,
      membershipStatus: updated.membershipStatus,
      membershipExpiresAt: updated.membershipExpiresAt,
    };
  }

  // ============================================
  // СПИСОК ТРЕНИРОВОК УЧАСТНИКА
  // ============================================
  async getMemberEvents(
    memberId: number,
    currentUserId: number,
    currentUserRole: Role,
    query: {
      status?: string;
      limit: number;
      offset: number;
    },
  ) {
    const member = await this.prisma.clubMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      throw new NotFoundException('Участник не найден');
    }

    if (currentUserRole === 'CLUB_MEMBER' && member.userId !== currentUserId) {
      throw new ForbiddenException('Нет доступа к тренировкам этого участника');
    }

    // ✅ Исправляем: ищем тренера в Employee
    if (currentUserRole === 'TRAINER') {
      const trainer = await this.prisma.employee.findUnique({
        where: { userId: currentUserId },
        select: { id: true },
      });

      if (!trainer || member.trainerId !== trainer.id) {
        throw new ForbiddenException(
          'Вы можете просматривать тренировки только своих участников',
        );
      }
    }

    const whereCondition: any = {
      clubMemberId: memberId,
    };

    if (query.status) {
      whereCondition.status = query.status;
    }

    const take = Number(query.limit) || 10;
    const skip = Number(query.offset) || 0;

    const [events, totalCount] = await Promise.all([
      this.prisma.eventParticipant.findMany({
        where: whereCondition,
        include: {
          event: {
            include: {
              // ✅ Теперь тренер — это Employee
              trainer: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                },
              },
            },
          },
        },
        skip,
        take,
        orderBy: {
          event: {
            startTime: 'desc',
          },
        },
      }),
      this.prisma.eventParticipant.count({ where: whereCondition }),
    ]);

    return {
      data: events.map((participant) => ({
        id: participant.id,
        eventId: participant.eventId,
        title: participant.event.title,
        description: participant.event.description,
        type: participant.event.type,
        startTime: participant.event.startTime,
        endTime: participant.event.endTime,
        location: participant.event.location,
        status: participant.status,
        attendance: participant.attendance,
        confirmedAt: participant.confirmedAt,
        trainerId: participant.event.trainerId,
        trainerName: participant.event.trainer
          ? `${participant.event.trainer.firstName} ${participant.event.trainer.lastName}`
          : null,
        createdAt: participant.createdAt,
      })),
      pagination: {
        total: totalCount,
        limit: take,
        offset: skip,
        hasMore: skip + take < totalCount,
      },
    };
  }

  // ============================================
  // ОТКРЕПЛЕНИЕ ТРЕНЕРА ОТ УЧАСТНИКА
  // ============================================
  async removeTrainer(
    clubMemberId: number,
    currentUserId: number,
    currentUserRole: Role,
  ) {
    const member = await this.prisma.clubMember.findUnique({
      where: { id: clubMemberId },
      include: {
        trainer: {
          select: {
            firstName: true,
            lastName: true,
            specialty: true,
          },
        },
      },
    });

    if (!member) {
      throw new NotFoundException('Участник не найден');
    }

    if (!member.trainerId) {
      throw new BadRequestException('У этого участника нет тренера');
    }

    if (currentUserRole === 'TRAINER') {
      // ✅ Исправляем: ищем тренера в Employee
      const trainer = await this.prisma.employee.findUnique({
        where: { userId: currentUserId },
        select: { id: true },
      });

      if (!trainer || member.trainerId !== trainer.id) {
        throw new ForbiddenException(
          'Вы можете откреплять только своих участников',
        );
      }
    }

    if (currentUserRole === 'CLUB_MEMBER') {
      throw new ForbiddenException('Участник не может откреплять тренера');
    }

    const updated = await this.prisma.clubMember.update({
      where: { id: clubMemberId },
      data: {
        trainerId: null,
      },
    });

    return {
      message: 'Тренер успешно откреплён от участника',
      clubMemberId: updated.id,
      trainerId: updated.trainerId,
    };
  }
}
