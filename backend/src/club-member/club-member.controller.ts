import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClubMemberService } from './club-member.service';
import { CreateClubMemberDto } from './dto/create-club_member.dto';
import { UpdateClubMemberDto } from './dto/update.club_member.dto';

@Controller('club-member')
export class ClubMemberController {
  constructor(private ClubMemberService: ClubMemberService) {}

  @Post()
  async create(@Body() createPostsDto: CreateClubMemberDto) {
    return await this.ClubMemberService.create(createPostsDto);
  }

  @Get()
  async findAll() {
    return await this.ClubMemberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.ClubMemberService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.ClubMemberService.remove(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostsDto: UpdateClubMemberDto,
  ) {
    return this.ClubMemberService.update(+id, updatePostsDto);
  }
}
