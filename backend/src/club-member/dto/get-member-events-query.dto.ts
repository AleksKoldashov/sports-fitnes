import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetMemberEventsQueryDto {
  @IsOptional()
  @IsString()
  status?:
    | 'PENDING'
    | 'CONFIRMED'
    | 'DECLINED'
    | 'COMPLETED'
    | 'CANCELLED_BY_USER';

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  offset: number = 0;
}
