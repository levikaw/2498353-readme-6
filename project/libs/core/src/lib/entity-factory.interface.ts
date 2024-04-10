import { StorableEntity } from './storable-entity.interface';

export interface EntityFactory<T extends StorableEntity<ReturnType<T['toObject']>>> {
  createEntity(entityPlainData: ReturnType<T['toObject']>): T;
}
