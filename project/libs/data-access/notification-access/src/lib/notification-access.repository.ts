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

  public async updateNotifiedDate(userId: string): Promise<void> {
    await this.dataSource.notification.update({
      where: {
        userId,
      },
      data: {
        notifiedAt: new Date(),
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
