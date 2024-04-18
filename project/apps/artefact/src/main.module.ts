import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { postgresRegister, artefactServiceRegister } from '@project/configuration';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [artefactServiceRegister, postgresRegister],
      envFilePath: 'apps/artefact/.env',
    }),
    LikeModule,
    CommentModule,
    SubscriptionModule,
  ],
})
export class MainModule {}
