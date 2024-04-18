import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setUpSwaggerModule<T>(
  app: INestApplication<T>,
  appTag: string,
  swaggerPath = 'api',
  version = '1.0',
): void {
  const config = new DocumentBuilder()
    .setTitle(`${appTag} api`)
    .setDescription(`The ${appTag} API description`)
    .setVersion(version)
    .addTag(appTag)
    .build();

  SwaggerModule.setup(swaggerPath, app, SwaggerModule.createDocument(app, config));
}
