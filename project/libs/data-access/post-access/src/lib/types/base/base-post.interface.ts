import { BaseEntityInterface } from '@project/core';
import { PostType } from '@prisma/client';

export interface UserPost extends BaseEntityInterface {
  type: PostType;
  userId: string;
  tags?: string[];
  isPublished?: boolean; // todo исправить статус null === черновик
  repostedFromPostId?: string;
  isReposted?: boolean;
}
