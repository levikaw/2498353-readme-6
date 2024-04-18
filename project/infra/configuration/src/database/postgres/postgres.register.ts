import { ConfigType, registerAs } from '@nestjs/config';
import { DEFAULT_POSTGRES_PORT, POSTGRES_ALIAS } from './constants';
import { PostgresConfiguration } from './postgres.config';
import { plainToClass } from 'class-transformer';

async function getPostgresDbConfig(): Promise<PostgresConfiguration> {
  const config = plainToClass(PostgresConfiguration, {
    host: process.env.POSTGRES_HOST,
    db: process.env.POSTGRES_DB,
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT, 10) : DEFAULT_POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await config.validate();
  } catch (error) {
    throw new Error(error);
  }

  return config;
}

export default registerAs(POSTGRES_ALIAS, async (): Promise<ConfigType<typeof getPostgresDbConfig>> => getPostgresDbConfig());
