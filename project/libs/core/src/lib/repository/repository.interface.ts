import { BaseEntity } from '../entity/base.entity';

export interface RepositoryInterface<T extends BaseEntity> {
  findById(id: T['id']): Promise<T>;
  save(entity: T): Promise<T>;
  update(entity: T): Promise<void>;
  deleteById(id: T['id']): Promise<void>;
}
