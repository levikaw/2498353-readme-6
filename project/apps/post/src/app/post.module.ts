import { Module } from '@nestjs/common';
import { CreatePostController } from './create-post.controller';
import { PostService } from './post.service';
import { PostAccessModule } from '@project/post-access';
import { UpdatePostController } from './update-post.controller';
import { PostController } from './post.controller';
import { postgresRegister, postServiceRegister } from '@project/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [postServiceRegister, postgresRegister],
      envFilePath: 'apps/post/.env',
    }),
    PostAccessModule,
  ],
  controllers: [CreatePostController, UpdatePostController, PostController],
  providers: [PostService],
})
export class PostModule {}
