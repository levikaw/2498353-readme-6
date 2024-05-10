import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostAccessFactory, PostAccessRepository } from '@project/post-access';
import { PostController } from './post.controller';
import { authServiceRegister, postgresRegister, postServiceRegister } from '@project/configuration';
import { ConfigModule } from '@nestjs/config';
import { PrismaDataAccessModule } from '@project/prisma';
import { TokenAccessModule } from '@project/token-access';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [postServiceRegister, postgresRegister, authServiceRegister],
      envFilePath: 'apps/post/.env',
    }),
    TokenAccessModule,
    PrismaDataAccessModule.register([PostAccessFactory], [PostAccessRepository]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
