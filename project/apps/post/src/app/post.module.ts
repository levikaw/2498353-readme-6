import { Module } from '@nestjs/common';
import { CreatePostController } from './controllers/create-post.controller';
import { PostService } from './post.service';
import { PostAccessFactory, PostAccessRepository } from '@project/post-access';
import { UpdatePostController } from './controllers/update-post.controller';
import { PostController } from './controllers/post.controller';
import { postgresRegister, postServiceRegister } from '@project/configuration';
import { ConfigModule } from '@nestjs/config';
import { PrismaDataAccessModule } from '@project/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [postServiceRegister, postgresRegister],
      envFilePath: 'apps/post/.env',
    }),
    PrismaDataAccessModule.register(PostAccessFactory, PostAccessRepository),
  ],
  controllers: [CreatePostController, UpdatePostController, PostController],
  providers: [PostService],
})
export class PostModule {}
