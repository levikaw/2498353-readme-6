import { Module } from '@nestjs/common';
import { SubscriptionController } from './subscription.controller';
import { SubscriptionService } from './subscription.service';
import { SubscriptionAccessFactory, SubscriptionAccessRepository } from '@project/subscription-access';
import { PrismaDataAccessModule } from '@project/core';

@Module({
  imports: [PrismaDataAccessModule.register(SubscriptionAccessFactory, SubscriptionAccessRepository)],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
