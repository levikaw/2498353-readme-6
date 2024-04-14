import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { AUTH_ALIAS } from './constants';

export function getJwtOptions(): JwtModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        global: true,
        secret: config.get<string>(`${AUTH_ALIAS}.jwtSecret`),
        signOptions: { expiresIn: `${config.get<string>(`${AUTH_ALIAS}.expiresTokenIn`)}s` },
      };
    },
    inject: [ConfigService],
  };
}
