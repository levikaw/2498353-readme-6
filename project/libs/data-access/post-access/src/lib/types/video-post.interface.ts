import { UserPost } from './base/base-post.interface';

export interface VideoPost extends UserPost {
  name?: string;
  link?: string;
}
