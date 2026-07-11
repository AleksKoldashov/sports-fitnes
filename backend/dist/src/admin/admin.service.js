"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
let AdminService = class AdminService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createEmployeeDirectly(dto, currentUserId) {
        const currentUser = await this.prisma.user.findUnique({
            where: { id: currentUserId },
        });
        if (!currentUser || currentUser.role !== 'DIRECTOR') {
            throw new common_1.ForbiddenException('Только директор может создавать сотрудников напрямую');
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Пользователь с такой почтой уже существует');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return await this.prisma.$transaction(async (prisma) => {
            const user = await prisma.user.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    role: dto.role,
                },
            });
            await this.createProfile(prisma, user.id, dto);
            return {
                id: user.id,
                email: user.email,
                role: user.role,
            };
        });
    }
    async createApplication(dto, currentUserId) {
        const currentUser = await this.prisma.user.findUnique({
            where: { id: currentUserId },
        });
        if (!currentUser || currentUser.role !== 'HR') {
            throw new common_1.ForbiddenException('Только HR может создавать заявки');
        }
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Пользователь с такой почтой уже существует');
        }
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
    async approveApplication(dto, currentUserId) {
        const currentUser = await this.prisma.user.findUnique({
            where: { id: currentUserId },
        });
        if (!currentUser || currentUser.role !== 'DIRECTOR') {
            throw new common_1.ForbiddenException('Только директор может утверждать заявки');
        }
        const application = await this.prisma.employeeApplication.findUnique({
            where: { id: dto.applicationId },
        });
        if (!application) {
            throw new common_1.NotFoundException('Заявка не найдена');
        }
        if (application.status !== 'PENDING') {
            throw new common_1.BadRequestException('Заявка уже обработана');
        }
        if (dto.action === 'REJECT') {
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
            const hashedPassword = await bcrypt.hash('temp123', 10);
            await this.prisma.$transaction(async (prisma) => {
                const user = await prisma.user.create({
                    data: {
                        email: application.email,
                        password: hashedPassword,
                        role: application.role,
                    },
                });
                const profileData = application.profileData;
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
    async createProfile(prisma, userId, dto) {
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
    async getApplications(currentUserId, currentUserRole, status, limit, offset) {
        if (currentUserRole !== 'DIRECTOR' && currentUserRole !== 'HR') {
            throw new common_1.ForbiddenException('Нет доступа к заявкам');
        }
        const whereCondition = {};
        if (currentUserRole === 'HR') {
            whereCondition.createdById = currentUserId;
        }
        if (status) {
            const validStatuses = ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'];
            const upperStatus = status.toUpperCase();
            if (validStatuses.includes(upperStatus)) {
                whereCondition.status = upperStatus;
            }
            else {
                throw new common_1.BadRequestException(`Некорректный статус. Допустимые: pending, approved, rejected, cancelled`);
            }
        }
        const take = limit || 10;
        const skip = offset || 0;
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
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map