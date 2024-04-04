import { BaseEntity, StorableEntity } from '@project/core';
import { Subscription } from './types/subscription.interface';

export class SubscriptionAccessEntity extends BaseEntity implements StorableEntity<Subscription> {
  constructor(subscription?: Subscription) {
    super();
    this.populate(subscription);
  }

  /** Идентификатор пользователя, на которого создали подписку */
  public followUserId: string;

  /** Идентификатор пользователя, который создал подписку */
  public userId: string;

  public populate(subscription?: Subscription): void {
    if (!subscription) {
      return;
    }

    this.id = subscription.id;
    this.createdAt = subscription.createdAt;
    this.updatedAt = subscription.updatedAt;
    this.deletedAt = subscription.deletedAt;

    this.followUserId = subscription.followUserId;
    this.userId = subscription.userId;
  }

  /**
   * Преобразование из SubscriptionAccessEntity в объект
   * @returns {Subscription}
   */
  public toObject(): Subscription {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      followUserId: this.followUserId,
      userId: this.userId,
    };
  }
}
