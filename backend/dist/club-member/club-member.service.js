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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClubMemberService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const create_club_member_dto_1 = require("./dto/create-club_member.dto");
let ClubMemberService = class ClubMemberService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(CreateClubMemberDto) {
        return await this.prisma.clubMember.create({
            data: CreateClubMemberDto,
        });
    }
    async findAll() {
        return await this.prisma.clubMember.findMany();
    }
    async findOne(id) {
        const clubMember = await this.prisma.clubMember.findUnique({
            where: { id },
        });
        if (!clubMember) {
            throw new common_1.NotFoundException(`Пост с ID ${id} не найден`);
        }
        return clubMember;
    }
    async remove(id) {
        await this.findOne(id);
        return await this.prisma.clubMember.delete({
            where: { id },
        });
    }
    async update(id, updateClubMemberDto) {
        await this.findOne(id);
        return await this.prisma.clubMember.update({
            where: { id },
            data: updateClubMemberDto,
        });
    }
};
exports.ClubMemberService = ClubMemberService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_club_member_dto_1.CreateClubMemberDto]),
    __metadata("design:returntype", Promise)
], ClubMemberService.prototype, "create", null);
exports.ClubMemberService = ClubMemberService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClubMemberService);
//# sourceMappingURL=club-member.service.js.map