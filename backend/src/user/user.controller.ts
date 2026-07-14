import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard('jwt'), RolesGuard) // <-- добавляем оба гарда
export class UserController {
  constructor(private user: UserService) {}

  @Get('profile')
  async getUser(@Request() req) {
    return this.user.getUser(req.user.id);
  }

  @Get('admin-only')
  @Roles(Role.HR, Role.DIRECTOR) // <-- только для HR и DIRECTOR
  adminOnly() {
    return { message: 'Только для администрации' };
  }

  // @Get('admin')
  // @Roles(Role.HR, Role.DIRECTOR) // <-- только для HR и DIRECTOR
  // async getUser(@Request() req) {
  //   return this.user.getUser(req.user.id);
  // }
}
