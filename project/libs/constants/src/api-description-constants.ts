export const USERID_API = {
  DESCRIPTION: 'User identificator',
  EXAMPLE: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
} as const;

export const POSTID_API = {
  DESCRIPTION: 'Post identificator',
  EXAMPLE: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
} as const;

export const EMAIL_API = {
  DESCRIPTION: 'User email',
  EXAMPLE: 'user@EXAMPLE.mail',
} as const;

export const PAGE_API = {
  MIN: 1,
  DEFAULT: 1,
} as const;

export const LIMIT_API = {
  MIN: 1,
  MAX: 50,
} as const;
