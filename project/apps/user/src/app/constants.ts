export const LENGTH_LOGIN = {
  MIN: 3,
  MAX: 50,
} as const;

export const AUTH_USER = {
  EXISTS: 'User with this email exists',
  DOES_NOT_EXISTS: 'User with this email does not exists',
} as const;

export const LOGIN_API = {
  DESCRIPTION: 'User login',
  EXAMPLE: 'user_login',
} as const;

export const NOTIFY_PARAMS = {
  TEMPLATE: 'new-posts',
  SUBJECT: 'Ваша подборка новых публикаций готова!',
} as const;
