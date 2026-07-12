import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
import { ClubMemberService } from './club-member.service';
import { GetMemberEventsQueryDto } from './dto/get-member-events-query.dto';
import { GetMembersQueryDto } from './dto/get-members-query.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Controller('club-member')
@UseGuards(AuthGuard('jwt'))
export class ClubMemberController {
  constructor(private clubMemberService: ClubMemberService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.clubMemberService.getProfile(req.user.id as number);
  }

  @Patch('profile')
  async updateProfile(@Request() req, @Body() dto: UpdateProfileDto) {
    return this.clubMemberService.updateProfile(
      req.user.id,
      req.user.role, // <-- передаём роль
      dto,
    );
  }

  @Post(':id/assign-trainer')
  @Roles(Role.TRAINER, Role.HR, Role.DIRECTOR)
  async assignTrainer(@Request() req, @Param('id') clubMemberId: string) {
    return this.clubMemberService.assignTrainer(req.user.id, +clubMemberId);
  }

  @Get('my-members')
  @Roles(Role.TRAINER)
  async getMyClubMembers(@Request() req) {
    return this.clubMemberService.getMyClubMembers(req.user.id);
  }

  @Get('all')
  @Roles(Role.HR, Role.DIRECTOR)
  async getAllMembers(@Request() req, @Query() query: GetMembersQueryDto) {
    return this.clubMemberService.getAllMembers(
      {
        search: query.search,
        fitnessLevel: query.fitnessLevel,
        membershipStatus: query.membershipStatus,
        limit: query.limit,
        offset: query.offset,
      },
      req.user.role,
    );
  }

  @Get(':id')
  async getMemberById(@Request() req, @Param('id') id: string) {
    return this.clubMemberService.getMemberById(
      +id,
      req.user.id,
      req.user.role,
    );
  }

  @Delete(':id/remove-trainer')
  @Roles(Role.TRAINER, Role.HR, Role.DIRECTOR)
  async removeTrainer(@Request() req, @Param('id') clubMemberId: string) {
    return this.clubMemberService.removeTrainer(
      +clubMemberId,
      req.user.id,
      req.user.role,
    );
  }

  @Get(':id/stats')
  @Roles(Role.CLUB_MEMBER, Role.TRAINER, Role.HR, Role.DIRECTOR)
  async getMemberStats(@Request() req, @Param('id') id: string) {
    return this.clubMemberService.getMemberStats(
      +id,
      req.user.id,
      req.user.role,
    );
  }

  @Patch(':id/membership')
  @Roles(Role.HR, Role.DIRECTOR)
  async updateMembership(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateMembershipDto,
  ) {
    return this.clubMemberService.updateMembership(
      +id,
      dto,
      req.user.role, // <-- передаём роль из токена
    );
  }

  @Get(':id/events')
  @Roles(Role.CLUB_MEMBER, Role.TRAINER, Role.HR, Role.DIRECTOR)
  async getMemberEvents(
    @Request() req,
    @Param('id') id: string,
    @Query() query: GetMemberEventsQueryDto,
  ) {
    return this.clubMemberService.getMemberEvents(
      +id,
      req.user.id,
      req.user.role,
      {
        status: query.status,
        limit: query.limit,
        offset: query.offset,
      },
    );
  }
}
