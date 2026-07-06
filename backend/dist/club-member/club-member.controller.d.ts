import { ClubMemberService } from './club-member.service';
import { CreateClubMemberDto } from './dto/create-club_member.dto';
export declare class ClubMemberController {
    private ClubMemberService;
    constructor(ClubMemberService: ClubMemberService);
    findAll(): Promise<{
        id: number;
        name: string;
        age: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(createPostsDto: CreateClubMemberDto): Promise<{
        id: number;
        name: string;
        age: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
