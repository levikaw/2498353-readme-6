/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { FILES_ALIAS } from '@project/constants';
import { FileModule } from './app/file.module';

async function bootstrap() {
  const app = await NestFactory.create(FileModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get(`${FILES_ALIAS}.port`);
  // const port = process.env.PORT || 3000;

  const config = new DocumentBuilder()
    .setTitle('file api')
    .setDescription('The file API description')
    .setVersion('1.0')
    .addTag('file')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
