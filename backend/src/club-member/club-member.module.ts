import { Module } from '@nestjs/common';
import { ClubMemberService } from './club-member.service';
import { ClubMemberController } from './club-member.controller';

@Module({
  providers: [ClubMemberService],
  controllers: [ClubMemberController]
})
export class ClubMemberModule {}
