import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { LikeAccessEntity } from './like-access.entity';
import { LikeAccessFactory } from './like-access.factory';

@Injectable()
export class LikeAccessRepository extends BaseMemoryRepository<LikeAccessEntity> {
  constructor(entityFactory: LikeAccessFactory) {
    super(entityFactory);
  }

  /**
   * Поиск лайков для публикации
   * @param {string} postId
   * @returns {Promise<LikeAccessEntity[]>}
   */
  public async findByPostId(postId: string): Promise<LikeAccessEntity[]> {
    const entities = Array.from(this.entities.values());
    const likes = entities.filter((entity) => entity.postId === postId && !entity.deletedAt);
    return likes.map((c) => this.entityFactory.create(c));
  }

  /**
   * Поиск лайков для публикации по идентификатору пользователя
   * @param {string} postId
   * @param {string} userId
   * @returns {Promise<LikeAccessEntity>}
   */
  public async findByPostIdUserId(postId: string, userId: string): Promise<LikeAccessEntity> {
    const entities = Array.from(this.entities.values());
    const like = entities.find((entity) => entity.postId === postId && entity.userId === userId && !entity.deletedAt);
    return !!like ? this.entityFactory.create(like) : null;
  }
}
