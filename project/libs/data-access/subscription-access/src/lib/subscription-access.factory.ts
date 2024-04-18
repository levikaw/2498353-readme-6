import { Injectable } from '@nestjs/common';
import { EntityFactory } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { SubscriptionAccessEntity } from './subscription-access.entity';
import { Subscription } from './types/subscription.interface';

@Injectable()
export class SubscriptionAccessFactory implements EntityFactory<SubscriptionAccessEntity> {
  public createEntity(entityPlainData: Subscription): SubscriptionAccessEntity {
    return isNotEmpty(entityPlainData) ? new SubscriptionAccessEntity(entityPlainData) : null;
  }
}
