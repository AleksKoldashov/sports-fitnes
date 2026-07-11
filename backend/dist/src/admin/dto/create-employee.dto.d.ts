import { Role } from '@prisma/client';
export declare class CreateEmployeeDto {
    email: string;
    password: string;
    role: Role;
    firstName: string;
    lastName: string;
    patronymic?: string;
    specialty?: string;
    experience?: number;
    department?: string;
    phone?: string;
    phoneHr?: string;
}
