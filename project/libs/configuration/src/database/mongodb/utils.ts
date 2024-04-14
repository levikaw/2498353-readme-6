import { MongooseModuleAsyncOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { MONGO_ALIAS } from './constants';

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
