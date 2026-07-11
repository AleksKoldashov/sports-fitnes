import { AdminService } from './admin.service';
import { ApproveApplicationDto } from './dto/approve-application.dto';
import { CreateApplicationDto } from './dto/create-application.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    createEmployeeDirectly(dto: CreateEmployeeDto, req: any): Promise<{
        id: number;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    createApplication(dto: CreateApplicationDto, req: any): Promise<{
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
    approveApplication(dto: ApproveApplicationDto, req: any): Promise<{
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
    getApplications(req: any, status?: string, limit?: string, offset?: string): Promise<{
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
