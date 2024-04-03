import { BaseInterface } from '@project/core';

export interface Commentary extends BaseInterface {
  text: string;
  postId: string;
  userId: string;
}
