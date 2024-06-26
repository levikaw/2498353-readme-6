import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  getMailerOptions,
  notificationServiceRegister,
  getRabbitOptions,
  rabbitRegister,
  postgresRegister,
  authServiceRegister,
} from '@project/configuration';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { NotificationAccessFactory, NotificationAccessRepository } from '@project/notification-access';
import { PrismaDataAccessModule } from '@project/prisma';
import { TokenAccessModule } from '@project/token-access';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notificationServiceRegister, rabbitRegister, postgresRegister, authServiceRegister],
      envFilePath: 'apps/notification/.env',
    }),
    TokenAccessModule,
    MailerModule.forRootAsync(getMailerOptions()),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitOptions()),
    PrismaDataAccessModule.register([NotificationAccessFactory], [NotificationAccessRepository]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
