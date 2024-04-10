import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { SubscriptionAccessEntity } from './subscription-access.entity';
import { Subscription } from './types/subscription.interface';

@Injectable()
export class SubscriptionAccessFactory implements EntityFactory<SubscriptionAccessEntity> {
  public createEntity(entityPlainData: Subscription): SubscriptionAccessEntity {
    return new SubscriptionAccessEntity(entityPlainData);
  }
}
