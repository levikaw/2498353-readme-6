import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentAccessModule } from '@project/comment-access';

@Module({
  imports: [CommentAccessModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
