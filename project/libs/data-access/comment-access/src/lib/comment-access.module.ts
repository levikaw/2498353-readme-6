import { Module } from '@nestjs/common';
import { CommentAccessRepository } from './comment-access.repository';
import { CommentAccessFactory } from './comment-access.factory';
import { PrismaModule } from '@project/prisma';
import { getPostgresOptions } from '@project/configuration';

@Module({
  imports: [PrismaModule.registerAsync(getPostgresOptions())],
  providers: [CommentAccessRepository, CommentAccessFactory],
  exports: [CommentAccessRepository],
})
export class CommentAccessModule {}
