import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClubMemberModule } from './club-member/club-member.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { GradesModule } from './grades/grades.module';
import { PositionsModule } from './positions/positions.module';

@Module({
  imports: [
    PrismaModule,
    PostsModule,
    AuthModule,
    UserModule,
    AdminModule,
    ClubMemberModule,
    GradesModule,
    PositionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
