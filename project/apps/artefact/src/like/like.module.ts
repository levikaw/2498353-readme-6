import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeAccessFactory, LikeAccessRepository } from '@project/like-access';
import { PrismaDataAccessModule } from '@project/prisma';

@Module({
  imports: [PrismaDataAccessModule.register([LikeAccessFactory], [LikeAccessRepository])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
