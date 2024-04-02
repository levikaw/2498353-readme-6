import { Module } from '@nestjs/common';
import { UserAccountRepository } from './user-account.repository';
import { UserAccountFactory } from './user-account.factory';

@Module({
  providers: [UserAccountRepository, UserAccountFactory],
  exports: [UserAccountRepository],
})
export class UserAccountModule {}
