import { BaseEntityInterface } from '@project/core';

export interface Commentary extends BaseEntityInterface {
  text: string;
  postId: string;
  userId: string;
}
