import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { CommentAccessEntity } from './comment-access.entity';
import { CommentAccessFactory } from './comment-access.factory';

@Injectable()
export class CommentAccessRepository extends BaseMemoryRepository<CommentAccessEntity> {
  constructor(entityFactory: CommentAccessFactory) {
    super(entityFactory);
  }

  /**
   * Поиск комментариев для публикации
   * @param {string} postId
   * @returns {Promise<CommentAccessEntity[]>}
   */
  public async findByPostId(postId: string): Promise<CommentAccessEntity[]> {
    const entities = Array.from(this.entities.values());
    const comments = entities.filter((entity) => entity.postId === postId && !entity.deletedAt);
    return comments.map((c) => this.entityFactory.create(c));
  }
}
