import { Module } from '@nestjs/common';
import { LikeAccessRepository } from './like-access.repository';
import { LikeAccessFactory } from './like-access.factory';
import { PrismaModule } from '@project/prisma';
import { getPostgresOptions } from '@project/configuration';

@Module({
  imports: [PrismaModule.registerAsync(getPostgresOptions())],
  providers: [LikeAccessRepository, LikeAccessFactory],
  exports: [LikeAccessRepository],
})
export class LikeAccessModule {}
