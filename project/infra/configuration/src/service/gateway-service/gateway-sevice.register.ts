import { ConfigType, registerAs } from '@nestjs/config';
import { DEFAULT_GATEWAY_SERVICE_PORT, GATEWAY_ALIAS, DEFAULT_MAX_REDIRECTS, DEFAULT_TIMEOUT } from './constants';
import { plainToClass } from 'class-transformer';
import { GatewayServiceConfiguration } from './gateway-sevice.config';

async function getGatewaysAccessConfig(): Promise<GatewayServiceConfiguration> {
  const config = plainToClass(GatewayServiceConfiguration, {
    environment: process.env.NODE_ENV,
    userBaseUrl: process.env.USER_SERVICE_BASE_URL,
    fileBaseUrl: process.env.FILE_SERVICE_BASE_URL,
    authBaseUrl: process.env.AUTH_SERVICE_BASE_URL,
    postBaseUrl: process.env.POST_SERVICE_BASE_URL,
    appHost: process.env.APP_HOST,
    notifyBaseUrl: process.env.NOTIFY_SERVICE_BASE_URL,
    artefactBaseUrl: process.env.ARTEFACT_SERVICE_BASE_URL,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_GATEWAY_SERVICE_PORT,
    timeout: process.env.PORT ? parseInt(process.env.HTTP_CLIENT_TIMEOUT, 10) : DEFAULT_TIMEOUT,
    maxRedirects: process.env.PORT ? parseInt(process.env.HTTP_CLIENT_MAX_REDIRECTS, 10) : DEFAULT_MAX_REDIRECTS,
  });

  try {
    await config.validate();
  } catch (error) {
    throw new Error(error);
  }

  return config;
}

export default registerAs(
  GATEWAY_ALIAS,
  async (): Promise<ConfigType<typeof getGatewaysAccessConfig>> => getGatewaysAccessConfig(),
);
