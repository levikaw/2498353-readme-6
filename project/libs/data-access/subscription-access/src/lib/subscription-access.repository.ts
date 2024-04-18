import { Injectable } from '@nestjs/common';
import { BasePostgresRepository } from '@project/core';
import { PrismaService } from '@project/prisma';
import { SubscriptionAccessEntity } from './subscription-access.entity';
import { SubscriptionAccessFactory } from './subscription-access.factory';

@Injectable()
export class SubscriptionAccessRepository extends BasePostgresRepository<SubscriptionAccessEntity> {
  constructor(entityFactory: SubscriptionAccessFactory, readonly dataSource: PrismaService) {
    super(entityFactory, dataSource);
  }

  public async save(entity: SubscriptionAccessEntity): Promise<SubscriptionAccessEntity> {
    return this.dataSource.subscription
      .create({
        data: entity.toObject(),
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async deleteById(id: string): Promise<void> {
    await this.dataSource.subscription.delete({
      where: {
        id,
      },
    });
  }

  public async findByUserId(userId: string, skip?: number, take?: number): Promise<SubscriptionAccessEntity[]> {
    return this.dataSource.subscription
      .findMany({
        where: {
          userId,
        },
        skip,
        take,
      })
      .then((resp) => resp.map((c) => this.entityFactory.createEntity(c)));
  }

  public async findByUserIdFollowedUserId(followedUserId: string, userId: string): Promise<SubscriptionAccessEntity> {
    return this.dataSource.subscription
      .findFirst({
        where: {
          userId,
          followedUserId,
        },
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }
}
