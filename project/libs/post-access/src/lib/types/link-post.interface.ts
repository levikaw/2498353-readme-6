import { UserPost } from './base/base-post.interface';

export interface LinkPost extends UserPost {
  text?: string;
  link?: string;
}
