export const RABBIT_ROUTS = {
  SEND_NOTIFICATION: 'sendn-notification',
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
