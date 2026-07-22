import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { generateUniqueCorporateEmail } from '../common/utils/generate-email';
import { PrismaService } from '../prisma/prisma.service';
import { ApproveApplicationDto } from './dto/approve-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // 1. ПРЯМОЕ СОЗДАНИЕ СОТРУДНИКА (только для директора)
  async createEmployeeDirectly(dto: CreateEmployeeDto, currentUserId: number) {
    // ... проверки прав, существования должности и грейда

    // ✅ Только директор может создавать напрямую
    const currentUser = await this.prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser || currentUser.role !== 'DIRECTOR') {
      throw new ForbiddenException(
        'Только директор может создавать сотрудников напрямую',
      );
    }

    // ✅ Проверяем, что должность существует
    const position = await this.prisma.position.findUnique({
      where: { id: dto.positionId },
    });

    if (!position) {
      throw new NotFoundException('Должность не найдена');
    }

    // ✅ Проверяем, что грейд существует
    const grade = await this.prisma.grade.findUnique({
      where: { id: dto.gradeId },
    });

    if (!grade) {
      throw new NotFoundException('Грейд не найден');
    }

    // Генерируем корпоративную почту
    const corporateEmail = await generateUniqueCorporateEmail(
      dto.firstName,
      dto.lastName,
      async (email: string) => {
        const exists = await this.prisma.user.findUnique({
          where: { email },
        });
        return !!exists;
      },
    );

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Определяем зарплату
    const currentSalary = dto.currentSalary || grade.baseSalary;

    // ✅ Формируем график работы
    let workSchedule: any = { type: dto.scheduleType };

    if (dto.scheduleType === 'FIXED') {
      workSchedule = {
        type: 'FIXED',
        startTime: dto.startTime || '09:00',
        endTime: dto.endTime || '18:00',
      };
    } else if (dto.scheduleType === 'FLEXIBLE') {
      workSchedule = {
        type: 'FLEXIBLE',
        days: dto.workSchedule || {
          monday: { start: '09:00', end: '18:00', isDayOff: false },
          tuesday: { start: '09:00', end: '18:00', isDayOff: false },
          wednesday: { start: '09:00', end: '18:00', isDayOff: false },
          thursday: { start: '09:00', end: '18:00', isDayOff: false },
          friday: { start: '09:00', end: '18:00', isDayOff: false },
          saturday: { start: '00:00', end: '00:00', isDayOff: true },
          sunday: { start: '00:00', end: '00:00', isDayOff: true },
        },
      };
    }

    // Создаём пользователя и сотрудника в транзакции
    const result = await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email: corporateEmail,
          password: hashedPassword,
          role: position.role,
        },
      });

      const employee = await prisma.employee.create({
        data: {
          userId: user.id,
          firstName: dto.firstName,
          lastName: dto.lastName,
          patronymic: dto.patronymic,
          phone: dto.phone,
          positionId: position.id,
          gradeId: grade.id,
          currentSalary,
          corporateEmail,
          hireDate: new Date(),
          isActive: true,
          workSchedule,
        },
      });

      return { user, employee };
    });

    return {
      user: {
        id: result.user.id,
        email: result.user.email,
        role: result.user.role,
      },
      employee: {
        id: result.employee.id,
        firstName: result.employee.firstName,
        lastName: result.employee.lastName,
        patronymic: result.employee.patronymic,
        position: position.name,
        grade: grade.name,
        currentSalary: result.employee.currentSalary,
        corporateEmail: result.employee.corporateEmail,
        hireDate: result.employee.hireDate,
        workSchedule: result.employee.workSchedule,
      },
    };
  }

  // 2. СОЗДАНИЕ ЗАЯВКИ (только для HR)
  async createApplication(dto: CreateApplicationDto, currentUserId: number) {
    const currentUser = await this.prisma.user.findUnique({
      where: { id: currentUserId },
    });

    if (!currentUser || currentUser.role !== 'HR') {
      throw new ForbiddenException('Только HR может создавать заявки');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Пользователь с такой почтой уже существует',
      );
    }

    // ✅ Проверяем, что должность существует
    const position = await this.prisma.position.findUnique({
      where: { id: dto.positionId },
    });

    if (!position) {
      throw new NotFoundException('Должность не найдена');
    }

    // ✅ Проверяем, что грейд существует
    const grade = await this.prisma.grade.findUnique({
      where: { id: dto.gradeId },
    });

    if (!grade) {
      throw new NotFoundException('Грейд не найден');
    }

    // ✅ Проверяем, что роль из должности совпадает с ролью, которую выбрал HR
    if (position.role !== dto.role) {
      throw new BadRequestException(
        `Роль "${dto.role}" не соответствует должности "${position.name}" (ожидается "${position.role}")`,
      );
    }

    // Создаём заявку с новыми полями
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
          positionId: dto.positionId, // <-- сохраняем в JSON
          gradeId: dto.gradeId, // <-- сохраняем в JSON
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
    status?: string,
    limit?: number,
    offset?: number,
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

    // 4. Запрос с пагинацией (по умолчанию limit = 10, offset = 0)
    const take = limit || 10;
    const skip = offset || 0;

    // Получаем заявки с учётом пагинации
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
      take: take,
      skip: skip,
    });

    // Получаем общее количество заявок (для пагинации на фронте)
    const totalCount = await this.prisma.employeeApplication.count({
      where: whereCondition,
    });

    return {
      data: applications,
      pagination: {
        total: totalCount,
        limit: take,
        offset: skip,
        hasMore: skip + take < totalCount,
      },
    };
  }

  async getEmployees(
    currentUserRole?: Role,
    limit?: number,
    offset?: number,
    roleFilter?: string,
  ) {
    if (currentUserRole !== 'DIRECTOR' && currentUserRole !== 'HR') {
      throw new ForbiddenException('Нет доступа к списку сотрудников');
    }

    const take = limit || 1000;
    const skip = offset || 0;

    console.log('take', take);

    const whereCondition: any = {
      role: { not: 'CLUB_MEMBER' },
    };

    if (roleFilter) {
      const validRoles = ['TRAINER', 'HR', 'MANAGER', 'DIRECTOR'];
      const upperRole = roleFilter.toUpperCase();

      if (!validRoles.includes(upperRole)) {
        throw new BadRequestException(
          'Некорректная роль. Допустимые: TRAINER, HR, MANAGER, DIRECTOR',
        );
      }

      whereCondition.role = upperRole;
    }

    // ✅ Подгружаем Employee (с position и grade)
    const employees = await this.prisma.user.findMany({
      where: whereCondition,
      include: {
        employee: {
          include: {
            position: true,
            grade: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take,
      skip,
    });

    const totalCount = await this.prisma.user.count({
      where: whereCondition,
    });

    // ✅ Формируем ответ
    return {
      data: employees.map((user) => {
        const profile: any = {};

        if (user.employee) {
          const emp = user.employee;

          // 🟢 Все данные из Employee
          profile.firstName = emp.firstName;
          profile.lastName = emp.lastName;
          profile.patronymic = emp.patronymic;
          profile.phone = emp.phone;
          profile.vk = emp.vk;
          profile.telegram = emp.telegram;

          profile.corporateEmail = emp.corporateEmail;
          profile.position = emp.position?.name;
          profile.grade = emp.grade?.name;
          profile.currentSalary = emp.currentSalary;
          profile.hireDate = emp.hireDate;
          profile.isActive = emp.isActive;
          profile.workSchedule = emp.workSchedule;
          profile.avatarUrl = emp.avatarUrl;
          profile.employeeId = emp.id;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          profile,
        };
      }),
      pagination: {
        total: totalCount,
        limit: take,
        offset: skip,
        hasMore: skip + take < totalCount,
      },
    };
  }
}
