/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setUpSwaggerModule } from '@project/swagger';
import { AuthModule } from './app/auth.module';
import { ConfigService } from '@nestjs/config';
import { AUTH_ALIAS } from '@project/configuration';
import { CheckGatewayRequestGuard } from '@project/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get(`${AUTH_ALIAS}.port`);
  app.useGlobalGuards(new CheckGatewayRequestGuard());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  setUpSwaggerModule<AuthModule>(app, 'auth');

  await app.listen(port);
  Logger.log(`🚀 Auth is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
