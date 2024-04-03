// Auth
export const jwtConstants = {
  secret: 'DO NOT USE THIS VALUE. INSTEAD, CREATE A COMPLEX SECRET AND KEEP IT SAFE OUTSIDE OF THE SOURCE CODE.',
};
export const SALT_ROUNDS: number = 10;
export const MIN_LENGTH_LOGIN: number = 3;
export const MAX_LENGTH_LOGIN: number = 50;
export const MAX_LENGTH_PASSWORD: number = 12;
export const MIN_LENGTH_PASSWORD: number = 6;

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
