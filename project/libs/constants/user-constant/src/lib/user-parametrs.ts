export const NOTIFY_PARAMS = {
  TEMPLATE: 'new-posts',
  SUBJECT: 'Ваша подборка новых публикаций готова!',
} as const;

export const SALT_ROUNDS = 10;

export const LENGTH_USER_NAME = {
  MIN: 3,
  MAX: 50,
} as const;

export const LENGTH_PASSWORD = {
  MAX: 12,
  MIN: 6,
} as const;
