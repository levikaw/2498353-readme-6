import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { gatewayServiceRegister, getHttpOptions } from '@project/configuration';
import { ArtefactController } from './controllers/artefact.controller';
import { NotificationController } from './controllers/notification.controller';
import { PostController } from './controllers/post.controller';
import { UserController } from './controllers/user.controller';
import { ArtefactService } from './services/artefact.service';
import { FileService } from './services/file.service';
import { NotificactionService } from './services/notigication.service';
import { PostService } from './services/post.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [gatewayServiceRegister],
      envFilePath: 'apps/gateway/.env',
    }),
    HttpModule.registerAsync(getHttpOptions()),
  ],
  providers: [ArtefactService, UserService, FileService, PostService, NotificactionService],
  controllers: [ArtefactController, UserController, NotificationController, PostController],
})
export class GatewayModule {}
