import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ClubMemberService } from './club-member.service';

@Controller('club-member')
@UseGuards(AuthGuard('jwt'))
export class ClubMemberController {
  constructor(private clubMemberService: ClubMemberService) {}

  @Get('profile')
  async getProfile(@Request() req) {
    return this.clubMemberService.getProfile(req.user.id as number);
  }
}
