import { ConfigType, registerAs } from '@nestjs/config';
import { DEFAULT_POST_SERVICE_PORT, POSTS_ALIAS } from './constants';
import { plainToClass } from 'class-transformer';
import { PostServiceConfiguration } from './post-sevice.config';

async function getPostsAccessConfig(): Promise<PostServiceConfiguration> {
  const config = plainToClass(PostServiceConfiguration, {
    environment: process.env.NODE_ENV,
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : DEFAULT_POST_SERVICE_PORT,
  });

  try {
    await config.validate();
  } catch (error) {
    throw new Error(error);
  }

  return config;
}

export default registerAs(POSTS_ALIAS, async (): Promise<ConfigType<typeof getPostsAccessConfig>> => getPostsAccessConfig());
