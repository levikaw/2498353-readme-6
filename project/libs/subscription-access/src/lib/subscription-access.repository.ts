import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { SubscriptionAccessEntity } from './subscription-access.entity';
import { SubscriptionAccessFactory } from './subscription-access.factory';

@Injectable()
export class SubscriptionAccessRepository extends BaseMemoryRepository<SubscriptionAccessEntity> {
  constructor(entityFactory: SubscriptionAccessFactory) {
    super(entityFactory);
  }

  /**
   * Поиск подписок для пользователя по идентификатору
   * @param {string} userId
   * @returns {Promise<SubscriptionAccessEntity[]>}
   */
  public async findByUserId(userId: string): Promise<SubscriptionAccessEntity[]> {
    const entities = Array.from(this.entities.values());
    const likes = entities.filter((entity) => entity.userId === userId && !entity.deletedAt);
    return likes.map((c) => this.entityFactory.create(c));
  }

  /**
   * Поиск подписки
   * @param {string} followUserId
   * @param {string} userId
   * @returns {Promise<LikeAccessEntity>}
   */
  public async findByFollowUserIdUserId(followUserId: string, userId: string): Promise<SubscriptionAccessEntity> {
    const entities = Array.from(this.entities.values());
    const like = entities.find((entity) => entity.followUserId === followUserId && entity.userId === userId && !entity.deletedAt);
    return !!like ? this.entityFactory.create(like) : null;
  }
}
