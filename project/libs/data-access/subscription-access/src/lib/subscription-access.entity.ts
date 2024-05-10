import { BaseEntity, StorableEntityInterface } from '@project/core';
import { SubscriptionInterface } from './types/subscription.interface';

export class SubscriptionAccessEntity extends BaseEntity implements StorableEntityInterface<SubscriptionInterface> {
  constructor(subscription: SubscriptionInterface) {
    super();

    this.id = subscription.id;
    this.createdAt = subscription.createdAt;
    this.updatedAt = subscription.updatedAt;

    this.followingUserId = subscription.followingUserId;
    this.userId = subscription.userId;
  }

  public followingUserId: string;
  public userId: string;

  public toObject(): SubscriptionInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      followingUserId: this.followingUserId,
      userId: this.userId,
    };
  }
}
