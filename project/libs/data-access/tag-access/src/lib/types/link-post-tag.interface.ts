import { BaseEntityInterface } from '@project/core';

export interface LinkPostTagInterface extends BaseEntityInterface {
  postId: string;
  tagId: string;
}
