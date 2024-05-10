import { BaseEntityInterface } from '@project/core';

export interface LikeInterface extends BaseEntityInterface {
  postId: string;
  userId: string;
}
