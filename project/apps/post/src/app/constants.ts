import { PostStatus, PostType } from '@project/post-access';

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

export const ALLOWED_VIDEO_URLS = [
  'youtube.com',
  'youtu.be',
  new RegExp(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(.com)?\/.+/gm),
];

export const POST_TYPE_API = {
  description: 'Post type',
  example: 'video',
  enum: PostType,
} as const;

export const POST_TAGS_API = {
  description: 'Post tags array',
  example: '["video", "cats", "funny"]',
  isArray: true,
} as const;

export const POST_STATUS_API = {
  description: 'Post status',
  example: 'published',
  enum: PostStatus,
} as const;

export const REPOSTED_API = {
  description: 'Is current post reposted?',
  example: 'true',
} as const;

export const LINK_TEXT_API = {
  description: 'Link description',
  example: 'To see my project follow link below',
} as const;

export const LINK_API = {
  description: 'Link',
  example: 'https://example.com',
} as const;

export const FILEID_API = {
  description: 'File identificator for uploaded photo',
  example: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
} as const;

export const QUOTE_TEXT_API = {
  description: 'Quote text',
  example: 'The way to get started is to quit talking and begin doing',
} as const;

export const QUOTE_AUTHOR_API = {
  description: 'Quote author',
  example: 'Walt Disney',
} as const;

export const VIDEO_LINK_API = {
  description: 'Link to YouTube',
  example: 'https://www.youtube.com/watch?v=85wgFaxg6AY; https://youtu.be/85wgFaxg6AY',
} as const;
