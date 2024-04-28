import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  getMailerOptions,
  notificationServiceRegister,
  getRabbitOptions,
  rabbitRegister,
  postgresRegister,
} from '@project/configuration';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { NotificationAccessModule } from '@project/notification-access';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [notificationServiceRegister, rabbitRegister, postgresRegister],
      envFilePath: 'apps/notification/.env',
    }),
    MailerModule.forRootAsync(getMailerOptions()),
    RabbitMQModule.forRootAsync(RabbitMQModule, getRabbitOptions()),
    NotificationAccessModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
