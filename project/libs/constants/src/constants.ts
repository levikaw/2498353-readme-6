// Auth
export const SALT_ROUNDS: number = 10;
export const MIN_LENGTH_LOGIN: number = 3;
export const MAX_LENGTH_LOGIN: number = 50;
export const MAX_LENGTH_PASSWORD: number = 12;
export const MIN_LENGTH_PASSWORD: number = 6;
export const DEFAULT_EXPIRES_TOKEN_IN: number = 60;
export const DEFAULT_AUTH_SERVICE_PORT: number = 3000;
export const AUTH_ALIAS: string = 'auth';

// Messages
export const AUTH_USER_EXISTS: string = 'User with this email exists';
export const AUTH_USER_NOT_FOUND: string = 'User not found';
export const AUTH_USER_PASSWORD_WRONG: string = 'User password is wrong';
export const FAIL_PASSWORD_VALIDATION: string = `Password is not strong enough. Must contain ${MIN_LENGTH_PASSWORD}-${MAX_LENGTH_PASSWORD} characters`;

// Files
const ONE_KILOBYTE: number = 1024;
export const MAX_FILE_SIZE: number = ONE_KILOBYTE * 1000;
export const MAX_AVATAR_SIZE: number = ONE_KILOBYTE * 500;

// Comments
export const COMMENTS_PAGE_SIZE: number = 50;
export const MIN_COMMENT_LENGTH: number = 10;
export const MAX_COMMENT_LENGTH: number = 300;

// Posts
export const MIN_LENGTH_NAME_POST: number = 20;
export const MAX_LENGTH_NAME_POST: number = 50;
export const MIN_LENGTH_TEXT_TEXT_POST: number = 100;
export const MAX_LENGTH_TEXT_TEXT_POST: number = 1024;
export const MIN_LENGTH_TEXT_QUOTE_POST: number = 20;
export const MAX_LENGTH_TEXT_QUOTE_POST: number = 300;
export const MIN_LENGTH_AUTHOR_QUOTE_POST: number = 3;
export const MAX_LENGTH_AUTHOR_QUOTE_POST: number = 50;
export const MAX_LENGTH_TEXT_LINK_POST: number = 300;
export const MIN_LENGTH_ANNONCE_TEXT_POST: number = 50;
export const MAX_LENGTH_ANNONCE_TEXT_POST: number = 255;

// db
export enum MongoDBValidationMessage {
  DBHostRequired = 'MongoDB host is required',
  DBNameRequired = 'Database name is required',
  DBPortRequired = 'MongoDB port is required',
  DBUserRequired = 'MongoDB user is required',
  DBPasswordRequired = 'MongoDB password is required',
  DBBaseAuthRequired = 'MongoDB authentication base is required',
}
export const DEFAULT_MONGO_PORT = 27017;
export const MONGO_ALIAS: string = 'mongodb';

// ports
export const MIN_PORT: number = 0;
export const MAX_PORT: number = 65535;
export const DEFAULT_FILE_SERVICE_PORT: number = 3000;

// file-access-service
export const FILES_ALIAS: string = 'file-access';
export enum Environment {
  Dev = 'development',
  Stage = 'stage',
  Prod = 'production',
}
