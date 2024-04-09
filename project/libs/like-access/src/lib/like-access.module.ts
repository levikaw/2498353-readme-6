import { Module } from '@nestjs/common';
import { LikeAccessRepository } from './like-access.repository';
import { LikeAccessFactory } from './like-access.factory';

@Module({
  providers: [LikeAccessRepository, LikeAccessFactory],
  exports: [LikeAccessRepository],
})
export class LikeAccessModule {}
