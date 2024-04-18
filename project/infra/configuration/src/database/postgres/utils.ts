import { ConfigService } from '@nestjs/config';
import { POSTGRES_ALIAS } from './constants';

const getPostgresConnectionString = ({ username, password, host, port, databaseName }): string =>
  `postgresql://${username}:${password}@${host}:${port}/${databaseName}?schema=public`;

export function getPostgresOptions() {
  return {
    useFactory: (config: ConfigService) => ({
      datasourceUrl: getPostgresConnectionString({
        username: config.get<string>(`${POSTGRES_ALIAS}.user`),
        password: config.get<string>(`${POSTGRES_ALIAS}.password`),
        host: config.get<string>(`${POSTGRES_ALIAS}.host`),
        port: config.get<string>(`${POSTGRES_ALIAS}.port`),
        databaseName: config.get<string>(`${POSTGRES_ALIAS}.db`),
      }),
    }),
    inject: [ConfigService],
  };
}
