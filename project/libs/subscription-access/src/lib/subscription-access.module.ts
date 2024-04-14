import { Module } from '@nestjs/common';
import { SubscriptionAccessRepository } from './subscription-access.repository';
import { SubscriptionAccessFactory } from './subscription-access.factory';
import { PrismaModule } from '@project/prisma';

@Module({
  imports: [PrismaModule],
  providers: [SubscriptionAccessRepository, SubscriptionAccessFactory],
  exports: [SubscriptionAccessRepository],
})
export class SubscriptionAccessModule {}
