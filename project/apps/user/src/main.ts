import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setUpSwaggerModule } from '@project/swagger';
import { UserModule } from './app/user.module';
import { ConfigService } from '@nestjs/config';
import { USERS_ALIAS } from '@project/configuration';
import { CheckGatewayRequestGuard } from '@project/common';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get(`${USERS_ALIAS}.port`);
  const appHost = configService.get(`${USERS_ALIAS}.appHost`);

  app.useGlobalGuards(new CheckGatewayRequestGuard());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  setUpSwaggerModule<UserModule>(app, 'user');

  await app.listen(port);
  Logger.log(`🚀 User is running on: http://${appHost}:${port}/${globalPrefix}`);
}

bootstrap();
