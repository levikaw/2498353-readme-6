import { BaseEntityInterface } from '@project/core';

export interface UserLike extends BaseEntityInterface {
  postId: string;
  userId: string;
}
