import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // 1. Проверяем, существует ли пользователь с такой почтой
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Пользователь с такой почтой уже существует');
    }

    // 2. Хешируем пароль
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Создаём пользователя и профиль клубного участника в транзакции
    const user = await this.prisma.$transaction(async (prisma) => {
      // Создаём пользователя
      const newUser = await prisma.user.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          role: 'CLUB_MEMBER', // всегда по умолчанию
        },
      });

      // Создаём профиль ClubMember
      await prisma.clubMember.create({
        data: {
          firstName: dto.firstName,
          lastName: dto.lastName,
          patronymic: dto.patronymic || null,
          age: dto.age,
          userId: newUser.id,
        },
      });

      return newUser;
    });

    // Возвращаем пользователя (без пароля)
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
  async login(dto: LoginDto) {
    // 1. Ищем пользователя
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Неверная почта или пароль');
    }

    // 2. Проверяем пароль
    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверная почта или пароль');
    }

    // 3. Генерируем JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
