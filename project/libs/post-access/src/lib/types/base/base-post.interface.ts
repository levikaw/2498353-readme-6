import { BaseEntityInterface } from '@project/core';
import { PostStatus } from './post-status.enum';
import { PostType } from './post-type.enum';

export interface UserPost extends BaseEntityInterface {
  type?: PostType;
  userId?: string;
  tags?: string[];
  status?: PostStatus;
  repostedFromPostId?: string;
  isReposted?: boolean;
}
