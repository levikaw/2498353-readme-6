import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { NotificationAccessEntity } from './notification-access.entity';
import { Notification } from './types/notification.interface';

@Injectable()
export class NotificationAccessFactory implements EntityFactory<NotificationAccessEntity> {
  public createEntity(entityPlainData: Notification): NotificationAccessEntity {
    return isNotEmpty(entityPlainData) ? new NotificationAccessEntity(entityPlainData) : null;
  }
}
