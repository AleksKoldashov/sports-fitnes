import { PrismaService } from '../prisma/prisma.service';
import { CreateClubMemberDto } from './dto/create-club_member.dto';
import { UpdateClubMemberDto } from './dto/update.club_member.dto';
export declare class ClubMemberService {
    private prisma;
    constructor(prisma: PrismaService);
    create(CreateClubMemberDto: CreateClubMemberDto): Promise<{
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
    update(id: number, updateClubMemberDto: UpdateClubMemberDto): Promise<{
        name: string;
        createdAt: Date;
        id: number;
        updatedAt: Date;
        age: string;
    }>;
}
