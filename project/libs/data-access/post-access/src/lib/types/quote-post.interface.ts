import { UserPost } from './base/base-post.interface';

export interface QuotePost extends UserPost {
  author?: string;
  text?: string;
}
