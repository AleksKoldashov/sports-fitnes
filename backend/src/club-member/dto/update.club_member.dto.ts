import { PartialType } from '@nestjs/mapped-types';
import { CreateClubMemberDto } from './create-club_member.dto';

export class UpdateClubMemberDto extends PartialType(CreateClubMemberDto) {}
