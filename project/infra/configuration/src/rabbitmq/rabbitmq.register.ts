import { ConfigType, registerAs } from '@nestjs/config';
import { RABBITMQ_DEFAULT_PORT, RABBITMQ_ALIAS } from './constants';
import { plainToClass } from 'class-transformer';
import { RabbitMQConfiguration } from './rabbitmq.config';

async function getRabbitMQConfig(): Promise<RabbitMQConfiguration> {
  const config = plainToClass(RabbitMQConfiguration, {
    environment: process.env.NODE_ENV,
    host: process.env.RABBIT_HOST,
    password: process.env.RABBITMQ_DEFAULT_PASS,
    user: process.env.RABBITMQ_DEFAULT_USER,
    port: process.env.RABBITMQ_PORT ? parseInt(process.env.RABBITMQ_PORT, 10) : RABBITMQ_DEFAULT_PORT,
    webUIPort: parseInt(process.env.RABBITMQ_WEB_UI_PORT, 10),
  });

  try {
    await config.validate();
  } catch (error) {
    throw new Error(error);
  }

  return config;
}

export default registerAs(RABBITMQ_ALIAS, async (): Promise<ConfigType<typeof getRabbitMQConfig>> => getRabbitMQConfig());
