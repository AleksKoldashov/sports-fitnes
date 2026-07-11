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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const client_1 = require("@prisma/client");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const roles_guard_1 = require("../auth/guards/roles.guard");
const admin_service_1 = require("./admin.service");
const approve_application_dto_1 = require("./dto/approve-application.dto");
const create_application_dto_1 = require("./dto/create-application.dto");
const create_employee_dto_1 = require("./dto/create-employee.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async createEmployeeDirectly(dto, req) {
        return this.adminService.createEmployeeDirectly(dto, req.user.id);
    }
    async createApplication(dto, req) {
        return this.adminService.createApplication(dto, req.user.id);
    }
    async approveApplication(dto, req) {
        return this.adminService.approveApplication(dto, req.user.id);
    }
    async getApplications(req, status, limit, offset) {
        const limitNumber = limit ? parseInt(limit, 10) : 10;
        const offsetNumber = offset ? parseInt(offset, 10) : 0;
        return this.adminService.getApplications(req.user.id, req.user.role, status, limitNumber, offsetNumber);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('employees/direct'),
    (0, roles_decorator_1.Roles)(client_1.Role.DIRECTOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_employee_dto_1.CreateEmployeeDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createEmployeeDirectly", null);
__decorate([
    (0, common_1.Post)('applications'),
    (0, roles_decorator_1.Roles)(client_1.Role.HR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_application_dto_1.CreateApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createApplication", null);
__decorate([
    (0, common_1.Post)('applications/approve'),
    (0, roles_decorator_1.Roles)(client_1.Role.DIRECTOR),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [approve_application_dto_1.ApproveApplicationDto, Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveApplication", null);
__decorate([
    (0, common_1.Get)('applications'),
    (0, roles_decorator_1.Roles)(client_1.Role.HR, client_1.Role.DIRECTOR),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('offset')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getApplications", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map