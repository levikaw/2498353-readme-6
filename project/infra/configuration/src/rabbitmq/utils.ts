import { ConfigService } from '@nestjs/config';
import { RABBITMQ_ALIAS } from './constants';
import { RABBIT_EXCHANGES } from './constants';
import { AsyncModuleConfig } from '@golevelup/nestjs-modules';
import { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';

const getRabbitMQConnectionString = ({ user, password, host, port }): string => `amqp://${user}:${password}@${host}:${port}`;

export function getRabbitOptions(): AsyncModuleConfig<RabbitMQConfig> {
  return {
    useFactory: async (config: ConfigService) => ({
      exchanges: Object.values(RABBIT_EXCHANGES).map((exchange) => ({
        name: exchange.NAME,
        type: exchange.TYPE,
        createExchangeIfNotExists: true,
      })),
      uri: getRabbitMQConnectionString({
        host: config.get<string>(`${RABBITMQ_ALIAS}.host`),
        password: config.get<string>(`${RABBITMQ_ALIAS}.password`),
        user: config.get<string>(`${RABBITMQ_ALIAS}.user`),
        port: config.get<string>(`${RABBITMQ_ALIAS}.port`),
      }),
      connectionInitOptions: { wait: true },
      enableControllerDiscovery: true,
    }),
    inject: [ConfigService],
  };
}
