import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { AUTH_ALIAS, MONGO_ALIAS } from '@project/constants';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

function getMongoConnectionString({ username, password, host, port, databaseName, authDatabase }): string {
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=${authDatabase}`;
}

export function getMongooseOptions(): MongooseModuleAsyncOptions {
  return {
    useFactory: async (config: ConfigService) => {
      return {
        uri: getMongoConnectionString({
          username: config.get<string>(`${MONGO_ALIAS}.user`),
          password: config.get<string>(`${MONGO_ALIAS}.password`),
          host: config.get<string>(`${MONGO_ALIAS}.host`),
          port: config.get<string>(`${MONGO_ALIAS}.port`),
          authDatabase: config.get<string>(`${MONGO_ALIAS}.authBase`),
          databaseName: config.get<string>(`${MONGO_ALIAS}.name`),
        }),
      };
    },
    inject: [ConfigService],
  };
}

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
