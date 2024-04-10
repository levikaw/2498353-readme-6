import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { CommentAccessEntity } from './comment-access.entity';
import { CommentAccessFactory } from './comment-access.factory';

@Injectable()
export class CommentAccessRepository extends BaseMemoryRepository<CommentAccessEntity> {
  constructor(entityFactory: CommentAccessFactory) {
    super(entityFactory);
  }

  public async findCommentByPostId(postId: string): Promise<CommentAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => entity.postId === postId && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }
}
