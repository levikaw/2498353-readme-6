import { ConfigType, registerAs } from '@nestjs/config';
import { DEFAULT_ARTEFACT_SERVICE_PORT, ARTEFACTS_ALIAS } from './constants';
import { plainToClass } from 'class-transformer';
import { ArtefactServiceConfiguration } from './artefact-sevice.config';

async function getArtefactsAccessConfig(): Promise<ArtefactServiceConfiguration> {
  const config = plainToClass(ArtefactServiceConfiguration, {
    environment: process.env.NODE_ENV,
    appHost: process.env.APP_HOST,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_ARTEFACT_SERVICE_PORT,
  });

  try {
    await config.validate();
  } catch (error) {
    throw new Error(error);
  }

  return config;
}

export default registerAs(
  ARTEFACTS_ALIAS,
  async (): Promise<ConfigType<typeof getArtefactsAccessConfig>> => getArtefactsAccessConfig(),
);
