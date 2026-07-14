import { IClubMemberProfile } from './IClubMemberProfile';
import { IDirectorProfile } from './IDirectorProfile';
import { IHrProfile } from './IHrProfile';
import { ITrainerProfile } from './ITrainerProfile';
import { TRole } from './TRole';

export type TPersonCard =
  | IClubMemberProfile
  | ITrainerProfile
  | IHrProfile
  | IDirectorProfile;

export interface IProfileResponse {
  id: number;
  email: string;
  role: TRole;
  createdAt: string;
  updatedAt: string;
  person_card: TPersonCard;
}
