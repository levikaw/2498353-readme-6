import { randomUUID } from 'node:crypto';

import { BaseEntity, StorableEntity, EntityFactory } from '@project/core';
import { Repository } from './repository.interface';

export abstract class BaseMemoryRepository<T extends BaseEntity & StorableEntity<ReturnType<T['toObject']>>>
  implements Repository<T>
{
  protected entities: Map<T['id'], ReturnType<T['toObject']>> = new Map();

  constructor(protected entityFactory: EntityFactory<T>) {}

  /**
   * Поиск entity по id
   * @param {T['id']} id
   * @returns {Promise<T>}
   */
  public async findById(id: T['id']): Promise<T> {
    const foundEntity = this.entities.get(id) || null;
    if (!foundEntity) {
      return null;
    }

    return this.entityFactory.create(foundEntity);
  }

  /**
   * Создание entity
   * @param {T} entity
   * @returns {Promise<T>}
   */
  public async save(entity: T): Promise<T> {
    if (!entity.id) {
      entity.id = randomUUID();
    }

    entity.createdAt = new Date();

    this.entities.set(entity.id, entity.toObject());
    return entity;
  }

  /**
   * Обновление entity
   * @param {T} entity
   */
  public async update(entity: T): Promise<void> {
    if (!this.entities.has(entity.id)) {
      throw new Error('Entity not found');
    }

    entity.updatedAt = new Date();

    this.entities.set(entity.id, entity.toObject());
  }

  /**
   * Удаление entity по id
   * @param {T['id']} id
   */
  public async deleteById(id: T['id']): Promise<void> {
    if (!this.entities.has(id)) {
      throw new Error('Entity not found');
    }

    const entity = await this.findById(id);

    entity.updatedAt = new Date();
    entity.deletedAt = entity.updatedAt;

    this.entities.set(entity.id, entity.toObject());

    // this.entities.delete(id);
  }
}
