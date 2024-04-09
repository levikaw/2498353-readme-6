import { Module } from '@nestjs/common';
import { CreatePostController } from './create-post.controller';
import { PostService } from './post.service';
import { PostAccessModule } from '@project/post-access';
import { UpdatePostController } from './update-post.controller';
import { PostController } from './post.controller';

@Module({
  imports: [PostAccessModule],
  controllers: [CreatePostController, UpdatePostController, PostController],
  providers: [PostService],
})
export class PostModule {}
