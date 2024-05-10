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
      where: { id },
    });
  }

  public async findById(id: string): Promise<SubscriptionAccessEntity> {
    return this.dataSource.subscription
      .findUnique({
        where: { id },
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }

  public async findManyByUserId(userId: string): Promise<SubscriptionAccessEntity[]> {
    return this.dataSource.subscription
      .findMany({
        where: { userId },
      })
      .then((subscriptions) => subscriptions.map((subscription) => this.entityFactory.createEntity(subscription)));
  }

  public async findOneByUserIdFollowedUserId(followingUserId: string, userId: string): Promise<SubscriptionAccessEntity> {
    return this.dataSource.subscription
      .findFirst({
        where: { userId, followingUserId },
      })
      .then((resp) => this.entityFactory.createEntity(resp));
  }
}
