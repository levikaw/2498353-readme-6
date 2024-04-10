import { ConfigType, registerAs } from '@nestjs/config';
import { DEFAULT_MONGO_PORT, MONGO_ALIAS } from '@project/constants';
import { MongoConfiguration } from './mongo.config';
import { plainToClass } from 'class-transformer';

async function getMongoDbConfig(): Promise<MongoConfiguration> {
  const config = plainToClass(MongoConfiguration, {
    host: process.env.MONGO_HOST,
    name: process.env.MONGO_DB,
    port: process.env.MONGO_PORT ? parseInt(process.env.MONGO_PORT, 10) : DEFAULT_MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
    authBase: process.env.MONGO_AUTH_BASE,
  });

  await config.validate();

  return config;
}

export default registerAs(MONGO_ALIAS, async (): Promise<ConfigType<typeof getMongoDbConfig>> => {
  return await getMongoDbConfig();
});
