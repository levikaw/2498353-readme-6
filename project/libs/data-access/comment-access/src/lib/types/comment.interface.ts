import { BaseEntityInterface } from '@project/core';

export interface CommentInterface extends BaseEntityInterface {
  text: string;
  postId: string;
  userId: string;
}
