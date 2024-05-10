import { BaseEntity, StorableEntityInterface } from '@project/core';
import { RefreshTokenInterface } from './types/refresh-token.interface';

export class TokenAccessEntity extends BaseEntity implements StorableEntityInterface<RefreshTokenInterface> {
  constructor(token: RefreshTokenInterface) {
    super();

    this.id = token.id;
    this.createdAt = token.createdAt;
    this.updatedAt = token.updatedAt;
    this.userId = token.userId;
    this.expiredAt = token.expiredAt;
  }

  public id: string;
  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;
  public expiredAt: Date;

  public toObject(): RefreshTokenInterface {
    return {
      id: this.id,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      expiredAt: this.expiredAt,
    };
  }
}
