import { PrismaService } from '../prisma/prisma.service';
import { CreatePostsDto } from './dto/create-posts.dto';
import { UpdatePostsDto } from './dto/update.posts.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(CreatePostsDto: CreatePostsDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        body: string;
        title: string;
    }>;
    findAll(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        body: string;
        title: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        body: string;
        title: string;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        body: string;
        title: string;
    }>;
    update(id: number, updatePostsDto: UpdatePostsDto): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        body: string;
        title: string;
    }>;
}
