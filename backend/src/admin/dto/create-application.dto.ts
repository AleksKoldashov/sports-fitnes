import { Role } from '@prisma/client';

// создания заявки (кадровик)
export class CreateApplicationDto {
  email: string;
  role: Role; // TRAINER, MANAGER, HR
  firstName: string;
  lastName: string;
  patronymic?: string;
  specialty?: string;
  experience?: number;
  department?: string;
  phone?: string;
}
