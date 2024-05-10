import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentAccessFactory, CommentAccessRepository } from '@project/comment-access';
import { PrismaDataAccessModule } from '@project/core';

@Module({
  imports: [PrismaDataAccessModule.register(CommentAccessFactory, CommentAccessRepository)],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
