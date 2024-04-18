import { PrismaService } from '@project/prisma';
import { BaseEntity, StorableEntity, EntityFactory } from '@project/core';
import { RepositoryInterface } from './repository.interface';

// Зачем нужна эта прослойка, если призма не поддерживает динамические модели
export abstract class BasePostgresRepository<T extends BaseEntity & StorableEntity<ReturnType<T['toObject']>>>
  implements RepositoryInterface<T>
{
  constructor(protected entityFactory: EntityFactory<T>, protected readonly dataSource: PrismaService) {}

  public async findById(id: T['id']): Promise<T> {
    throw new Error('Not implemented');
  }

  public async save(entity: T): Promise<T> {
    throw new Error('Not implemented');
  }

  public async update(entity: T): Promise<void> {
    throw new Error('Not implemented');
  }

  public async deleteById(id: T['id']): Promise<void> {
    throw new Error('Not implemented');
  }
}
