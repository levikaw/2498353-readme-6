import { BaseEntityInterface } from '@project/core';

export interface Notification extends BaseEntityInterface {
  userId: string;
  notifiedAt: Date;
}
