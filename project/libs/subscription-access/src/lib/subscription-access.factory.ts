import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { SubscriptionAccessEntity } from './subscription-access.entity';
import { Subscription } from './types/subscription.interface';

@Injectable()
export class SubscriptionAccessFactory implements EntityFactory<SubscriptionAccessEntity> {
  /**
   * Создание SubscriptionAccessEntity из обекта
   * @param {Subscription} entityPlainData
   * @returns {SubscriptionAccessEntity}
   */
  public create(entityPlainData: Subscription): SubscriptionAccessEntity {
    return new SubscriptionAccessEntity(entityPlainData);
  }
}
