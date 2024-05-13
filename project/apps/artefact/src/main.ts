import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setUpSwaggerModule } from '@project/swagger';
import { MainModule } from './main.module';
import { ConfigService } from '@nestjs/config';
import { ARTEFACTS_ALIAS } from '@project/configuration';
import { CheckGatewayRequestGuard } from '@project/common';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get(`${ARTEFACTS_ALIAS}.port`);
  const appHost = configService.get(`${ARTEFACTS_ALIAS}.appHost`);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalGuards(new CheckGatewayRequestGuard());

  setUpSwaggerModule<MainModule>(app, 'artefact');

  await app.listen(port);
  Logger.log(`🚀 Artefact is running on: http://${appHost}:${port}/${globalPrefix}`);
}

bootstrap();
