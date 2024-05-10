/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setUpSwaggerModule } from '@project/swagger';
import { GatewayModule } from './app/gateway.module';
import { ConfigService } from '@nestjs/config';
import { GATEWAY_ALIAS } from '@project/configuration';
import { AxiosExceptionFilter } from './app/filters/axios-exception.filter';
import { AddRequestIdInterceptor } from './app/interseptors/add-request-id.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(GatewayModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get(`${GATEWAY_ALIAS}.port`);

  app.useGlobalInterceptors(new AddRequestIdInterceptor());
  app.useGlobalFilters(new AxiosExceptionFilter());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  setUpSwaggerModule<GatewayModule>(app, 'gateway');

  await app.listen(port);
  Logger.log(`🚀 Gateway is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
