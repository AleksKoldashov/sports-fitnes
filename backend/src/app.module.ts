import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainersModule } from './trainers/trainers.module';
import { PrismaModule } from './prisma/prisma.module';
import { PostsModule } from './posts/posts.module';
import { ClubMemberModule } from './club-member/club-member.module';

@Module({
  imports: [TrainersModule, PrismaModule, PostsModule, ClubMemberModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
