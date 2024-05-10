import { BaseEntity, StorableEntityInterface } from '@project/core';
import { NotificationInterface } from './types/notification.interface';

export class NotificationAccessEntity extends BaseEntity implements StorableEntityInterface<NotificationInterface> {
  constructor(notification: NotificationInterface) {
    super();

    this.id = notification.id;
    this.createdAt = notification.createdAt;
    this.updatedAt = notification.updatedAt;

    this.notifiedAt = notification.notifiedAt;
    this.userId = notification.userId;
  }

  public notifiedAt: Date;
  public userId: string;

  public toObject(): NotificationInterface {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      notifiedAt: this.notifiedAt,
      userId: this.userId,
    };
  }
}
