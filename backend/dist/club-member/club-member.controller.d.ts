import { ClubMemberService } from './club-member.service';
import { CreateClubMemberDto } from './dto/create-club_member.dto';
import { UpdateClubMemberDto } from './dto/update.club_member.dto';
export declare class ClubMemberController {
    private ClubMemberService;
    constructor(ClubMemberService: ClubMemberService);
    create(createPostsDto: CreateClubMemberDto): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        updatedAt: Date;
        age: string;
    }>;
    findAll(): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        updatedAt: Date;
        age: string;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        updatedAt: Date;
        age: string;
    }>;
    remove(id: number): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        updatedAt: Date;
        age: string;
    }>;
    update(id: number, updatePostsDto: UpdateClubMemberDto): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        updatedAt: Date;
        age: string;
    }>;
}
