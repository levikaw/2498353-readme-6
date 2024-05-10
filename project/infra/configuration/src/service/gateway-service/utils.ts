import { HttpModuleAsyncOptions } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { GATEWAY_ALIAS } from './constants';

export function getHttpOptions(): HttpModuleAsyncOptions {
  return {
    useFactory: (config: ConfigService) => ({
      timeout: parseInt(config.get<string>(`${GATEWAY_ALIAS}.timeout`)),
      maxRedirects: parseInt(config.get<string>(`${GATEWAY_ALIAS}.maxRedirects`)),
      headers: {
        'x-request-id': randomUUID(),
      },
    }),
    inject: [ConfigService],
  };
}
