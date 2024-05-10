import { BaseEntityInterface } from '@project/core';

export interface NotificationInterface extends BaseEntityInterface {
  userId: string;
  notifiedAt: Date;
}
