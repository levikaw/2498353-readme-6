export const POSTGRES_VALIDATION_MESSAGE = {
  HOST: 'Host is required',
  STORAGE: 'Path to folder is required',
  DB: 'Database name is required',
  PORT: 'Port is required',
  USER: 'User is required',
  PASSWORD: 'Password is required',
} as const;
export const DEFAULT_POSTGRES_PORT = 5432;
export const POSTGRES_ALIAS = 'postgresdb';
