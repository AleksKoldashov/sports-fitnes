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
};
exports.ClubMemberService = ClubMemberService;
exports.ClubMemberService = ClubMemberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClubMemberService);
//# sourceMappingURL=club-member.service.js.map