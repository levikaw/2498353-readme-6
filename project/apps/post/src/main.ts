/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { setUpSwaggerModule } from '@project/swagger';
import { ConfigService } from '@nestjs/config';
import { POSTS_ALIAS } from '@project/configuration';
import { PostModule } from './app/post.module';

async function bootstrap() {
  const app = await NestFactory.create(PostModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const configService = app.get(ConfigService);
  const port = configService.get(`${POSTS_ALIAS}.port`);

  setUpSwaggerModule<PostModule>(app, 'post');

  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
