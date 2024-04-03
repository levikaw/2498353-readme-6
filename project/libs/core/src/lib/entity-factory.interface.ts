import { StorableEntity } from './storable-entity.interface';

export interface EntityFactory<T extends StorableEntity<ReturnType<T['toObject']>>> {
  /**
   * Создание entity из обекта
   * @param {ReturnType<T['toObject']>} entityPlainData
   * @returns {T}
   */
  create(entityPlainData: ReturnType<T['toObject']>): T;
}
