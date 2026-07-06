import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update.posts.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(CreatePostsDto: CreatePostsDto) {
    return await this.prisma.posts.create({
      data: CreatePostsDto,
    });
  }

  async findAll() {
    return await this.prisma.posts.findMany();
  }

  async findOne(id: number) {
    const post = await this.prisma.posts.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException(`Пост с ID ${id} не найден`);
    }

    return post;
  }

  async remove(id: number) {
    await this.findOne(id);

    return await this.prisma.posts.delete({
      where: { id },
    });
  }

  async update(id: number, updatePostsDto: UpdatePostsDto) {
    await this.findOne(id); // проверяем есть ли такой id

    return await this.prisma.posts.update({
      where: { id },
      data: updatePostsDto,
    });
  }
}
