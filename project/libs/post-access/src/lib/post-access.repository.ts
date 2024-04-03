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

  /**
   * Поиск публикаций по названию
   * @param {string} name
   * @returns {Promise<PostAccessEntity[]>}
   */
  public async findByName(name: string): Promise<PostAccessEntity[]> {
    const entities = Array.from(this.entities.values());
    const posts = entities.filter((entity) => new RegExp(`.*${name}.*`).test(entity.name) && !entity.deletedAt);
    return posts.map((c) => this.entityFactory.create(c));
  }

  /**
   * Поиск публикаций по типу
   * @param {PostType} type
   * @returns {Promise<PostAccessEntity[]>}
   */
  public async findByType(type: PostType): Promise<PostAccessEntity[]> {
    const entities = Array.from(this.entities.values());
    const posts = entities.filter((entity) => entity.type === type && !entity.deletedAt);
    return posts.map((c) => this.entityFactory.create(c));
  }

  /**
   * Поиск публикаций по статусу
   * @param {PostStatus} status
   * @returns {Promise<PostAccessEntity[]>}
   */
  public async findByStatus(status: PostStatus): Promise<PostAccessEntity[]> {
    const entities = Array.from(this.entities.values());
    const posts = entities.filter((entity) => entity.status === status && !entity.deletedAt);
    return posts.map((c) => this.entityFactory.create(c));
  }

  /**
   * Поиск публикаций по тегам
   * @param {string[]} tags
   * @returns {Promise<PostAccessEntity[]>}
   */
  public async findByTags(tags: string[]): Promise<PostAccessEntity[]> {
    const entities = Array.from(this.entities.values());
    const posts = entities.filter((entity) => tags.some((tag) => entity.tags.includes(tag)) && !entity.deletedAt);
    return posts.map((c) => this.entityFactory.create(c));
  }

  /**
   * Поиск публикаций по идентификатору пользователя
   * @param {string} userId
   * @returns {Promise<PostAccessEntity[]>}
   */
  public async findByUserId(userId: string): Promise<PostAccessEntity[]> {
    const entities = Array.from(this.entities.values());
    const posts = entities.filter((entity) => entity.userId === userId && !entity.deletedAt);
    return posts.map((c) => this.entityFactory.create(c));
  }
}
