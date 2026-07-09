import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { ApproveApplicationDto } from './dto/approve-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // 1. ПРЯМОЕ СОЗДАНИЕ СОТРУДНИКА (только для директора)
  async createEmployeeDirectly(dto: CreateEmployeeDto, currentUserId: number) {
    // Проверяем, что текущий пользователь — директор
    const currentUser = await this.prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser || currentUser.role !== 'DIRECTOR') {
      throw new ForbiddenException(
        'Только директор может создавать сотрудников напрямую',
      );
    }

    // Проверяем, что пользователь с такой почтой не существует
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с такой почтой уже существует',
      );
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Создаём пользователя и профиль в транзакции
    return await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          role: dto.role,
        },
      });

      // Создаём профиль в зависимости от роли
      await this.createProfile(prisma, user.id, dto);

      return {
        id: user.id,
        email: user.email,
        role: user.role,
      };
    });
  }

  // 2. СОЗДАНИЕ ЗАЯВКИ (только для HR)
  async createApplication(dto: CreateApplicationDto, currentUserId: number) {
    // Проверяем, что текущий пользователь — HR
    const currentUser = await this.prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser || currentUser.role !== 'HR') {
      throw new ForbiddenException('Только HR может создавать заявки');
    }

    // Проверяем, что пользователь с такой почтой не существует
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с такой почтой уже существует',
      );
    }

    // Создаём заявку
    return await this.prisma.employeeApplication.create({
      data: {
        email: dto.email,
        role: dto.role,
        profileData: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          patronymic: dto.patronymic,
          specialty: dto.specialty,
          experience: dto.experience,
          department: dto.department,
          phone: dto.phone,
        },
        status: 'PENDING',
        createdById: currentUserId,
      },
    });
  }

  // 3. УТВЕРЖДЕНИЕ / ОТКЛОНЕНИЕ ЗАЯВКИ (только для директора)
  async approveApplication(dto: ApproveApplicationDto, currentUserId: number) {
    // Проверяем, что текущий пользователь — директор
    const currentUser = await this.prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser || currentUser.role !== 'DIRECTOR') {
      throw new ForbiddenException('Только директор может утверждать заявки');
    }

    // Находим заявку
    const application = await this.prisma.employeeApplication.findUnique({
      where: { id: dto.applicationId },
    });

    if (!application) {
      throw new NotFoundException('Заявка не найдена');
    }

    if (application.status !== 'PENDING') {
      throw new BadRequestException('Заявка уже обработана');
    }

    if (dto.action === 'REJECT') {
      // Отклоняем заявку
      return await this.prisma.employeeApplication.update({
        where: { id: dto.applicationId },
        data: {
          status: 'REJECTED',
          rejectionReason: dto.rejectionReason || 'Причина не указана',
          reviewedById: currentUserId,
        },
      });
    }

    if (dto.action === 'APPROVE') {
      // Утверждаем заявку — создаём пользователя
      const hashedPassword = await bcrypt.hash('temp123', 10); // временный пароль

      await this.prisma.$transaction(async (prisma) => {
        // Создаём пользователя
        const user = await prisma.user.create({
          data: {
            email: application.email,
            password: hashedPassword,
            role: application.role,
          },
        });

        // Создаём профиль из profileData
        const profileData = application.profileData as any;
        await this.createProfile(prisma, user.id, {
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          patronymic: profileData.patronymic,
          specialty: profileData.specialty,
          experience: profileData.experience,
          department: profileData.department,
          phone: profileData.phone,
          role: application.role,
        });

        // Обновляем статус заявки
        await prisma.employeeApplication.update({
          where: { id: dto.applicationId },
          data: {
            status: 'APPROVED',
            reviewedById: currentUserId,
          },
        });
      });

      return { message: 'Заявка утверждена, сотрудник создан' };
    }
  }

  // Вспомогательный метод для создания профиля
  private async createProfile(prisma: any, userId: number, dto: any) {
    switch (dto.role) {
      case 'TRAINER':
        await prisma.trainer.create({
          data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            patronymic: dto.patronymic,
            specialty: dto.specialty || 'Не указана',
            experience: dto.experience || 0,
            userId,
          },
        });
        break;

      case 'MANAGER':
        await prisma.manager.create({
          data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            patronymic: dto.patronymic,
            department: dto.department || 'Не указан',
            phone: dto.phone || 'Не указан',
            userId,
          },
        });
        break;

      case 'HR':
        await prisma.hr.create({
          data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            patronymic: dto.patronymic,
            phone: dto.phone || 'Не указан',
            userId,
          },
        });
        break;

      case 'DIRECTOR':
        await prisma.director.create({
          data: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            patronymic: dto.patronymic,
            userId,
          },
        });
        break;
    }
  }
  // ПОЛУЧЕНИЕ ВСЕХ ЗАЯВОК ЧЕРЕЗ QUERY ПАРАМЕТР
  async getApplications(
    currentUserId: number,
    currentUserRole: Role,
    status?: string, // <-- добавляем параметр статуса
  ) {
    // 1. Проверяем права
    if (currentUserRole !== 'DIRECTOR' && currentUserRole !== 'HR') {
      throw new ForbiddenException('Нет доступа к заявкам');
    }

    // 2. Базовый фильтр: кто создал (для HR)
    const whereCondition: any = {};

    if (currentUserRole === 'HR') {
      whereCondition.createdById = currentUserId;
    }

    // 3. Фильтр по статусу (если передан)
    if (status) {
      // Приводим статус к верхнему регистру для безопасности
      const validStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'];
      const upperStatus = status.toUpperCase();

      if (validStatuses.includes(upperStatus)) {
        whereCondition.status = upperStatus;
      } else {
        throw new BadRequestException(
          `Некорректный статус. Допустимые: pending, approved, rejected, cancelled`,
        );
      }
    }

    // 4. Получаем заявки
    const applications = await this.prisma.employeeApplication.findMany({
      where: whereCondition,
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
          },
        },
        reviewedBy: {
          select: {
            id: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return applications;
  }
}
