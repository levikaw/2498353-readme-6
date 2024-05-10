import { StorableEntityInterface } from './storable-entity.interface';

export interface EntityFactoryInterface<T extends StorableEntityInterface<ReturnType<T['toObject']>>> {
  createEntity(entityPlainData: ReturnType<T['toObject']>): T;
}
