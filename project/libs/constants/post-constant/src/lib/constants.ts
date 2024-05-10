export const LENGTH_NAME_POST = {
  MIN: 20,
  MAX: 50,
} as const;

export const LENGTH_TEXT_TEXT_POST = {
  MIN: 100,
  MAX: 1024,
} as const;

export const LENGTH_TEXT_QUOTE_POST = {
  MIN: 20,
  MAX: 300,
} as const;

export const LENGTH_AUTHOR_QUOTE_POST = {
  MIN: 3,
  MAX: 50,
} as const;

export const MAX_LENGTH_TEXT_LINK_POST = 300;

export const LENGTH_ANNONCE_TEXT_POST = {
  MIN: 50,
  MAX: 255,
} as const;

export const ALLOWED_VIDEO_URLS = [
  'youtube.com',
  'youtu.be',
  new RegExp(/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(.com)?\/.+/gm),
];

export const QUOTE_AUTHOR_API = {
  DESCRIPTION: 'Quote author',
  EXAMPLE: 'Walt Disney',
} as const;

export const VIDEO_LINK_API = {
  DESCRIPTION: 'Link to YouTube',
  EXAMPLE: 'https://www.youtube.com/watch?v=85wgFaxg6AY; https://youtu.be/85wgFaxg6AY',
} as const;
