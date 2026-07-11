import { ClubMemberService } from './club-member.service';
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
}
