import { MembershipStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateMembershipDto {
  @IsEnum(MembershipStatus)
  status: MembershipStatus;

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}
