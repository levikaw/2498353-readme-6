import { ConfigType, registerAs } from '@nestjs/config';
import { DEFAULT_AUTH_SERVICE_PORT, AUTH_ALIAS, DEFAULT_EXPIRES_TOKEN_IN } from './constants';
import { plainToClass } from 'class-transformer';
import { AuthServiceConfiguration } from './auth-sevice.config';

async function getAuthConfig(): Promise<AuthServiceConfiguration> {
  const config = plainToClass(AuthServiceConfiguration, {
    environment: process.env.NODE_ENV,
    jwtSecret: process.env.JWT_SECRET,
    expiresTokenIn: process.env.EXPIRES_TOKEN_IN ? parseInt(process.env.EXPIRES_TOKEN_IN, 10) : DEFAULT_EXPIRES_TOKEN_IN,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_AUTH_SERVICE_PORT,
  });

  await config.validate();

  return config;
}

export default registerAs(AUTH_ALIAS, async (): Promise<ConfigType<typeof getAuthConfig>> => {
  return await getAuthConfig();
});
