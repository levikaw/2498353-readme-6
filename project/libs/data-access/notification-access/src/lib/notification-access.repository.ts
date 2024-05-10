import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PrismaService } from '@project/prisma';
import { NotificationAccessEntity } from './notification-access.entity';
import { NotificationAccessFactory } from './notification-access.factory';

@Injectable()
export class NotificationAccessRepository extends BasePostgresRepository<NotificationAccessEntity> {
  constructor(entityFactory: NotificationAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async setNotifiedDate(userId: string): Promise<void> {
    const notifiedAt = new Date();
    await this.dataSource.notification.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        notifiedAt,
      },
      update: {
        notifiedAt,
      },
    });
  }

  public async getNotificationByUserId(userId: string): Promise<NotificationAccessEntity> {
    return this.dataSource.notification
      .findUnique({
        where: {
          userId,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }
}
