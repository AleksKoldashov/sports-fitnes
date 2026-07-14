export interface ITrainerProfile {
  id: number;
  firstName: string;
  lastName: string;
  patronymic?: string;
  specialty: string;
  experience: number;
  rating?: number;
  isActive: boolean;
}
