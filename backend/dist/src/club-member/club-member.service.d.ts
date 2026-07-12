import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ClubMemberService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: number): Promise<{
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        firstName: string;
        lastName: string;
        patronymic: string;
        age: number;
        phone: string;
        vk: string;
        telegram: string;
        fitnessLevel: import(".prisma/client").$Enums.FitnessLevel;
        nutritionPlan: string;
        membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
        membershipExpiresAt: Date;
        trainerId: number;
        trainerName: string;
    }>;
    updateProfile(currentUserId: number, currentUserRole: Role, dto: UpdateProfileDto): Promise<{
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        firstName: string;
        lastName: string;
        patronymic: string;
        age: number;
        phone: string;
        vk: string;
        telegram: string;
        fitnessLevel: import(".prisma/client").$Enums.FitnessLevel;
        nutritionPlan: string;
        membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
        membershipExpiresAt: Date;
        trainerId: number;
    }>;
    assignTrainer(trainerUserId: number, clubMemberId: number): Promise<{
        message: string;
        clubMemberId: number;
        trainerId: number;
    }>;
    getMyClubMembers(trainerUserId: number): Promise<{
        id: number;
        userId: number;
        email: string;
        firstName: string;
        lastName: string;
        patronymic: string;
        age: number;
        phone: string;
        fitnessLevel: import(".prisma/client").$Enums.FitnessLevel;
        nutritionPlan: string;
        membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
    }[]>;
    getAllMembers(query: {
        search?: string;
        fitnessLevel?: string;
        membershipStatus?: string;
        limit: number;
        offset: number;
    }, currentUserRole: Role): Promise<{
        data: {
            id: number;
            userId: number;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            firstName: string;
            lastName: string;
            patronymic: string;
            age: number;
            phone: string;
            vk: string;
            telegram: string;
            fitnessLevel: import(".prisma/client").$Enums.FitnessLevel;
            nutritionPlan: string;
            membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
            membershipExpiresAt: Date;
            trainerId: number;
            trainerName: string;
        }[];
        pagination: {
            total: number;
            limit: number;
            offset: number;
            hasMore: boolean;
        };
    }>;
    getMemberById(memberId: number, currentUserId: number, currentUserRole: Role): Promise<{
        id: number;
        userId: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        firstName: string;
        lastName: string;
        patronymic: string;
        age: number;
        phone: string;
        vk: string;
        telegram: string;
        fitnessLevel: import(".prisma/client").$Enums.FitnessLevel;
        nutritionPlan: string;
        membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
        membershipExpiresAt: Date;
        createdAt: Date;
        updatedAt: Date;
        trainerId: number;
        trainerName: string;
        trainerSpecialty: string;
    }>;
    removeTrainer(clubMemberId: number, currentUserId: number, currentUserRole: Role): Promise<{
        message: string;
        clubMemberId: number;
        trainerId: number;
    }>;
    getMemberStats(memberId: number, currentUserId: number, currentUserRole: Role): Promise<{
        memberId: number;
        name: string;
        statistics: {
            totalTrainings: number;
            completedTrainings: number;
            attendance: {
                present: number;
                absent: number;
                late: number;
                notMarked: number;
                attendanceRate: string;
            };
        };
    }>;
    updateMembership(memberId: number, dto: UpdateMembershipDto, currentUserRole: Role): Promise<{
        message: string;
        clubMemberId: number;
        membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
        membershipExpiresAt: Date;
    }>;
    getMemberEvents(memberId: number, currentUserId: number, currentUserRole: Role, query: {
        status?: string;
        limit: number;
        offset: number;
    }): Promise<{
        data: {
            id: number;
            eventId: number;
            title: string;
            description: string;
            type: import(".prisma/client").$Enums.EventType;
            startTime: Date;
            endTime: Date;
            location: string;
            status: import(".prisma/client").$Enums.ParticipantStatus;
            attendance: import(".prisma/client").$Enums.AttendanceStatus;
            confirmedAt: Date;
            trainerId: number;
            trainerName: string;
            trainerSpecialty: string;
            createdAt: Date;
        }[];
        pagination: {
            total: number;
            limit: number;
            offset: number;
            hasMore: boolean;
        };
    }>;
}
