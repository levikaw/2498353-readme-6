export const MONGO_VALIDATION_MESSAGE = {
  HOST: 'Host is required',
  NAME: 'Database name is required',
  PORT: 'Port is required',
  USER: 'User is required',
  PASSWORD: 'Password is required',
  AUTH: 'MongoDB authentication base is required',
} as const;
export const DEFAULT_MONGO_PORT = 27017;
export const MONGO_ALIAS = 'mongodb';
export const BAD_MONGO_ID_ERROR = 'Bad entity ID';
