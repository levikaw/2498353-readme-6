import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { LikeAccessModule } from '@project/like-access';

@Module({
  imports: [LikeAccessModule],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
