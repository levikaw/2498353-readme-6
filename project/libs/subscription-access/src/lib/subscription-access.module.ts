import { Module } from '@nestjs/common';
import { SubscriptionAccessRepository } from './subscription-access.repository';
import { SubscriptionAccessFactory } from './subscription-access.factory';

@Module({
  providers: [SubscriptionAccessRepository, SubscriptionAccessFactory],
  exports: [SubscriptionAccessRepository],
})
export class SubscriptionAccessModule {}
