import { Module } from '@nestjs/common';
import { PostAccessRepository } from './post-access.repository';
import { PostAccessFactory } from './post-access.factory';

@Module({
  providers: [PostAccessRepository, PostAccessFactory],
  exports: [PostAccessRepository],
})
export class PostAccessModule {}
