import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard) // <-- добавляем оба гарда
export class UserController {
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('admin-only')
  @Roles(Role.HR, Role.DIRECTOR) // <-- только для HR и DIRECTOR
  adminOnly() {
    return { message: 'Только для администрации' };
  }
}
