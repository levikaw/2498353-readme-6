export const RABBITMQ_DEFAULT_PORT = 5672;
export const RABBITMQ_ALIAS = 'rabbitmq';

export const RABBIT_ROUTS = {
  SEND_NOTIFICATION: 'send-notification',
} as const;

export const RABBIT_EXCHANGES = {
  NOTIFICATION: {
    NAME: 'notification-income',
    TYPE: 'direct',
  },
} as const;

export const RABBIT_QUEUES = {
  NOTIFICATION: 'notification-income',
} as const;
