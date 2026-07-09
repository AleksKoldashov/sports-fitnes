export class RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  patronymic?: string; // опционально
  age: number;
}
