import { BaseEntity, StorableEntity } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { Subscription } from './types/subscription.interface';

export class SubscriptionAccessEntity extends BaseEntity implements StorableEntity<Subscription> {
  constructor(subscription: Subscription) {
    super();

    if (!isNotEmpty(subscription)) {
      return undefined;
    }

    this.id = subscription.id;
    this.createdAt = subscription.createdAt;
    this.updatedAt = subscription.updatedAt;

    this.followedUserId = subscription.followedUserId;
    this.userId = subscription.userId;
  }

  public followedUserId: string;
  public userId: string;

  public toObject(): Subscription {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      followedUserId: this.followedUserId,
      userId: this.userId,
    };
  }
}
