import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ApproveApplicationDto } from './dto/approve-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    createEmployeeDirectly(dto: CreateEmployeeDto, currentUserId: number): Promise<{
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    createApplication(dto: CreateApplicationDto, currentUserId: number): Promise<{
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        profileData: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        rejectionReason: string | null;
        createdById: number;
        reviewedById: number | null;
    }>;
    approveApplication(dto: ApproveApplicationDto, currentUserId: number): Promise<{
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        createdAt: Date;
        updatedAt: Date;
        profileData: import("@prisma/client/runtime/library").JsonValue;
        status: import(".prisma/client").$Enums.ApplicationStatus;
        rejectionReason: string | null;
        createdById: number;
        reviewedById: number | null;
    } | {
        message: string;
    }>;
    private createProfile;
    getApplications(currentUserId: number, currentUserRole: Role, status?: string, limit?: number, offset?: number): Promise<{
        data: ({
            createdBy: {
                id: number;
                email: string;
            };
            reviewedBy: {
                id: number;
                email: string;
            };
        } & {
            id: number;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            profileData: import("@prisma/client/runtime/library").JsonValue;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            rejectionReason: string | null;
            createdById: number;
            reviewedById: number | null;
        })[];
        pagination: {
            total: number;
            limit: number;
            offset: number;
            hasMore: boolean;
        };
    }>;
}
