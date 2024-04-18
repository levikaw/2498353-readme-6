import { Module } from '@nestjs/common';
import { UserAccessRepository } from './user-access.repository';
import { UserAccessFactory } from './user-access.factory';
import { PrismaModule } from '@project/prisma';
import { getPostgresOptions } from '@project/configuration';

@Module({
  imports: [PrismaModule.registerAsync(getPostgresOptions())],
  providers: [UserAccessRepository, UserAccessFactory],
  exports: [UserAccessRepository],
})
export class UserAccessModule {}
