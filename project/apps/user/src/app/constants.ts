export const LENGTH_LOGIN = {
  MIN: 3,
  MAX: 50,
} as const;

export const AUTH_USER_EXISTS = 'User with this email exists';

export const LOGIN_API = {
  DESCRIPTION: 'User login',
  EXAMPLE: 'user_login',
} as const;
