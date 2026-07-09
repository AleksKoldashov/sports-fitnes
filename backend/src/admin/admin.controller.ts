import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { AdminService } from './admin.service';
import { ApproveApplicationDto } from './dto/approve-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('admin')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  // 1. Прямое создание сотрудника (только для директора)
  @Post('employees/direct')
  @Roles(Role.DIRECTOR)
  async createEmployeeDirectly(@Body() dto: CreateEmployeeDto, @Request() req) {
    return this.adminService.createEmployeeDirectly(dto, req.user.id as number);
  }

  // 2. Создание заявки (только для HR)
  @Post('applications')
  @Roles(Role.HR)
  async createApplication(@Body() dto: CreateApplicationDto, @Request() req) {
    return this.adminService.createApplication(dto, req.user.id as number);
  }

  // 3. Утверждение/отклонение заявки (только для директора)
  @Post('applications/approve')
  @Roles(Role.DIRECTOR)
  async approveApplication(@Body() dto: ApproveApplicationDto, @Request() req) {
    return this.adminService.approveApplication(dto, req.user.id as number);
  }

  // 4. Получение всех заявок (директор и HR)
  @Get('applications')
  @Roles(Role.HR, Role.DIRECTOR)
  async getApplications(
    @Request() req,
    @Query('status') status?: string, // <-- query-параметр status
  ) {
    return this.adminService.getApplications(
      req.user.id as number,
      req.user.role as Role,
      status,
    );
  }
}
