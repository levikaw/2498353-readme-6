export const LENGTH_NAME_POST = {
  MIN: 20,
  MAX: 50,
};
export const LENGTH_TEXT_TEXT_POST = {
  MIN: 100,
  MAX: 1024,
};
export const LENGTH_TEXT_QUOTE_POST = {
  MIN: 20,
  MAX: 300,
};
export const LENGTH_AUTHOR_QUOTE_POST = {
  MIN: 3,
  MAX: 50,
};
export const MAX_LENGTH_TEXT_LINK_POST = 300;
export const LENGTH_ANNONCE_TEXT_POST = {
  MIN: 50,
  MAX: 255,
};

export const ALLOWED_VIDEO_URLS = [
  'youtube.com',
  'youtu.be',
  new RegExp(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(.com)?\/.+/gm),
];

export const POST_TAGS_API = {
  DESCRIPTION: 'Post tags array',
  EXAMPLE: '["video", "cats", "funny"]',
  isArray: true,
} as const;

export const LINK_TEXT_API = {
  DESCRIPTION: 'Link DESCRIPTION',
  EXAMPLE: 'To see my project follow link below',
} as const;

export const LINK_API = {
  DESCRIPTION: 'Link',
  EXAMPLE: 'https://EXAMPLE.com',
} as const;

export const FILEID_API = {
  DESCRIPTION: 'File identificator for uploaded photo',
  EXAMPLE: 'da783896-dc38-48ff-9b1a-a01ec545c33a',
} as const;

export const QUOTE_TEXT_API = {
  DESCRIPTION: 'Quote text',
  EXAMPLE: 'The way to get started is to quit talking and begin doing',
} as const;

export const QUOTE_AUTHOR_API = {
  DESCRIPTION: 'Quote author',
  EXAMPLE: 'Walt Disney',
} as const;

export const VIDEO_LINK_API = {
  DESCRIPTION: 'Link to YouTube',
  EXAMPLE: 'https://www.youtube.com/watch?v=85wgFaxg6AY; https://youtu.be/85wgFaxg6AY',
} as const;

export const POST_EXCEPTION_MESSAGES = {
  NOT_FOUND: 'Post not found!',
} as const;
