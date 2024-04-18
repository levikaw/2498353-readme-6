import { ConfigType, registerAs } from '@nestjs/config';
import { DEFAULT_USER_SERVICE_PORT, USERS_ALIAS } from './constants';
import { plainToClass } from 'class-transformer';
import { UserServiceConfiguration } from './user-sevice.config';

async function getUsersAccessConfig(): Promise<UserServiceConfiguration> {
  const config = plainToClass(UserServiceConfiguration, {
    environment: process.env.NODE_ENV,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_USER_SERVICE_PORT,
  });

  try {
    await config.validate();
  } catch (error) {
    throw new Error(error);
  }

  return config;
}

export default registerAs(USERS_ALIAS, async (): Promise<ConfigType<typeof getUsersAccessConfig>> => getUsersAccessConfig());
