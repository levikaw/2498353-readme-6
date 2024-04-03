import { UserPost } from './base/base-post.interface';

export interface TextPost extends UserPost {
  name?: string;
  announcement?: string;
  text?: string;
}
