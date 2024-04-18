import { UserPost } from './base/base-post.interface';
import { VideoPost } from './video-post.interface';
import { TextPost } from './text-post.interface';
import { LinkPost } from './link-post.interface';
import { PhotoPost } from './photo-post.interface';
import { QuotePost } from './quote-post.interface';

export interface CommonPost extends UserPost, VideoPost, TextPost, LinkPost, PhotoPost, QuotePost {}
