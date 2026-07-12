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

  // получаем данные по профилю
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
  // обновление данных профиля и участником и тренером с правами
  async updateProfile(
    currentUserId: number,
    currentUserRole: Role,
    dto: UpdateProfileDto,
  ) {
    // 1. Определяем, чей профиль обновляем
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

    // 2. Находим пользователя и его профиль
    const user = await this.prisma.user.findUnique({
      where: { id: targetUserId },
      include: { clubMember: true },
    });

    if (!user || !user.clubMember) {
      throw new NotFoundException('Профиль не найден');
    }

    // 3. Разделяем поля
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { userId, fitnessLevel, nutritionPlan, ...userEditableFields } = dto;

    // 4. Формируем данные для обновления
    const updateData: any = { ...userEditableFields };

    // 5. Проверяем права на изменение fitnessLevel и nutritionPlan
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
      // 6. Если тренер — проверяем, что участник закреплён за ним
      if (currentUserRole === 'TRAINER') {
        const trainer = await this.prisma.trainer.findUnique({
          where: { userId: currentUserId },
          select: { id: true },
        });

        console.log('currentUserId:', currentUserId);
        console.log('Найденный trainer.id:', trainer?.id);
        console.log('ClubMember.trainerId:', user.clubMember.trainerId);

        if (!trainer) {
          throw new NotFoundException('Тренер не найден');
        }

        if (user.clubMember.trainerId !== trainer.id) {
          throw new ForbiddenException(
            `Вы можете изменять профиль только закреплённых за вами участников. Ваш trainer.id: ${trainer.id}, а у участника trainerId: ${user.clubMember.trainerId}`,
          );
        }
      }
      // if (currentUserRole === 'TRAINER') {
      //   const trainer = await this.prisma.trainer.findUnique({
      //     where: { userId: currentUserId },
      //     select: { id: true },
      //   });

      //   if (!trainer) {
      //     throw new NotFoundException('Тренер не найден');
      //   }

      //   if (user.clubMember.trainerId !== trainer.id) {
      //     throw new ForbiddenException(
      //       'Вы можете изменять профиль только закреплённых за вами участников',
      //     );
      //   }
      // }

      if (fitnessLevel) updateData.fitnessLevel = fitnessLevel;
      if (nutritionPlan) updateData.nutritionPlan = nutritionPlan;
    }

    // 7. Обновляем профиль
    const updated = await this.prisma.clubMember.update({
      where: { userId: targetUserId },
      data: updateData,
    });

    // 8. Возвращаем обновлённый профиль
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

  // закрепление участника за тренером
  async assignTrainer(trainerUserId: number, clubMemberId: number) {
    // console.log('trainerUserId:', trainerUserId);
    // console.log('clubMemberId:', clubMemberId);

    const trainer = await this.prisma.trainer.findUnique({
      where: { userId: trainerUserId },
    });

    console.log('Найденный trainer:', trainer);

    if (!trainer) {
      throw new NotFoundException('Тренер не найден');
    }

    const updated = await this.prisma.clubMember.update({
      where: { id: clubMemberId },
      data: {
        trainerId: trainer.id,
      },
    });

    // console.log('Обновлённый участник:', updated);

    return {
      message: 'Тренер успешно закреплён за участником',
      clubMemberId: updated.id,
      trainerId: updated.trainerId,
    };
  }

  // Получение списка участников для тренера

  async getMyClubMembers(trainerUserId: number) {
    // 1. Находим тренера по userId
    const trainer = await this.prisma.trainer.findUnique({
      where: { userId: trainerUserId },
      select: { id: true },
    });

    if (!trainer) {
      throw new NotFoundException('Тренер не найден');
    }

    // 2. Получаем всех участников, закреплённых за этим тренером
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

    // 3. Форматируем ответ
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

  //  получению списка всех участников для HR и директора (с пагинацией и фильтрацией)
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
    // 1. Проверяем права
    if (currentUserRole !== 'HR' && currentUserRole !== 'DIRECTOR') {
      throw new ForbiddenException('Нет доступа к списку всех участников');
    }

    // 2. Формируем фильтры
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

    // 3. Явно преобразуем limit и offset в числа
    const take = Number(query.limit) || 10;
    const skip = Number(query.offset) || 0;

    // 4. Получаем участников с пагинацией
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
          trainer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        skip: skip,
        take: take,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.clubMember.count({ where: whereCondition }),
    ]);

    // 5. Форматируем ответ
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
      })),
      pagination: {
        total: totalCount,
        limit: take,
        offset: skip,
        hasMore: skip + take < totalCount,
      },
    };
  }

  // получения детальной информации об участнике
  async getMemberById(
    memberId: number,
    currentUserId: number,
    currentUserRole: Role,
  ) {
    // 1. Находим участника
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

    // 2. Проверяем права доступа
    if (currentUserRole === 'CLUB_MEMBER' && member.userId !== currentUserId) {
      throw new ForbiddenException('Нет доступа к этому профилю');
    }

    if (currentUserRole === 'TRAINER') {
      const trainer = await this.prisma.trainer.findUnique({
        where: { userId: currentUserId },
        select: { id: true },
      });

      if (!trainer || member.trainerId !== trainer.id) {
        throw new ForbiddenException(
          'Вы можете просматривать только закреплённых за вами участников',
        );
      }
    }

    // 3. Форматируем ответ
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

  // откреплению тренера от участника
  async removeTrainer(
    clubMemberId: number,
    currentUserId: number,
    currentUserRole: Role,
  ) {
    // 1. Находим участника
    const member = await this.prisma.clubMember.findUnique({
      where: { id: clubMemberId },
      include: {
        trainer: true,
      },
    });

    if (!member) {
      throw new NotFoundException('Участник не найден');
    }

    // 2. Проверяем, что у участника есть тренер
    if (!member.trainerId) {
      throw new BadRequestException('У этого участника нет тренера');
    }

    // 3. Проверяем права
    if (currentUserRole === 'TRAINER') {
      const trainer = await this.prisma.trainer.findUnique({
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

    // 4. Открепляем тренера
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

  // статистике участника
  async getMemberStats(
    memberId: number,
    currentUserId: number,
    currentUserRole: Role,
  ) {
    // 1. Находим участника
    const member = await this.prisma.clubMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      throw new NotFoundException('Участник не найден');
    }

    // 2. Проверяем права
    if (currentUserRole === 'CLUB_MEMBER' && member.userId !== currentUserId) {
      throw new ForbiddenException('Нет доступа к статистике этого участника');
    }

    if (currentUserRole === 'TRAINER') {
      const trainer = await this.prisma.trainer.findUnique({
        where: { userId: currentUserId },
        select: { id: true },
      });

      if (!trainer || member.trainerId !== trainer.id) {
        throw new ForbiddenException(
          'Вы можете просматривать статистику только своих участников',
        );
      }
    }

    // 3. Собираем статистику
    const [totalEvents, completedEvents, attendanceStats] = await Promise.all([
      // Общее количество тренировок
      this.prisma.eventParticipant.count({
        where: {
          clubMemberId: memberId,
        },
      }),

      // Завершённые тренировки (где статус COMPLETED)
      this.prisma.eventParticipant.count({
        where: {
          clubMemberId: memberId,
          event: {
            status: 'COMPLETED',
          },
        },
      }),

      // Статистика посещаемости
      this.prisma.eventParticipant.groupBy({
        by: ['attendance'],
        where: {
          clubMemberId: memberId,
          event: {
            status: 'COMPLETED',
          },
        },
        _count: {
          attendance: true,
        },
      }),
    ]);

    // 4. Форматируем статистику посещаемости
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

    // 5. Вычисляем процент посещаемости
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

  // смене статуса абонемента участника (для HR и директора)
  async updateMembership(
    memberId: number,
    dto: UpdateMembershipDto,
    currentUserRole: Role,
  ) {
    // 1. Проверяем права (только HR и директор)
    if (currentUserRole !== 'HR' && currentUserRole !== 'DIRECTOR') {
      throw new ForbiddenException(
        'Только HR или директор могут изменять статус абонемента',
      );
    }

    // 2. Находим участника
    const member = await this.prisma.clubMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      throw new NotFoundException('Участник не найден');
    }

    // 3. Обновляем статус
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

  // получению списка всех тренировок участника
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
    // 1. Находим участника
    const member = await this.prisma.clubMember.findUnique({
      where: { id: memberId },
    });

    if (!member) {
      throw new NotFoundException('Участник не найден');
    }

    // 2. Проверяем права
    if (currentUserRole === 'CLUB_MEMBER' && member.userId !== currentUserId) {
      throw new ForbiddenException('Нет доступа к тренировкам этого участника');
    }

    if (currentUserRole === 'TRAINER') {
      const trainer = await this.prisma.trainer.findUnique({
        where: { userId: currentUserId },
        select: { id: true },
      });

      if (!trainer || member.trainerId !== trainer.id) {
        throw new ForbiddenException(
          'Вы можете просматривать тренировки только своих участников',
        );
      }
    }

    // 3. Формируем фильтры
    const whereCondition: any = {
      clubMemberId: memberId,
    };

    // Фильтр по статусу участника в событии
    if (query.status) {
      whereCondition.status = query.status;
    }

    // 4. Получаем тренировки с пагинацией
    const take = Number(query.limit) || 10;
    const skip = Number(query.offset) || 0;

    const [events, totalCount] = await Promise.all([
      this.prisma.eventParticipant.findMany({
        where: whereCondition,
        include: {
          event: {
            include: {
              trainer: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  specialty: true,
                },
              },
            },
          },
        },
        skip: skip,
        take: take,
        orderBy: {
          event: {
            startTime: 'desc',
          },
        },
      }),
      this.prisma.eventParticipant.count({ where: whereCondition }),
    ]);

    // 5. Форматируем ответ
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
        trainerSpecialty: participant.event.trainer?.specialty || null,
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
}
