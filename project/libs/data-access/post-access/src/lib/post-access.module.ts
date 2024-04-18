import { Module } from '@nestjs/common';
import { PostAccessRepository } from './post-access.repository';
import { PostAccessFactory } from './post-access.factory';
import { PrismaModule } from '@project/prisma';
import { getPostgresOptions } from '@project/configuration';

@Module({
  imports: [PrismaModule.registerAsync(getPostgresOptions())],
  providers: [PostAccessRepository, PostAccessFactory],
  exports: [PostAccessRepository],
})
export class PostAccessModule {}
