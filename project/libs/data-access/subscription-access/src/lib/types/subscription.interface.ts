import { BaseEntityInterface } from '@project/core';

export interface Subscription extends BaseEntityInterface {
  userId: string;
  followedUserId: string;
}
