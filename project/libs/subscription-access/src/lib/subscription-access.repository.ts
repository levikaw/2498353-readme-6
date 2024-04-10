import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { SubscriptionAccessEntity } from './subscription-access.entity';
import { SubscriptionAccessFactory } from './subscription-access.factory';

@Injectable()
export class SubscriptionAccessRepository extends BaseMemoryRepository<SubscriptionAccessEntity> {
  constructor(entityFactory: SubscriptionAccessFactory) {
    super(entityFactory);
  }
  public async findByUserId(userId: string): Promise<SubscriptionAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => entity.userId === userId && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }

  public async findByUserIdFollowedUserId(followedUserId: string, userId: string): Promise<SubscriptionAccessEntity> {
    const like = Array.from(this.entities.values()).find(
      (entity) => entity.followedUserId === followedUserId && entity.userId === userId && !entity.deletedAt,
    );
    return !!like ? this.entityFactory.createEntity(like) : null;
  }
}
