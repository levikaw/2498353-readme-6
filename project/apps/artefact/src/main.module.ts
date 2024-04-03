import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [LikeModule, CommentModule],
})
export class MainModule {}
