import { Exclude } from 'class-transformer';

export class UserResponseDto {
  id: number;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;

  // Если хочешь скрыть и другие поля
  // @Exclude()
  // someField: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
