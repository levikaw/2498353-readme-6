import { Module } from '@nestjs/common';
import { UserAccessRepository } from './user-access.repository';
import { UserAccessFactory } from './user-access.factory';

@Module({
  providers: [UserAccessRepository, UserAccessFactory],
  exports: [UserAccessRepository],
})
export class UserAccessModule {}
