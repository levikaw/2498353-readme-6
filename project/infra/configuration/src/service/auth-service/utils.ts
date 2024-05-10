import { ConfigService } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import { AUTH_ALIAS } from './constants';

export function getJwtAccessOptions(config: ConfigService): JwtSignOptions {
  return {
    secret: config.get<string>(`${AUTH_ALIAS}.jwtAccessSecret`),
    expiresIn: config.get<string>(`${AUTH_ALIAS}.expiresAccessTokenIn`),
  };
}

export function getJwtRefreshOptions(config: ConfigService): JwtSignOptions {
  return {
    secret: config.get<string>(`${AUTH_ALIAS}.jwtRefreshSecret`),
    expiresIn: config.get<string>(`${AUTH_ALIAS}.expiresRefreshTokenIn`),
  };
}
