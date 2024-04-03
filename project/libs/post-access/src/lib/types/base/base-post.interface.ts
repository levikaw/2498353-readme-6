import { BaseInterface } from '@project/core';
import { PostStatus } from './post-status.enum';
import { PostType } from './post-type.enum';

export interface UserPost extends BaseInterface {
  type?: PostType;
  userId?: string;
  tags?: string[];
  status?: PostStatus;
  reposted?: string;
}
