import { Module } from '@nestjs/common';
import { PostAccessRepository } from './post-access.repository';
import { PostAccessFactory } from './post-access.factory';
import { PrismaModule } from '@project/prisma';

@Module({
  imports: [PrismaModule],
  providers: [PostAccessRepository, PostAccessFactory],
  exports: [PostAccessRepository],
})
export class PostAccessModule {}
