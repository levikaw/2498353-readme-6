import { BaseEntityInterface } from '@project/core';

export interface RefreshTokenInterface extends BaseEntityInterface {
  userId: string;
  expiredAt: Date;
}
