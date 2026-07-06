import { PrismaService } from '../prisma/prisma.service';
import { CreateClubMemberDto } from './dto/create-club_member.dto';
import { UpdateClubMemberDto } from './dto/update.club_member.dto';
export declare class ClubMemberService {
    private prisma;
    constructor(prisma: PrismaService);
    create(CreateClubMemberDto: CreateClubMemberDto): Promise<{
        name: string;
        age: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    findAll(): Promise<{
        name: string;
        age: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }[]>;
    findOne(id: number): Promise<{
        name: string;
        age: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    remove(id: number): Promise<{
        name: string;
        age: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
    update(id: number, updateClubMemberDto: UpdateClubMemberDto): Promise<{
        name: string;
        age: string;
        createdAt: Date;
        updatedAt: Date;
        id: number;
    }>;
}
