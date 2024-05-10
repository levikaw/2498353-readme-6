import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { NotificationAccessEntity } from './notification-access.entity';
import { NotificationInterface } from './types/notification.interface';

@Injectable()
export class NotificationAccessFactory implements EntityFactoryInterface<NotificationAccessEntity> {
  public createEntity(entityPlainData: NotificationInterface): NotificationAccessEntity {
    return isNotEmpty(entityPlainData) ? new NotificationAccessEntity(entityPlainData) : null;
  }
}
