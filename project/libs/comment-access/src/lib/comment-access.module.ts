import { Module } from '@nestjs/common';
import { CommentAccessRepository } from './comment-access.repository';
import { CommentAccessFactory } from './comment-access.factory';
import { PrismaModule } from '@project/prisma';

@Module({
  imports: [PrismaModule],
  providers: [CommentAccessRepository, CommentAccessFactory],
  exports: [CommentAccessRepository],
})
export class CommentAccessModule {}
