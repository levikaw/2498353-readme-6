export const LIKE_EXCEPTION = {
  NOT_FOUND: 'Like not found!',
  EXISTS: 'Cannot duplicate likes',
} as const;

export const AUTH_EXCEPTION = {
  NOT_FOUND: 'UserInterface not found',
  WRONG_PASSWORD: 'UserInterface password is wrong',
} as const;

export const USER_EXCEPTION = {
  EXISTS: 'UserInterface with this email exists',
  NOT_OWN: 'UserInterface does not own this',
  DOES_NOT_EXISTS: 'UserInterface with this email does not exists',
} as const;

export const FILES_EXCEPTION = {
  NOT_FOUND: 'File does not exists',
  NOT_CREATED: 'the file could not be uploaded',
} as const;

export const POST_EXCEPTION = {
  NOT_CREATED: 'Cannot create post',
  NOT_UPDATED: 'Cannot update post',
  NOT_FOUND: 'Post not found!',
  IS_REPOSTED: 'Post is reposted',
  FORBIDDEN: 'UserInterface does not own this publication',
  REPOST_FORBIDDEN: 'UserInterface already owns this publication',
} as const;

export const SUBSCRIPTION_EXCEPTION = {
  NOT_FOUND: 'Subscription not found!',
  EXISTS: 'Cannot create duplicate subscription',
} as const;

export const TAG_EXCEPTION = {
  EXISTS: 'Tag already exists on this publication',
} as const;
