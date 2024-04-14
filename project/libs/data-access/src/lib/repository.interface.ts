import { BaseEntity } from '@project/core';

export interface Repository<T extends BaseEntity> {
  findById(id: T['id']): Promise<T>;
  save(entity: T): Promise<T>;
  update(entity: T): Promise<void>;
  deleteById(id: T['id']): Promise<void>;
}
