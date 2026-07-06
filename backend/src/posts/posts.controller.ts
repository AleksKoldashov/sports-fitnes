import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostsDto } from './dto/create-posts.dto';
import { PostsService } from './posts.service';
import { UpdatePostsDto } from './dto/update.posts.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async create(@Body() createPostsDto: CreatePostsDto) {
    return await this.postsService.create(createPostsDto);
  }
  @Get()
  async findAll() {
    return await this.postsService.findAll();
  }
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.postsService.findOne(+id);
  }
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.postsService.remove(+id);
  }
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePostsDto: UpdatePostsDto,
  ) {
    return this.postsService.update(+id, updatePostsDto);
  }
}
