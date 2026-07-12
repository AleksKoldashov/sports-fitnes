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
exports.ClubMemberController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const club_member_service_1 = require("./club-member.service");
const get_member_events_query_dto_1 = require("./dto/get-member-events-query.dto");
const get_members_query_dto_1 = require("./dto/get-members-query.dto");
const update_membership_dto_1 = require("./dto/update-membership.dto");
const update_profile_dto_1 = require("./dto/update-profile.dto");
let ClubMemberController = class ClubMemberController {
    constructor(clubMemberService) {
        this.clubMemberService = clubMemberService;
    }
    async getProfile(req) {
        return this.clubMemberService.getProfile(req.user.id);
    }
    async updateProfile(req, dto) {
        return this.clubMemberService.updateProfile(req.user.id, req.user.role, dto);
    }
    async assignTrainer(req, clubMemberId) {
        return this.clubMemberService.assignTrainer(req.user.id, +clubMemberId);
    }
    async getMyClubMembers(req) {
        return this.clubMemberService.getMyClubMembers(req.user.id);
    }
    async getAllMembers(req, query) {
        return this.clubMemberService.getAllMembers({
            search: query.search,
            fitnessLevel: query.fitnessLevel,
            membershipStatus: query.membershipStatus,
            limit: query.limit,
            offset: query.offset,
        }, req.user.role);
    }
    async getMemberById(req, id) {
        return this.clubMemberService.getMemberById(+id, req.user.id, req.user.role);
    }
    async removeTrainer(req, clubMemberId) {
        return this.clubMemberService.removeTrainer(+clubMemberId, req.user.id, req.user.role);
    }
    async getMemberStats(req, id) {
        return this.clubMemberService.getMemberStats(+id, req.user.id, req.user.role);
    }
    async updateMembership(req, id, dto) {
        return this.clubMemberService.updateMembership(+id, dto, req.user.role);
    }
    async getMemberEvents(req, id, query) {
        return this.clubMemberService.getMemberEvents(+id, req.user.id, req.user.role, {
            status: query.status,
            limit: query.limit,
            offset: query.offset,
        });
    }
};
exports.ClubMemberController = ClubMemberController;
__decorate([
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Patch)('profile'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_profile_dto_1.UpdateProfileDto]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Post)(':id/assign-trainer'),
    (0, roles_decorator_1.Roles)(client_1.Role.TRAINER, client_1.Role.HR, client_1.Role.DIRECTOR),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "assignTrainer", null);
__decorate([
    (0, common_1.Get)('my-members'),
    (0, roles_decorator_1.Roles)(client_1.Role.TRAINER),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "getMyClubMembers", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, roles_decorator_1.Roles)(client_1.Role.HR, client_1.Role.DIRECTOR),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_members_query_dto_1.GetMembersQueryDto]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "getAllMembers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "getMemberById", null);
__decorate([
    (0, common_1.Delete)(':id/remove-trainer'),
    (0, roles_decorator_1.Roles)(client_1.Role.TRAINER, client_1.Role.HR, client_1.Role.DIRECTOR),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "removeTrainer", null);
__decorate([
    (0, common_1.Get)(':id/stats'),
    (0, roles_decorator_1.Roles)(client_1.Role.CLUB_MEMBER, client_1.Role.TRAINER, client_1.Role.HR, client_1.Role.DIRECTOR),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "getMemberStats", null);
__decorate([
    (0, common_1.Patch)(':id/membership'),
    (0, roles_decorator_1.Roles)(client_1.Role.HR, client_1.Role.DIRECTOR),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_membership_dto_1.UpdateMembershipDto]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "updateMembership", null);
__decorate([
    (0, common_1.Get)(':id/events'),
    (0, roles_decorator_1.Roles)(client_1.Role.CLUB_MEMBER, client_1.Role.TRAINER, client_1.Role.HR, client_1.Role.DIRECTOR),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, get_member_events_query_dto_1.GetMemberEventsQueryDto]),
    __metadata("design:returntype", Promise)
], ClubMemberController.prototype, "getMemberEvents", null);
exports.ClubMemberController = ClubMemberController = __decorate([
    (0, common_1.Controller)('club-member'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __metadata("design:paramtypes", [club_member_service_1.ClubMemberService])
], ClubMemberController);
//# sourceMappingURL=club-member.controller.js.map