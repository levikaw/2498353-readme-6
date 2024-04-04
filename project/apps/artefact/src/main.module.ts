import { Module } from '@nestjs/common';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [LikeModule, CommentModule, SubscriptionModule],
})
export class MainModule {}
