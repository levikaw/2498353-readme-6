import { Module } from '@nestjs/common';
import { LikeAccessRepository } from './like-access.repository';
import { LikeAccessFactory } from './like-access.factory';
import { PrismaModule } from '@project/prisma';

@Module({
  imports: [PrismaModule],
  providers: [LikeAccessRepository, LikeAccessFactory],
  exports: [LikeAccessRepository],
})
export class LikeAccessModule {}
