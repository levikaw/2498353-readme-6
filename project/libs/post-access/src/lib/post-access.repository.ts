import { Injectable } from '@nestjs/common';
import { BaseMemoryRepository } from '@project/data-access';
import { PostAccessEntity } from './post-access.entity';
import { PostAccessFactory } from './post-access.factory';
import { PostStatus } from './types/base/post-status.enum';
import { PostType } from './types/base/post-type.enum';

@Injectable()
export class PostAccessRepository extends BaseMemoryRepository<PostAccessEntity> {
  constructor(entityFactory: PostAccessFactory) {
    super(entityFactory);
  }

  public async findByName(name: string): Promise<PostAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => new RegExp(`.*${name}.*`).test(entity.name) && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }

  public async findByType(type: PostType): Promise<PostAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => entity.type === type && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }

  public async findByStatus(status: PostStatus): Promise<PostAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => entity.status === status && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }

  public async findByTags(tags: string[]): Promise<PostAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => tags.some((tag) => entity.tags.includes(tag)) && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }

  public async findByUserId(userId: string): Promise<PostAccessEntity[]> {
    return Array.from(this.entities.values())
      .filter((entity) => entity.userId === userId && !entity.deletedAt)
      .map((c) => this.entityFactory.createEntity(c));
  }
}
