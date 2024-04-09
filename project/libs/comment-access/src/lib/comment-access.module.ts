import { Module } from '@nestjs/common';
import { CommentAccessRepository } from './comment-access.repository';
import { CommentAccessFactory } from './comment-access.factory';

@Module({
  providers: [CommentAccessRepository, CommentAccessFactory],
  exports: [CommentAccessRepository],
})
export class CommentAccessModule {}
