import { randomUUID } from 'node:crypto';

import { BaseEntity } from '../entity/base.entity';
import { StorableEntity } from '../entity/storable-entity.interface';
import { EntityFactory } from '../entity/entity-factory.interface';
import { RepositoryInterface } from './repository.interface';

export abstract class BaseMemoryRepository<T extends BaseEntity & StorableEntity<ReturnType<T['toObject']>>>
  implements RepositoryInterface<T>
{
  protected entities: Map<T['id'], ReturnType<T['toObject']>> = new Map();

  constructor(protected entityFactory: EntityFactory<T>) {}

  public async findAll(): Promise<ReturnType<T['toObject']>[]> {
    return Array.from(this.entities.values());
  }

  public async findById(id: T['id']): Promise<T> {
    const founded = this.entities.get(id) || null;
    if (!founded) {
      return null;
    }

    return this.entityFactory.createEntity(founded);
  }

  public async save(entity: T): Promise<T> {
    if (!entity.id) {
      entity.id = randomUUID();
    }

    entity.createdAt = new Date();

    this.entities.set(entity.id, entity.toObject());
    return entity;
  }

  public async update(entity: T): Promise<void> {
    if (!this.entities.has(entity.id)) {
      throw new Error('Entity not found');
    }

    entity.updatedAt = new Date();

    this.entities.set(entity.id, entity.toObject());
  }

  public async deleteById(id: T['id']): Promise<void> {
    if (!this.entities.has(id)) {
      throw new Error('Entity not found');
    }

    this.entities.delete(id);
  }
}
