import { PrismaService } from '../prisma/prisma.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update.posts.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(CreatePostsDto: CreatePostsDto): Promise<{
        createdAt: Date;
        id: number;
        body: string;
        title: string;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        createdAt: Date;
        id: number;
        body: string;
        title: string;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        createdAt: Date;
        id: number;
        body: string;
        title: string;
        updatedAt: Date;
    }>;
    remove(id: number): Promise<{
        createdAt: Date;
        id: number;
        body: string;
        title: string;
        updatedAt: Date;
    }>;
    update(id: number, updatePostsDto: UpdatePostsDto): Promise<{
        createdAt: Date;
        id: number;
        body: string;
        title: string;
        updatedAt: Date;
    }>;
}
