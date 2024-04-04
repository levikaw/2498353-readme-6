import { BaseInterface } from '@project/core';

export interface Subscription extends BaseInterface {
  userId: string;
  followUserId: string;
}
