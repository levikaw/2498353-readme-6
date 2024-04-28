import { BaseEntity, StorableEntity } from '@project/core';
import { Notification } from './types/notification.interface';

export class NotificationAccessEntity extends BaseEntity implements StorableEntity<Notification> {
  constructor(notification: Notification) {
    super();

    this.id = notification.id;
    this.createdAt = notification.createdAt;
    this.updatedAt = notification.updatedAt;

    this.notifiedAt = notification.notifiedAt;
    this.userId = notification.userId;
  }

  public notifiedAt: Date;
  public userId: string;

  public toObject(): Notification {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      notifiedAt: this.notifiedAt,
      userId: this.userId,
    };
  }
}
