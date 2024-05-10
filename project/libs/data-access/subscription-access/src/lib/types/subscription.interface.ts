import { BaseEntityInterface } from '@project/core';

export interface SubscriptionInterface extends BaseEntityInterface {
  userId: string;
  followingUserId: string;
}
