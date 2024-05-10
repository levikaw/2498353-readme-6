import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { postgresRegister, artefactServiceRegister, authServiceRegister } from '@project/configuration';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TokenAccessModule } from '@project/token-access';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [artefactServiceRegister, postgresRegister, authServiceRegister],
      envFilePath: 'apps/artefact/.env',
    }),
    LikeModule,
    CommentModule,
    SubscriptionModule,
    TagModule,
    TokenAccessModule,
  ],
})
export class MainModule {}
