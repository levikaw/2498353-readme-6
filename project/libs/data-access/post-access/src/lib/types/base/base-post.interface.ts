import { BaseEntityInterface } from '@project/core';
import { PostTypeEnum } from './post-type.enum';

export interface BasePostInterface extends BaseEntityInterface {
  type: PostTypeEnum;
  userId: string;
  repostedFromPostId?: string;
  publishedAt?: Date;
}
