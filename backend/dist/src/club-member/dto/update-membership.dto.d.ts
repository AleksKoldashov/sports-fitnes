import { MembershipStatus } from '@prisma/client';
export declare class UpdateMembershipDto {
    status: MembershipStatus;
    expiresAt?: string;
}
