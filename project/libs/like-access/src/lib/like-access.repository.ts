import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { LikeAccessEntity } from './like-access.entity';
import { LikeAccessFactory } from './like-access.factory';

@Injectable()
export class LikeAccessRepository extends BaseMemoryRepository<LikeAccessEntity> {
  constructor(entityFactory: LikeAccessFactory) {
    super(entityFactory);
  }

  public async findByPostId(postId: string): Promise<LikeAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => entity.postId === postId && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }

  public async findByPostIdUserId(postId: string, userId: string): Promise<LikeAccessEntity> {
    const like = Array.from(this.entities.values()).find(
      (entity) => entity.postId === postId && entity.userId === userId && !entity.deletedAt,
    );
    return !!like ? this.entityFactory.createEntity(like) : null;
  }
}
