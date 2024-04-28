import { Module } from '@nestjs/common';
import { NotificationAccessRepository } from './notification-access.repository';
import { NotificationAccessFactory } from './notification-access.factory';
import { PrismaModule } from '@project/prisma';
import { getPostgresOptions } from '@project/configuration';

@Module({
  imports: [PrismaModule.registerAsync(getPostgresOptions())],
  providers: [NotificationAccessRepository, NotificationAccessFactory],
  exports: [NotificationAccessRepository],
})
export class NotificationAccessModule {}
