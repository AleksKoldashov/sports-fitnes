import { ClubMemberService } from './club-member.service';
import { GetMemberEventsQueryDto } from './dto/get-member-events-query.dto';
import { GetMembersQueryDto } from './dto/get-members-query.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
export declare class ClubMemberController {
    private clubMemberService;
    constructor(clubMemberService: ClubMemberService);
    getProfile(req: any): Promise<{
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
    updateProfile(req: any, dto: UpdateProfileDto): Promise<{
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
    assignTrainer(req: any, clubMemberId: string): Promise<{
        message: string;
        clubMemberId: number;
        trainerId: number;
    }>;
    getMyClubMembers(req: any): Promise<{
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
    getAllMembers(req: any, query: GetMembersQueryDto): Promise<{
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
    getMemberById(req: any, id: string): Promise<{
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
    removeTrainer(req: any, clubMemberId: string): Promise<{
        message: string;
        clubMemberId: number;
        trainerId: number;
    }>;
    getMemberStats(req: any, id: string): Promise<{
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
    updateMembership(req: any, id: string, dto: UpdateMembershipDto): Promise<{
        message: string;
        clubMemberId: number;
        membershipStatus: import(".prisma/client").$Enums.MembershipStatus;
        membershipExpiresAt: Date;
    }>;
    getMemberEvents(req: any, id: string, query: GetMemberEventsQueryDto): Promise<{
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
