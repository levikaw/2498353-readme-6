import { PrismaService } from '@project/prisma';
import { BaseEntity } from '../entity/base.entity';
import { StorableEntityInterface } from '../entity/storable-entity.interface';
import { EntityFactoryInterface } from '../entity/entity-factory.interface';
import { RepositoryInterface } from './repository.interface';

const error = 'Not implemented';

export abstract class BasePostgresRepository<T extends BaseEntity & StorableEntityInterface<ReturnType<T['toObject']>>>
  implements RepositoryInterface<T>
{
  constructor(protected entityFactory: EntityFactoryInterface<T>, protected readonly dataSource: PrismaService) {}

  public async findById(id: T['id']): Promise<T> {
    throw new Error(error);
  }

  public async save(entity: T): Promise<T> {
    throw new Error(error);
  }

  public async update(entity: T): Promise<void> {
    throw new Error(error);
  }

  public async deleteById(id: T['id']): Promise<void> {
    throw new Error(error);
  }
}
