import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { IsCapitalized } from '../../common/decorators/is-capitalized.decorator';

export class CreateTrainerDto {
  @IsString()
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  @MinLength(3, { message: 'Имя должен содержать минимум 3 символа' })
  @IsCapitalized({ message: 'Заголовок должен начинаться с заглавной буквы' })
  name: string;
  @IsString()
  specialty: string;
  @IsNumber()
  experience: number;
}
