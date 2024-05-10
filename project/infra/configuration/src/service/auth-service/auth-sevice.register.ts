import { ConfigType, registerAs } from '@nestjs/config';
import { DEFAULT_AUTH_SERVICE_PORT, AUTH_ALIAS } from './constants';
import { plainToClass } from 'class-transformer';
import { AuthServiceConfiguration } from './auth-sevice.config';

async function getAuthConfig(): Promise<AuthServiceConfiguration> {
  const config = plainToClass(AuthServiceConfiguration, {
    environment: process.env.NODE_ENV,
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    expiresAccessTokenIn: process.env.EXPIRES_ACCESS_TOKEN_IN,
    expiresRefreshTokenIn: process.env.EXPIRES_REFRESH_TOKEN_IN,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_AUTH_SERVICE_PORT,
  });

  try {
    await config.validate();
  } catch (error) {
    throw new Error(error);
  }

  return config;
}

export default registerAs(AUTH_ALIAS, async (): Promise<ConfigType<typeof getAuthConfig>> => getAuthConfig());
