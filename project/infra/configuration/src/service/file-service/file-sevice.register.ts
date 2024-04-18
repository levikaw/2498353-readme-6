import { ConfigType, registerAs } from '@nestjs/config';
import { DEFAULT_FILE_SERVICE_PORT, FILES_ALIAS } from './constants';
import { plainToClass } from 'class-transformer';
import { FileServiceConfiguration } from './file-sevice.config';

async function getFilesAccessConfig(): Promise<FileServiceConfiguration> {
  const config = plainToClass(FileServiceConfiguration, {
    environment: process.env.NODE_ENV,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_FILE_SERVICE_PORT,
  });

  try {
    await config.validate();
  } catch (error) {
    throw new Error(error);
  }

  return config;
}

export default registerAs(FILES_ALIAS, async (): Promise<ConfigType<typeof getFilesAccessConfig>> => getFilesAccessConfig());
