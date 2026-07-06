import { CreatePostsDto } from './dto/create-posts.dto';
import { PostsService } from './posts.service';
import { UpdatePostsDto } from './dto/update.posts.dto';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    create(createPostsDto: CreatePostsDto): Promise<{
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
