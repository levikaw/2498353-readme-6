/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setUpSwaggerModule } from '@project/swagger';
import { NotificationModule } from './app/notification.module';
import { ConfigService } from '@nestjs/config';
import { NOTIFY_ALIAS } from '@project/configuration';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get(`${NOTIFY_ALIAS}.port`);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  setUpSwaggerModule<NotificationModule>(app, 'notification');

  await app.listen(port);
  Logger.log(`🚀 Notification is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
