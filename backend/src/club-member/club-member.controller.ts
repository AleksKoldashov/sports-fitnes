import { Body, Controller, Get, Post } from '@nestjs/common';
import { ClubMemberService } from './club-member.service';
import { CreateClubMemberDto } from './dto/create-club_member.dto';

@Controller('club-member')
export class ClubMemberController {
  constructor(private ClubMemberService: ClubMemberService) {}

  @Get()
  async findAll() {
    return await this.ClubMemberService.findAll();
  }

  @Post()
  async create(@Body() createPostsDto: CreateClubMemberDto) {
    return await this.ClubMemberService.create(createPostsDto);
  }
}
