import { BaseEntityInterface } from '@project/core';
import { PostType } from '@prisma/client';

export interface UserPost extends BaseEntityInterface {
  type: PostType;
  userId: string;
  tags?: string[];
  repostedFromPostId?: string;
  publishedAt?: Date;
}
