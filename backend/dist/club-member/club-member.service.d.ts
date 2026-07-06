import { PrismaService } from '../prisma/prisma.service';
import { CreateClubMemberDto } from './dto/create-club_member.dto';
export declare class ClubMemberService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: number;
        name: string;
        age: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(CreateClubMemberDto: CreateClubMemberDto): Promise<{
        id: number;
        name: string;
        age: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
