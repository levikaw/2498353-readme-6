import { UserPost } from './base/base-post.interface';

export interface PhotoPost extends UserPost {
  fileId?: string;
}
