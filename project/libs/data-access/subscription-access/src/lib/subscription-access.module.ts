import { Module } from '@nestjs/common';
import { SubscriptionAccessRepository } from './subscription-access.repository';
import { SubscriptionAccessFactory } from './subscription-access.factory';
import { PrismaModule } from '@project/prisma';
import { getPostgresOptions } from '@project/configuration';

@Module({
  imports: [PrismaModule.registerAsync(getPostgresOptions())],
  providers: [SubscriptionAccessRepository, SubscriptionAccessFactory],
  exports: [SubscriptionAccessRepository],
})
export class SubscriptionAccessModule {}
