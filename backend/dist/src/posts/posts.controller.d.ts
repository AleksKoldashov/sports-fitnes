import { CreatePostsDto } from './dto/create-posts.dto';
import { PostsService } from './posts.service';
import { UpdatePostsDto } from './dto/update.posts.dto';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    create(createPostsDto: CreatePostsDto): Promise<{
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
