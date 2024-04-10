import { BaseEntity, StorableEntity } from '@project/core';
import { Subscription } from './types/subscription.interface';

export class SubscriptionAccessEntity extends BaseEntity implements StorableEntity<Subscription> {
  constructor(subscription?: Subscription) {
    super();
    this.populate(subscription);
  }

  public followedUserId: string;
  public userId: string;

  public populate(subscription?: Subscription): void {
    if (!subscription) {
      return;
    }

    this.id = subscription.id;
    this.createdAt = subscription.createdAt;
    this.updatedAt = subscription.updatedAt;
    this.deletedAt = subscription.deletedAt;

    this.followedUserId = subscription.followedUserId;
    this.userId = subscription.userId;
  }

  public toObject(): Subscription {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      followedUserId: this.followedUserId,
      userId: this.userId,
    };
  }
}
