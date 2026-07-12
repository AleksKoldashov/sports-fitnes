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
exports.ClubMemberService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClubMemberService = class ClubMemberService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
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
            throw new common_1.NotFoundException('Профиль не найден');
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
    async updateProfile(currentUserId, currentUserRole, dto) {
        let targetUserId = currentUserId;
        if (dto.userId &&
            (currentUserRole === 'TRAINER' ||
                currentUserRole === 'HR' ||
                currentUserRole === 'DIRECTOR')) {
            targetUserId = dto.userId;
        }
        if (dto.userId && currentUserRole === 'CLUB_MEMBER') {
            throw new common_1.ForbiddenException('Вы не можете изменять профиль другого пользователя');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: targetUserId },
            include: { clubMember: true },
        });
        if (!user || !user.clubMember) {
            throw new common_1.NotFoundException('Профиль не найден');
        }
        const { userId, fitnessLevel, nutritionPlan, ...userEditableFields } = dto;
        const updateData = { ...userEditableFields };
        if (currentUserRole === 'CLUB_MEMBER') {
            if (fitnessLevel || nutritionPlan) {
                throw new common_1.ForbiddenException('Только тренер может изменять уровень подготовки и план питания');
            }
        }
        if (currentUserRole === 'TRAINER' ||
            currentUserRole === 'HR' ||
            currentUserRole === 'DIRECTOR') {
            if (currentUserRole === 'TRAINER') {
                const trainer = await this.prisma.trainer.findUnique({
                    where: { userId: currentUserId },
                    select: { id: true },
                });
                console.log('currentUserId:', currentUserId);
                console.log('Найденный trainer.id:', trainer?.id);
                console.log('ClubMember.trainerId:', user.clubMember.trainerId);
                if (!trainer) {
                    throw new common_1.NotFoundException('Тренер не найден');
                }
                if (user.clubMember.trainerId !== trainer.id) {
                    throw new common_1.ForbiddenException(`Вы можете изменять профиль только закреплённых за вами участников. Ваш trainer.id: ${trainer.id}, а у участника trainerId: ${user.clubMember.trainerId}`);
                }
            }
            if (fitnessLevel)
                updateData.fitnessLevel = fitnessLevel;
            if (nutritionPlan)
                updateData.nutritionPlan = nutritionPlan;
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
    async assignTrainer(trainerUserId, clubMemberId) {
        const trainer = await this.prisma.trainer.findUnique({
            where: { userId: trainerUserId },
        });
        console.log('Найденный trainer:', trainer);
        if (!trainer) {
            throw new common_1.NotFoundException('Тренер не найден');
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
    async getMyClubMembers(trainerUserId) {
        const trainer = await this.prisma.trainer.findUnique({
            where: { userId: trainerUserId },
            select: { id: true },
        });
        if (!trainer) {
            throw new common_1.NotFoundException('Тренер не найден');
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
    async getAllMembers(query, currentUserRole) {
        if (currentUserRole !== 'HR' && currentUserRole !== 'DIRECTOR') {
            throw new common_1.ForbiddenException('Нет доступа к списку всех участников');
        }
        const whereCondition = {};
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
        const take = Number(query.limit) || 10;
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
    async getMemberById(memberId, currentUserId, currentUserRole) {
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
            throw new common_1.NotFoundException('Участник не найден');
        }
        if (currentUserRole === 'CLUB_MEMBER' && member.userId !== currentUserId) {
            throw new common_1.ForbiddenException('Нет доступа к этому профилю');
        }
        if (currentUserRole === 'TRAINER') {
            const trainer = await this.prisma.trainer.findUnique({
                where: { userId: currentUserId },
                select: { id: true },
            });
            if (!trainer || member.trainerId !== trainer.id) {
                throw new common_1.ForbiddenException('Вы можете просматривать только закреплённых за вами участников');
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
    async removeTrainer(clubMemberId, currentUserId, currentUserRole) {
        const member = await this.prisma.clubMember.findUnique({
            where: { id: clubMemberId },
            include: {
                trainer: true,
            },
        });
        if (!member) {
            throw new common_1.NotFoundException('Участник не найден');
        }
        if (!member.trainerId) {
            throw new common_1.BadRequestException('У этого участника нет тренера');
        }
        if (currentUserRole === 'TRAINER') {
            const trainer = await this.prisma.trainer.findUnique({
                where: { userId: currentUserId },
                select: { id: true },
            });
            if (!trainer || member.trainerId !== trainer.id) {
                throw new common_1.ForbiddenException('Вы можете откреплять только своих участников');
            }
        }
        if (currentUserRole === 'CLUB_MEMBER') {
            throw new common_1.ForbiddenException('Участник не может откреплять тренера');
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
    async getMemberStats(memberId, currentUserId, currentUserRole) {
        const member = await this.prisma.clubMember.findUnique({
            where: { id: memberId },
        });
        if (!member) {
            throw new common_1.NotFoundException('Участник не найден');
        }
        if (currentUserRole === 'CLUB_MEMBER' && member.userId !== currentUserId) {
            throw new common_1.ForbiddenException('Нет доступа к статистике этого участника');
        }
        if (currentUserRole === 'TRAINER') {
            const trainer = await this.prisma.trainer.findUnique({
                where: { userId: currentUserId },
                select: { id: true },
            });
            if (!trainer || member.trainerId !== trainer.id) {
                throw new common_1.ForbiddenException('Вы можете просматривать статистику только своих участников');
            }
        }
        const [totalEvents, completedEvents, attendanceStats] = await Promise.all([
            this.prisma.eventParticipant.count({
                where: {
                    clubMemberId: memberId,
                },
            }),
            this.prisma.eventParticipant.count({
                where: {
                    clubMemberId: memberId,
                    event: {
                        status: 'COMPLETED',
                    },
                },
            }),
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
        const attendanceMap = {
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
        const markedCount = attendanceMap.PRESENT + attendanceMap.ABSENT + attendanceMap.LATE;
        const attendanceRate = markedCount > 0
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
    async updateMembership(memberId, dto, currentUserRole) {
        if (currentUserRole !== 'HR' && currentUserRole !== 'DIRECTOR') {
            throw new common_1.ForbiddenException('Только HR или директор могут изменять статус абонемента');
        }
        const member = await this.prisma.clubMember.findUnique({
            where: { id: memberId },
        });
        if (!member) {
            throw new common_1.NotFoundException('Участник не найден');
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
    async getMemberEvents(memberId, currentUserId, currentUserRole, query) {
        const member = await this.prisma.clubMember.findUnique({
            where: { id: memberId },
        });
        if (!member) {
            throw new common_1.NotFoundException('Участник не найден');
        }
        if (currentUserRole === 'CLUB_MEMBER' && member.userId !== currentUserId) {
            throw new common_1.ForbiddenException('Нет доступа к тренировкам этого участника');
        }
        if (currentUserRole === 'TRAINER') {
            const trainer = await this.prisma.trainer.findUnique({
                where: { userId: currentUserId },
                select: { id: true },
            });
            if (!trainer || member.trainerId !== trainer.id) {
                throw new common_1.ForbiddenException('Вы можете просматривать тренировки только своих участников');
            }
        }
        const whereCondition = {
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
};
exports.ClubMemberService = ClubMemberService;
exports.ClubMemberService = ClubMemberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClubMemberService);
//# sourceMappingURL=club-member.service.js.map