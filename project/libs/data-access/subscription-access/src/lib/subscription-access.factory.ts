import { Injectable } from '@nestjs/common';
import { EntityFactoryInterface } from '@project/core';
import { isNotEmpty } from 'class-validator';
import { SubscriptionAccessEntity } from './subscription-access.entity';
import { SubscriptionInterface } from './types/subscription.interface';

@Injectable()
export class SubscriptionAccessFactory implements EntityFactoryInterface<SubscriptionAccessEntity> {
  public createEntity(entityPlainData: SubscriptionInterface): SubscriptionAccessEntity {
    return isNotEmpty(entityPlainData) ? new SubscriptionAccessEntity(entityPlainData) : null;
  }
}
