import { randomUUID } from 'node:crypto';

import { Entity, StorableEntity, EntityFactory } from '@project/core';
import { Repository } from './repository.interface';

export abstract class BaseMemoryRepository<T extends Entity & StorableEntity<ReturnType<T['toObject']>>>
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
  public async create(entity: T): Promise<T> {
    if (!entity.id) {
      entity.id = randomUUID();
    }

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

    this.entities.delete(id);
  }
}
